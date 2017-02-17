import React from 'react';
import moment from 'moment';

import BigWeatherIcon from '../../icons/BigWeatherIcon.jsx'


export default class ForecastOverview extends React.Component {

	render() {
		const { data, location } = this.props;
		console.log(data);
		return (
			<div>
				<div className="col-md-2">
					<BigWeatherIcon icon={data.icon} />
				</div>
				<div className="col-md-10">
					<h2>{location.city}</h2>
					<h6 className="text-muted">{location.state}</h6>
					<h4 className="text-muted small" style={{margin: "0px"}}> Currently: {data.summary} </h4>
					<h4>{Math.round(data.temperature)} <span className="text-muted small"> degrees</span> </h4>
					<h6 className="text-muted">{Math.round(data.apparentTemperature)} real feel </h6>
				</div>
			</div>
			)
	}
}