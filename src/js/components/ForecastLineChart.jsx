import React from 'react';
import moment from 'moment';

import { ResponsiveContainer, 
		 XAxis, YAxis, CartesianGrid, AreaChart, Area, Tooltip, linearGradient} from 'recharts';


class CustomizedToolTip extends React.Component {
	render() {
		const { active } = this.props;
		if (active) {
			const { payload } = this.props; 
			const displayInTip = payload[0].payload;
		return (
			<div className="well well-sm">
				<p>{moment.unix(displayInTip.time).format('dddd h a')}</p>
				<p>{Math.round(displayInTip.temperature)} degrees</p>
			</div>
			)
		}
		return null;
	}
}

export default class ForecastLineChart extends React.Component {

	render() {
		const { data, location } = this.props;
		console.log(data);
		return (
			<div className="chart">
			<ResponsiveContainer height={200}>
				<AreaChart data={data} margin={{ top: 75, right: 0, left: 0, bottom: 5 }}>
					<defs>
					   <linearGradient id="chartcolor" x1="0" y1="0" x2="0" y2="1">
					     <stop offset="5%" stopColor="rgb(151, 151, 151)" stopOpacity={1}/>
					     <stop offset="95%" stopColor="rgb(151, 151, 151)" stopOpacity={0.4}/>
					   </linearGradient>
					</defs>
					  <XAxis dataKey="time" tickLine={false} tick={false} />
					  <YAxis type="number" tickLine={false} tick={false}  domain={['dataMin - 5', 'dataMax + 5']} />
					  <Area type="monotone" 
					  dataKey="temperature" 
					  stroke="rgb(104, 104, 104)" 
					  fill="rgb(151, 151, 151)" 
					  activeDot={{stroke: "rgb(104, 104, 104)", fill: "rgb(104, 104, 104)", strokeWidth: 2, r: 2}} />
					  <Tooltip content={<CustomizedToolTip />} cursor={false} />
				</AreaChart>
			</ResponsiveContainer>
			</div>
			)
	}
}