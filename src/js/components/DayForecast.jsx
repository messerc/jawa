import React from 'react';
import moment from 'moment';


export default class DayForecast extends React.Component {

	render() {
		const { data } = this.props;
		console.log(data)
		return (
			<div className="col-md-3">
				<div className="col-xs-4" style={{padding: '10px'}}>
					ICON 
				</div>
				<div className="col-xs-8">
						<h4>{moment.unix(data.time).format('ddd')}</h4>
						<h6>{Math.round(data.temperatureMax)} | {Math.round(data.temperatureMin)} </h6>
						<h6>{data.summary}</h6>
				</div>
			</div>
			)
	}
}