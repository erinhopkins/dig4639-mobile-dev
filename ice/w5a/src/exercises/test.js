class User{
	constructor(props) {
		this.props = props;
	}

	sum() {
		return this.props.a + this.props.b;
	}

	printName() {
		console.log(this.sum());
		console.log(`${this.props.userName}, id is ${this.props.id}`);
	}

var myUser = new User({userName:"Jessica", id:5});
myUser.printName();
myUser = null;
myUser.printName();


}
function myFunction() {
	return this;
}

