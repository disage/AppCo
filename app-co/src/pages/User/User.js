import React, { useEffect, useState } from 'react'
import { DateRangePicker } from 'rsuite'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { NavLink } from 'react-router-dom'
import './User.scss'
import 'rsuite/dist/styles/rsuite-default.css'
import CanvasJSReact from '../../assets/canvasjs/canvasjs.react'

let CanvasJSChart = CanvasJSReact.CanvasJSChart

const User = () => {
	let currentUserId = window.location.pathname.split('/')[2]
	const API_URL = `http://localhost:3004/user/${currentUserId}`
	const [user, setUser] = useState([])

	const startValue = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate()
	)
		.toISOString()
		.substring(0, 10)
	const endValue = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate() + 7
	)
		.toISOString()
		.substring(0, 10)

	useEffect(() => {
		fetch(API_URL + `?startDate=${startValue}&endDate=${endValue}`)
			.then(response => {
				return response.json()
			})
			.then(data => {
				setUser(data.data)
			})
	}, [])
	let clicksArr = []
	user?.forEach(item => {
		clicksArr.push({ x: new Date(item.date), y: item.clicks })
	})
	let viewsArr = []
	user?.forEach(item => {
		viewsArr.push({ x: new Date(item.date), y: item.page_views })
	})

	const options = {
		animationEnabled: true,
		theme: 'light2',
		title: {
			text: 'Clicks',
			horizontalAlign: 'left',
			margin: 24
		},
		axisX: {
			valueFormatString: 'DD MMMM'
		},
		data: [
			{
				type: 'spline',
				xValueFormatString: 'DD MMMM',
				markerType: 'none',
				dataPoints: clicksArr
			}
		]
	}
	const options2 = {
		animationEnabled: true,
		theme: 'light2',
		title: {
			text: 'Views',
			horizontalAlign: 'left',
			margin: 24
		},
		axisX: {
			valueFormatString: 'DD MMMM'
		},
		data: [
			{
				type: 'spline',
				xValueFormatString: 'DD MMMM',
				markerType: 'none',
				dataPoints: viewsArr
			}
		]
	}

	let setDateHandler = value => {
		const startDate = new Date(
			new Date(value[0]).getFullYear(),
			new Date(value[0]).getMonth(),
			new Date(value[0]).getDate() + 1
		)
			.toISOString()
			.substring(0, 10)
		const endDate = new Date(
			new Date(value[1]).getFullYear(),
			new Date(value[1]).getMonth(),
			new Date(value[1]).getDate() + 1
		)
			.toISOString()
			.substring(0, 10)
		fetch(API_URL + `?startDate=${startDate}&endDate=${endDate}`)
			.then(response => {
				return response.json()
			})
			.then(data => {
				setUser(data.data)
			})
	}
	return (
		<div className="user">
			<Header />
			<div className="container">
				<div className="breadcrumbs">
					<NavLink to="/">Main</NavLink>
					<span>{'>'}</span>
					<NavLink to="/statistics">User satistics</NavLink>
					<span>{'>'}</span>
					<NavLink to="/user" activeClassName="selectedRoute">
						{user[0]?.firstName + ' ' + user[0]?.lastName}
					</NavLink>
				</div>
				<div className="row">
					<h2>{user[0]?.firstName + ' ' + user[0]?.lastName}</h2>
					<div className="selectDate">
						<span>Select date range</span>
						<DateRangePicker
							defaultValue={[startValue, endValue]}
							onChange={value => {
								setDateHandler(value)
							}}
						/>
					</div>
				</div>
				<div className="chartWrapper">
					<CanvasJSChart options={options} />
				</div>
				<div className="chartWrapper">
					<CanvasJSChart options={options2} />
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default User
