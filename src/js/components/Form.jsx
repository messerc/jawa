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
			<div style={{display: 'block', textAlign: 'center'}} className="form-group">
				<form style={{display: 'inline-block', margin: 'auto', width: '300px'}} onSubmit={this.handleSubmit}>
					<div>
					<input type="text" 
						   value={this.props.text} 
						   ref={(input) => this.textInput = input} 
						   onChange={this.handleChange} 
						   className="form-control"
						   placeholder="Find a restaurant..." />
					</div>
				</form> 
			</div>
		</div>
			)
	}
}