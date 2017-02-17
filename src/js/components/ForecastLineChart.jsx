import React from 'react';
import moment from 'moment';
import 'moment-timezone';

import { ResponsiveContainer, 
		 XAxis, YAxis, CartesianGrid, AreaChart, Area, Tooltip, linearGradient, ReferenceLine} from 'recharts';


class CustomizedToolTip extends React.Component {
	render() {
		const { active, timezone } = this.props;
		if (active) {
			const { payload } = this.props; 
			const displayInTip = payload[0].payload;
		return (
			<div className="well well-sm">
				<p>{moment.unix(displayInTip.time).tz(timezone).format('dddd h a')}</p>
				<p>{Math.round(displayInTip.temperature)} degrees</p>
			</div>
			)
		}
		return null;
	}
}

export default class ForecastLineChart extends React.Component {

	render() {
		const { data, location, timezone } = this.props;
		let currentDay = moment.unix(data[0].time).tz(timezone).format('dddd');
		const referenceLines = data.map( (forecast) => {
			const day = moment.unix(forecast.time).tz(timezone).format('dddd');
			if (day === currentDay) {
				return null;
			} else if (day !== currentDay) {
				currentDay = day;
				return <ReferenceLine x={forecast.time} key={forecast.time} stroke="rgb(151, 151, 151)" />
			}
		})

		const getTempAvg = () => {
			let totalTempSump = 0;

			for (let i=0; i < data.length; i++) {
				totalTempSump = totalTempSump + data[i].temperature
			}

			return totalTempSump / data.length
		}


		return (
			<ResponsiveContainer height={300}>
				<AreaChart data={data} margin={{ top: 100, right: 0, left: 0, bottom: 5 }}>
					<defs>
					   <linearGradient id="chartcolor" x1="0" y1="0" x2="0" y2="1">
					     <stop offset="5%" stopColor="rgb(200, 204, 0)" stopOpacity={1}/>
					     <stop offset="95%" stopColor="rgb(151, 168, 0)" stopOpacity={0.4}/>
					   </linearGradient>
					</defs>
					  <XAxis dataKey="time" tickLine={false} tick={false} />
					  <YAxis type="number" hide={true}  domain={['dataMin - 5', 'dataMax + 5']} />
					  <Area type="monotone" 
					  dataKey="temperature" 
					  stroke="rgb(104, 104, 104)" 
					  fill="url(#chartcolor)" 
					  activeDot={{stroke: "rgb(104, 104, 104)", fill: "rgb(104, 104, 104)", strokeWidth: 2, r: 2}} />
					  <Tooltip content={<CustomizedToolTip timezone={timezone} />} cursor={false} />
					  <ReferenceLine y={getTempAvg()} stroke="rgb(255, 157, 8)" strokeDasharray="3 3" />
					  {referenceLines}
				</AreaChart>
			</ResponsiveContainer>
			)
	}
}