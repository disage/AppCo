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

	useEffect(() => {
		fetch(API_URL)
			.then(response => {
				return response.json()
			})
			.then(data => {
				setUser(data.data)
			})
	}, [])
	let clicksArr = []
	user.forEach(item => {
		clicksArr.push({ x: new Date(item.date), y: item.clicks })
	})
	let viewsArr = []
	user.forEach(item => {
		viewsArr.push({ x: new Date(item.date), y: item.page_views })
	})

	const options = {
		animationEnabled: true,
		theme: 'light2',
		title: {
			text: 'Clicks'
		},
		axisX: {
			valueFormatString: 'DD MMMM'
		},
		data: [
			{
				type: 'spline',
				xValueFormatString: 'DD MMMM',
				dataPoints: clicksArr
			}
		]
	}
	const options2 = {
		animationEnabled: true,
		theme: 'light2',
		title: {
			text: 'Views'
		},
		axisX: {
			valueFormatString: 'DD MMMM'
		},
		data: [
			{
				type: 'spline',
				xValueFormatString: 'DD MMMM',
				dataPoints: viewsArr
			}
		]
	}
	const startValue = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate()
	)
	const endValue = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate() + 7
	)
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
						<DateRangePicker defaultValue={[startValue, endValue]} />
					</div>
				</div>
				<CanvasJSChart options={options} />
				<CanvasJSChart options={options2} />
			</div>
			<Footer />
		</div>
	)
}

export default User
