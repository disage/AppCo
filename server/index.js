const fs = require('fs')
const express = require('express')
const app = express()
let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./db.sqlite3')

db.serialize(() => {
	db.run(
		'CREATE TABLE IF NOT EXISTS appCo (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, gender TEXT, ipAddress TEXT)'
	)

	let stmt = db.prepare('INSERT OR IGNORE INTO appCo VALUES (NULL,?,?,?,?,?)')

	let users = JSON.parse(fs.readFileSync('users.json', 'utf8'))
	users.forEach(item =>
		stmt.run(item.first_name, item.last_name, item.email, item.gender, item.ip_address)
	)

	app.get('/users/', async (req, res) => {
		let elementsPerPage = 50
		let pageNumber = req.query.page
		console.log(pageNumber)
		let firstItem = 50 * (pageNumber - 1)
		var sql = `SELECT * FROM appCo LIMIT ${firstItem}, ${elementsPerPage}`

		db.all(sql, (err, rows) => {
			if (err) {
				res.status(400).json({ error: err.message })
				return
			}
			res.setHeader('Access-Control-Allow-Origin', '*')
			res.setHeader('Access-Control-Allow-Methods', 'GET')
			res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
			res.setHeader('Access-Control-Allow-Credentials', true)
			res.json({
				message: 'success',
				data: rows
			})
		})
	})

	stmt.finalize()
})
process.on('SIGINT', () => {
	db.close()
})

app.listen(3004, () => console.log('server is running'))
