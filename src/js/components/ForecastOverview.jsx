import React from 'react';
import moment from 'moment';


export default class ForecastOverview extends React.Component {

	render() {
		const { data, location } = this.props;
		return (
			<div>
			<h2>{location}</h2>
			<h4>{moment.unix(data.time).format('dddd h a')}</h4>
			<h3>{Math.round(data.temperature)} <span className="text-muted small"> degrees</span> </h3>
			</div>
			)
	}
}