import React from 'react';
import moment from 'moment';

import WeatherIcon from '../../icons/WeatherIcon.jsx'


export default class DayForecast extends React.Component {


	render() {
		const { data } = this.props;
		return (
			<div className="well box">
				<WeatherIcon icon={data.icon} /> 
				<h4 style={{textAlign: 'center'}}>{moment.unix(data.time).format('ddd')}</h4>
				<h6 style={{textAlign: 'center'}}>{Math.round(data.temperatureMax)} | {Math.round(data.temperatureMin)} </h6>
			</div>
			)
	}
}