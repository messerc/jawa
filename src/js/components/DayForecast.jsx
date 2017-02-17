import React from 'react';
import moment from 'moment';

import WeatherIcon from '../../icons/WeatherIcon.jsx'


export default class DayForecast extends React.Component {

	render() {
		const { data } = this.props;
		console.log(data);
		return (
			<div className="well box">
				<h4> <WeatherIcon icon={data.icon} /> </h4>
				<h4>{moment.unix(data.time).format('ddd')}</h4>
				<h6>{Math.round(data.temperatureMax)} | {Math.round(data.temperatureMin)} </h6>
				<h6>{data.summary}</h6>
			</div>
			)
	}
}