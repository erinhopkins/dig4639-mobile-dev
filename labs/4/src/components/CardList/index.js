import React from 'react';
import Card from "../Card/index.js";
// Import data.json and use the data
import data from '../../data.json';



class CardList extends React.Component {
	constructor(props) {
		super(props)
		this.state = { cards: data.cards.map((v,i) => {
			v.id = i
			return v
		}) }
}

// Pass a click listener function so that each card can remove themselves.
removeCard(id) {
	console.log("clicked myself" + id)
	console.log(this.state.cards)
	let cards = this.state.cards.filter((v) => v.id !== id)
	console.log(cards)
	this.setState({cards: cards});
}


render () {
	return (
			this.state.cards.map((v,i) =>
			<Card
				key={v.id}
				removeCard={() => this.removeCard(v.id)}
				id={i}
				// Attributes to pass data to each Card.
				title={v.title}
				content={v.content}
				removecard={this.removeCard}
			>
			</Card>
			)
		);
	}
}

export default CardList;