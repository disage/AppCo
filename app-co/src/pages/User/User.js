import React from 'react'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { NavLink } from 'react-router-dom'
import './User.scss'
import { CanvasJSChart } from 'canvasjs-react-charts'

const User = () => {
	const options = {
		animationEnabled: true,
		// exportEnabled: true,
		theme: 'light2', // "light1", "dark1", "dark2"
		title: {
			text: 'Clicks'
		},
		axisX: {
			valueFormatString: 'DD MMMM'
		},
		data: [
			{
				type: 'line',
				// toolTipContent: '    {x}: {y}%',

				xValueFormatString: 'DD MMMM',

				dataPoints: [
					{ x: new Date('2017- 10- 03'), y: 260 },
					{ x: new Date('2017- 10- 05'), y: 123 },
					{ x: new Date('2017-10-06'), y: 0 },
					{ x: new Date('2017-10-07'), y: 230 },
					{ x: new Date('2017-10-08'), y: 420 }
				]
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
	console.log(new Date().getDay())
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
						Samuel Frost
					</NavLink>
				</div>
				<div className="row">
					<h2>Samuel Frost</h2>
					<div className="selectDate">
						<span>Select date range</span>
						<DateRangePicker defaultValue={[startValue, endValue]} />
					</div>
				</div>
				<CanvasJSChart options={options} />
				<CanvasJSChart options={options} />
			</div>
			<Footer />
		</div>
	)
}

export default User
