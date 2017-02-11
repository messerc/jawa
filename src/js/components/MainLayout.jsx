import React from 'react';
import axios from 'axios';
import { Router, Route, Link } from 'react-router';
import moment from 'moment';
import 'moment-timezone';

import ForecastContainer from './ForecastContainer.jsx'
import HourlyDisplay from './HourlyDisplay.jsx'
import Header from './Header.jsx'
import Form from './Form.jsx'
import key from './APIkey.js'

export default class MainLayout extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			value: '', 
			place: null, 
			forecast: null, 
			fullForecast: [],
			timezone: null,
			loadingDone: false, 
			loading: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
	}


	handleUserInput(e) {
		this.setState({
			value: e
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			fullForecast: [],
			loading: true,
			loadingDone: false
		})
		const darkKey= key.darkskykey;
		const geocoderKey = key.geocoderkey;
		axios.get(`http://api.opencagedata.com/geocode/v1/json?q=${this.state.value}&key=${geocoderKey}`)
			 .then( response => {
			 	this.setState({
			 		place: response.data.results[0].components.city
			 	})
			 	const lat = response.data.results[0].geometry.lat;
			 	const long = response.data.results[0].geometry.lng
			 	axios.get(`https://api.darksky.net/forecast/${darkKey}/${lat},${long}`)
			 		 .then( response => {
			 		 	console.log(response.data)
			 		 	this.setState({
			 		 		forecast: response.data,
			 		 	})
			 		 	for(let i=0; i < response.data.daily.data.length; i++) {
			 		 		const time = response.data.daily.data[i].time;

			 		 		if (i < 7) {
			 		 		axios.get(`https://api.darksky.net/forecast/${darkKey}/${lat},${long},${time}`)
			 		 			.then( response => {
			 		 				console.log(response.data);
			 		 				this.setState({
			 		 					timezone: response.data.timezone,
			 		 					fullForecast: this.state.fullForecast.concat(response.data.hourly.data)
			 		 				})
			 		 			})
			 		 			.catch( err => {
			 		 				console.log(err)
			 		 			})
			 		 		} else {
							axios.get(`https://api.darksky.net/forecast/${darkKey}/${lat},${long},${time}`)
								.then( response => {
									this.setState({
										fullForecast: this.state.fullForecast.concat(response.data.hourly.data),
										loading: false,
										loadingDone: true
									})
								})
								.catch( err => {
									console.log(err)
								})
			 		 		}
			 		 	}
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
		let loadDisplay = null;
		if (this.state.loading) {
			loadDisplay = 
			<div className="row">
				<div className="col-md-8 col-md-offset-2">
					<h3> Loading... </h3>
				</div>
			</div>
		} else {
			loadDisplay = 				
			<div className="row">
				<div className="col-md-8 col-md-offset-2">
					<h3> Pick a spot you muthafucka </h3>
				</div>
			</div>
		}

		if (this.state.loadingDone) {
			const { forecast } = this.state; 
			return (
			<div className="container-fluid">
				<Header />

				<Form 
				onSubmit={this.handleSubmit}
				text={this.state.value}
				onUserInput={this.handleUserInput}
				/> 

				<ForecastContainer data={this.state.forecast} location={this.state.place} fullForecast={this.state.fullForecast} timezone={this.state.timezone} />

			</div>
				)		
		} else return (
			<div className="container-fluid">
				<Header />

				<Form 
				onSubmit={this.handleSubmit}
				text={this.state.value}
				onUserInput={this.handleUserInput}
				/> 

				{loadDisplay}

			</div>
			)
	}
}