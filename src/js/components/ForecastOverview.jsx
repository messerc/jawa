import React from 'react';
import moment from 'moment';

import BigWeatherIcon from '../../icons/BigWeatherIcon.jsx'


export default class ForecastOverview extends React.Component {

	render() {
		const { data, location } = this.props;
		console.log(data);
		return (
			<div>
				<div className="col-xs-6">
					<BigWeatherIcon icon={data.icon} />
				</div>
				<div className="col-xs-6" style={{marginTop: '20px', paddingTop: '20px'}}>
					<h4>{location.town}</h4>
					<h6 className="text-muted">{location.state}</h6>
					<h4 className="text-muted small"> {data.summary} </h4>
				</div>
			</div>
			)
	}
}