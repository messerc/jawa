import React from 'react';
import moment from 'moment';


export default class ForecastOverview extends React.Component {

	render() {
		const { data, location } = this.props;
		return (
			<div>
			<h2>{location}</h2>
			<h4 className="text-muted small" style={{margin: "0px"}}> Currently: {data.summary} </h4>
			<h4>{Math.round(data.temperature)} <span className="text-muted small"> degrees</span> </h4>
			<h6 className="text-muted">{Math.round(data.apparentTemperature)} real feel </h6>
			</div>
			)
	}
}