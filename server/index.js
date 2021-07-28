const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./db.sqlite3')
const path = require('path')
const port = process.env.PORT || 3004
//здесь наше приложение отдаёт статику
// app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'build')))

if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('app-co/build'));​
	app.get('*', (req, res) => {	
		res.sendFile(path.resolve(__dirname, 'app-co', 'build', 'index.html'));
	});
}
db.serialize(() => {
	db.run(
		'CREATE TABLE IF NOT EXISTS appCo (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, gender TEXT, ipAddress TEXT)'
	)
	db.run(
		'CREATE TABLE IF NOT EXISTS userStatistic (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, date DATE, page_views INTEGER, clicks INTEGER)'
	)
	let sqlCount = `SELECT COUNT(*) AS Cnt FROM appCo UNION SELECT COUNT(*) AS Cnt FROM userStatistic`
	db.all(sqlCount, [], (err, rows) => {
		if (err) {
			throw err
		}
		if (rows.length === 1 && rows[0]?.Cnt === 0) {
			let stmt = db.prepare('INSERT INTO appCo VALUES (NULL,?,?,?,?,?)')
			let users = JSON.parse(fs.readFileSync('users.json', 'utf8'))
			users.forEach(item =>
				stmt.run(
					item.first_name,
					item.last_name,
					item.email,
					item.gender,
					item.ip_address
				)
			)
			stmt.finalize()
		}
		if (rows.length === 1 && rows[0]?.Cnt === 0) {
			let stmt2 = db.prepare('INSERT INTO userStatistic VALUES (NULL,?,?,?,?)')
			let userStatistic = JSON.parse(fs.readFileSync('users_statistic.json', 'utf8'))
			userStatistic.forEach(item =>
				stmt2.run(item.user_id, item.date, item.page_views, item.clicks)
			)
			stmt2.finalize()
		}
	})

	app.get('/users/', async (req, res) => {
		let elementsPerPage = 50
		let pageNumber = req.query.page
		let firstItem = 50 * (pageNumber - 1)
		let sql = `SELECT * FROM appCo INNER JOIN userStatistic WHERE userStatistic.user_id = appCo.id LIMIT ${firstItem}, ${elementsPerPage}`
		db.all(sql, (err, rows) => {
			if (err) {
				res.status(400).json({ error: err.message })
				return
			}
			res.json({
				message: 'success',
				data: rows
			})
		})
	})
	app.get('/user/:id/statistic', async (req, res) => {
		let startDate = req.query.startDate
		let endDate = req.query.endDate
		let userId = req.params.id
		let sql = `SELECT date, page_views, clicks FROM userStatistic WHERE user_id = ${userId} AND userStatistic.date BETWEEN "${startDate}" AND "${endDate}"`

		db.all(sql, (err, rows) => {
			if (err) {
				res.status(400).json({ error: err.message })
				return
			}
			res.json({
				message: 'success',
				data: rows
			})
		})
	})
	app.get('/user/:id', async (req, res) => {
		let userId = req.params.id
		let sql = `SELECT firstName, lastName FROM appCo  WHERE appCo.id = ${userId}`

		db.all(sql, (err, rows) => {
			if (err) {
				res.status(400).json({ error: err.message })
				return
			}
			res.json({
				message: 'success',
				data: rows
			})
		})
	})
	app.get('/users/amount', async (req, res) => {
		let sql = `SELECT COUNT(*) AS Cnt FROM appCo`
		db.all(sql, (err, rows) => {
			if (err) {
				res.status(400).json({ error: err.message })
				return
			}
			res.json({
				message: 'success',
				data: rows[0].Cnt
			})
		})
	})
})
process.on('SIGINT', () => {
	db.close()
})

app.listen(port)
