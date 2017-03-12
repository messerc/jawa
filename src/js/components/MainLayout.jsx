import React from 'react';
import axios from 'axios';
import { Router, Route, Link } from 'react-router';
import moment from 'moment';
import 'moment-timezone';

import Header from './Header.jsx';
import Form from './Form.jsx';
import PromotionsContainer from './PromotionsContainer.jsx'
import RestaurantsContainer from './RestaurantsContainer.jsx'


export default class MainLayout extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			value: '', 
			restaurant: ''
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
			restaurant: this.state.value
		})
		/*axios.get(`http://api.opencagedata.com/geocode/v1/json?q=${this.state.value}&key=${this.state.geocoderKey}`)
			 .then( response => {
			 	console.log(response.data.results[0].components)
			 	this.setState({
			 		place: {
			 			town: response.data.results[0].components.city,
			 			state: response.data.results[0].components.state
			 		},
			 		lat: response.data.results[0].geometry.lat,
			 		long: response.data.results[0].geometry.lng
			 	})
			 .catch( err => {
			 	this.setState({
			 		loading: false,
			 		loadingDone: false,
			 		failed: true,
			 	})
			}) */
	}

	componentWillMount() {

	}



	render() {
		console.log(this.state)
		return (
			<div className="container">
				<Header />

				<Form 
				  onSubmit={this.handleSubmit}
				  text={this.state.value}
				  onUserInput={this.handleUserInput}
				/> 
				<br /> <br /> <br />
				<div className='col-md-12'>
					<RestaurantsContainer /> 
				</div>

			</div>
		)
	}
}