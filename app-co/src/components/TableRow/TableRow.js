import React from 'react'
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
	return (
		<tr>
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
