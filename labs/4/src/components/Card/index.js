import React from 'react';
import "./index.css"

class Card extends React.Component{
	constructor(props) {
		super(props);
		this.props = props;
		this.content = this.props.content;
	}

	render () {
		return (
			<div className = "card">
				<span className="close" onClick={() => this.props.removeCard()} datatitle={this.props.title}>&times;</span>
				<h3>{this.props.title}</h3>
				<p>{this.props.content}</p>
			</div>
		)
	}
}

export default Card;