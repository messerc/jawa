import React from 'react';

export default class Form extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange() {
		this.props.onUserInput(this.textInput.value)
	}

	handleSubmit(e) {
		this.props.onSubmit(e)
	}

	render() {
		return (
		<div className="row">
			<div className="col-md-8 col-md-offset-2">
				<form onSubmit={this.handleSubmit}>
					<div className="input-group">
					<input type="text" value={this.props.text} ref={(input) => this.textInput = input} onChange={this.handleChange} className="form-control" />
					</div>
				</form> 
			</div>
		</div>
			)
	}
}