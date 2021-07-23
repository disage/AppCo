import React from 'react'
import { useHistory } from 'react-router-dom'
import './TableRow.scss'

const TableRow = ({
	id,
	firstname,
	lastname,
	email,
	gender,
	ip,
	totalClicks,
	totalViews
}) => {
	const history = useHistory()

	const routeChange = () => {
		let path = `/user/${id}`
		history.push(path)
	}
	return (
		<tr onClick={routeChange}>
			<td>{id}</td>
			<td>{firstname}</td>
			<td>{lastname}</td>
			<td>{email}</td>
			<td>{gender}</td>
			<td>{ip}</td>
			<td>0</td>
			<td>0</td>
		</tr>
	)
}

export default TableRow
