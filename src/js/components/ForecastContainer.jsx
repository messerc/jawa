import React from 'react';
import moment from 'moment';


import ForecastOverview from './ForecastOverview.jsx'
import ForecastLineChart from './ForecastLineChart.jsx'
import DayForecast from './DayForecast.jsx'

export default class ForecastContainer extends React.Component {
	constructor(props) {
		super(props);

		// METHODS WILL BE BOUND HERE I AM SURE OF IT!!!
	}

	render() {
		const { data, location, fullForecast, timezone } = this.props;
		const dailyForecasts = data.daily.data.map( forecast => {
			return <DayForecast data={forecast} key={forecast.time} />
		})
		return (
		<div>
		<br />
		<br />
			<div className="row">
				<div className="col-sm-3 col-sm-offset-2 col-xs-6 ">
					<ForecastOverview data={data.currently} location={location} />
				</div>
				<div className="col-sm-5 col-xs-6 ">
					<ForecastLineChart data={data.hourly.data} />
				</div>
			</div>
		<br />
		<br />
			<div className="row">
				<div className="col-md-8 col-md-offset-2">
					<div className="flexbox">
						{dailyForecasts}
					</div>
				</div>
			</div>
		</div>
			)
	}
}