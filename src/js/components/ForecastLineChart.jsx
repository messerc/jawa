import React from 'react';
import moment from 'moment';
import 'moment-timezone';

import { ResponsiveContainer, 
		 XAxis, YAxis, CartesianGrid, AreaChart, Area, Tooltip, linearGradient} from 'recharts';


class CustomizedToolTip extends React.Component {
	render() {
		const { active, timezone } = this.props;
		if (active) {
			const { payload } = this.props; 
			const displayInTip = payload[0].payload;
			console.log(displayInTip);
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
		return (
			<div>
			<ResponsiveContainer height={300}>
				<AreaChart data={data} margin={{ top: 75, right: 0, left: 0, bottom: 5 }}>
					<defs>
					   <linearGradient id="chartcolor" x1="0" y1="0" x2="1" y2="0">
					     <stop offset="5%" stopColor="rgb(51, 51, 51)" stopOpacity={1}/>
					     <stop offset="95%" stopColor="rgb(151, 151, 151)" stopOpacity={0.4}/>
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
				</AreaChart>
			</ResponsiveContainer>
			</div>
			)
	}
}