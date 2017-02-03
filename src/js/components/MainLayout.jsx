import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Router, Route, Link } from 'react-router';
import moment from 'moment';

import HourlyDisplay from './HourlyDisplay.jsx'
import key from './APIkey.js'

export default class MainLayout extends React.Component {
	constructor(props) {
		super(props)

		this.state = {value: '', places: null, forecast: null}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange(e) {
		this.setState({
			value: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		const darkKey= key.darkskykey;
		const geocoderKey = key.geocoderkey;
		console.log(this.state.value);
		axios.get(`http://api.opencagedata.com/geocode/v1/json?q=${this.state.value}&key=${geocoderKey}`)
			 .then( response => {
			 	const lat = response.data.results[0].geometry.lat;
			 	const long = response.data.results[0].geometry.lng
			 	axios.get(`https://api.darksky.net/forecast/${darkKey}/${lat},${long}`)
			 		 .then( response => {
			 		 	console.log(response.data)
			 		 	this.setState({
			 		 		forecast: response.data
			 		 	})
			 		 })
			 		 .catch( err => {
			 		 	console.log(err);
			 		 })
			 })
			 .catch( err => {
			 	console.log(err);
			 })
	}


	render() {
		if (this.state.forecast) {
			const { forecast } = this.state; 
			const { hourly } = forecast;
			const hourlyForecast = hourly.data.map( (forecast, i) => {
				return <HourlyDisplay key={i * forecast.time + 1} data={forecast} />
			});
			console.log(hourly)
			return (
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-8 col-md-offset-2">
							<h1>jawa</h1>
							<h6>just another weather app</h6>
							<br />
							<form onSubmit={this.handleSubmit}>
								<div className="input-group">
								<input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" />
								</div>
							</form> 
							<h3> {Math.round(this.state.forecast.currently.apparentTemperature)} degrees </h3>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8 col-md-offset-2">
							{hourlyForecast}
						</div>
					</div>							
				</div>
				)		
		} else return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<h1>jawa</h1>
						<h6>just another weather app</h6>
						<br />
						<form onSubmit={this.handleSubmit}>
							<div className="input-group">
							<input type="text" value={this.state.value} onChange={this.handleChange}  className="form-control" />
							</div>
						</form> 
					</div>
				</div>							
			</div>
			)
	}
}