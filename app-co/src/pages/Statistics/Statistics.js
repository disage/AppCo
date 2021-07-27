import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import TableRow from '../../components/TableRow/TableRow'
import { Link, NavLink } from 'react-router-dom'
import './Statistics.scss'

import Pagination from '@material-ui/lab/Pagination'

const Statistics = () => {
	const API_URL = 'http://localhost:3004/users'

	const [users, setUsers] = useState([])
	const [usersAmount, setUsersAmount] = useState()
	const [currentPage, setCurrentPage] = useState(1)
	let handleChangePage = (event, newPage) => {
		fetch(API_URL + `?page=${newPage}`)
			.then(response => {
				return response.json()
			})
			.then(data => {
				setUsers(data.data)
			})
		setCurrentPage(newPage)
	}

	useEffect(() => {
		fetch(API_URL + `?page=${currentPage}`)
			.then(response => {
				return response.json()
			})
			.then(data => {
				setUsers(data.data)
			})
		fetch(API_URL + '/amount')
			.then(response => {
				return response.json()
			})
			.then(data => {
				setUsersAmount(data.data)
			})
	}, [])

	return (
		<div className="statistics">
			<Header />
			<div className="container">
				<div className="breadcrumbs">
					<NavLink to="/">Main</NavLink>
					<span>{'>'}</span>
					<NavLink to="/statistics" activeClassName="selectedRoute">
						User satistics
					</NavLink>
				</div>
				<h2>User statistics</h2>
				<table>
					<thead>
						<tr className="theader">
							<th>Id</th>
							<th>First name</th>
							<th>Last name</th>
							<th>Email</th>
							<th>Gender</th>
							<th>IP address</th>
							<th>Total clicks</th>
							<th>Total page views</th>
						</tr>
					</thead>
					<tbody>
						{users?.map(item => (
							<TableRow
								key={item.id}
								id={item.id}
								firstname={item.firstName}
								lastname={item.lastName}
								email={item.email}
								gender={item.gender}
								ip={item.ipAddress}
								page_views={item.page_views}
								clicks={item.clicks}
							/>
						))}
					</tbody>
				</table>

				<Pagination
					className="pagination"
					count={usersAmount / 50}
					page={currentPage}
					onChange={handleChangePage}
					shape="rounded"
					variant="outlined"
				/>
			</div>
			<Footer />
		</div>
	)
}

export default Statistics
