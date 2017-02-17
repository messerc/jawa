import React from 'react';
import moment from 'moment';

import WeatherIcon from '../../icons/WeatherIcon.jsx'


export default class DayForecast extends React.Component {

	render() {
		const { data } = this.props;
		return (
			<div className="well box">
				<WeatherIcon icon={data.icon} /> 
				<h4>{moment.unix(data.time).format('ddd')}</h4>
				<h6>{Math.round(data.temperatureMax)} | {Math.round(data.temperatureMin)} </h6>
				<h6>{data.summary}</h6>
			</div>
			)
	}
}