import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';


export default class HourlyDisplay extends React.Component {
	render() {
		return (
			<div className="col-md-2 well">
			{Math.round(this.props.data.temperature)} @ {moment.unix(this.props.data.time).format('MMM Do, h a')}
			</div>
			)
	}
}