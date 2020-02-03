const Adder = require("./Adder.js");

let adder = new Adder(
	{
		a: 1,
		b: 2,
	});

console.log(adder.render() );