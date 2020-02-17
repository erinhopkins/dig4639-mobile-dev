function Sum (a, b) {
	let result = undefined;
	if(typeof a == "number" &&  typeof b == "number") {
  	result = a + b
	}
	return result;
}


function AddList(arr) {
	let result = undefined;
	if(Array.isArray(arr) && arr.length > 0) {
		result = 0;
		for(var elem of arr) {
			if(typeof elem != "number") {
				result = undefined;
				break;
			}
			result = result + elem;
		}
	}
	return result;
}

export { Sum, AddList };




//DivideBy
// function divide(a, b) {
//   return a / b;
// }

// export { divide };