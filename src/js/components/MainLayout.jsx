import React from 'react';
import axios from 'axios';
import { Router, Route, Link } from 'react-router';
import moment from 'moment';
import 'moment-timezone';

import ForecastContainer from './ForecastContainer.jsx';
import HourlyDisplay from './HourlyDisplay.jsx';
import Header from './Header.jsx';
import Form from './Form.jsx';

export default class MainLayout extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			value: '', 
			place: {
				city: null,
				state: null,
			}, 
			forecast: null, 
			fullForecast: [],
			timezone: null,
			loadingDone: false, 
			loading: false,
			failed: false,
			lat: null,
			long: null,
			darkskyKey: '24f1dce0f1dc5ed2b1898b26cc39d0f2',
			geocoderKey: 'ce1f2bbcb74bb814b7c6ae6ea1565685',
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
		axios.get(`http://api.opencagedata.com/geocode/v1/json?q=${this.state.value}&key=${this.state.geocoderKey}`)
			 .then( response => {
			 	console.log(response.data.results[0].components)
			 	this.setState({
			 		place: {
			 			city: response.data.results[0].components.city,
			 			state: response.data.results[0].components.state
			 		},
			 		lat: response.data.results[0].geometry.lat,
			 		long: response.data.results[0].geometry.lng
			 	})
			 	const { lat, long, darkskyKey, geocoderKey } = this.state
			 	axios.get(`https://api.darksky.net/forecast/${darkskyKey}/${lat},${long}`)
			 		 .then( response => {
			 		 	this.setState({
			 		 		forecast: response.data,
			 		 	})
			 		 	for(let i=0; i < response.data.daily.data.length; i++) {
			 		 		const time = response.data.daily.data[i].time;

			 		 		if (i < 7) {
			 		 		axios.get(`https://api.darksky.net/forecast/${darkskyKey}/${lat},${long},${time}`)
			 		 			.then( response => {
			 		 				this.setState({
			 		 					timezone: response.data.timezone,
			 		 					fullForecast: this.state.fullForecast.concat(response.data.hourly.data)
			 		 				})
			 		 			})
			 		 			.catch( err => {
			 		 				console.log(err)
			 		 			})
			 		 		} else {
							axios.get(`https://api.darksky.net/forecast/${darkskyKey}/${lat},${long},${time}`)
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
			 	this.setState({
			 		loading: false,
			 		loadingDone: false,
			 		failed: true,
			 	})
			 })
	}

	componentWillMount() {
		navigator.geolocation.getCurrentPosition( position => {
		this.setState({
			loading: true,
			lat: position.coords.latitude,
			long: position.coords.longitude
		})
		const { lat, long, darkskyKey, geocoderKey } = this.state;
		axios.get(`http://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${geocoderKey}`)
			 .then( response => {
			 	this.setState({
			 		place: response.data.results[0].components.town
			 	})
			 	axios.get(`https://api.darksky.net/forecast/${darkskyKey}/${lat},${long}`)
			 		 .then( response => {
			 		 	this.setState({
			 		 		forecast: response.data,
			 		 	})
			 		 	for(let i=0; i < response.data.daily.data.length; i++) {
			 		 		const time = response.data.daily.data[i].time;

			 		 		if (i < 7) {
			 		 		axios.get(`https://api.darksky.net/forecast/${darkskyKey}/${lat},${long},${time}`)
			 		 			.then( response => {
			 		 				this.setState({
			 		 					timezone: response.data.timezone,
			 		 					fullForecast: this.state.fullForecast.concat(response.data.hourly.data)
			 		 				})
			 		 			})
			 		 			.catch( err => {
			 		 				console.log(err)
			 		 			})
			 		 		} else {
							axios.get(`https://api.darksky.net/forecast/${darkskyKey}/${lat},${long},${time}`)
								.then( response => {
									this.setState({
										fullForecast: this.state.fullForecast.concat(response.data.hourly.data),
										loading: false,
										loadingDone: true,
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
 		})
	}



	render() {
		let loadDisplay = null;
		if (this.state.loading || !this.state.failed) {
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
					<h3> No Matches Found </h3>
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