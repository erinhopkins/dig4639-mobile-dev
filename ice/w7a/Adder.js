class Adder {
	constructor(props) {
		this.props = props;
	}

	sum() {
		if (!this.props.a || !this.props.b) return null;
		return this.props.a + this.props.b;
	}

	render() {
		return `<p>The sum of ${this.props.a} and ${this.props.b} is ${this.sum()}</p>`;
	}
}

module.exports = Adder;