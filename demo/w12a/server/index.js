// server/index.js
// https://expressjs.com/en/starter/hello-world.html
const express = require('express')
const fetch = require("node-fetch");
// terminal: npm install cors
const cors = require('cors')
const app = express()
const port = 3001
<<<<<<< HEAD
const simpleJson = {a: 10,
	b:"Hello DIG4639!",
	list: [
		{title: "Tonight",
		content: "Watching Netflix"},
		{title: "Tomorrow",
		content: "Completing Homework"}
	]
}
=======
/* Step 2
const simpleJson = {a: 10, 
  b: "Hello DIG4639!", 
  list:[
    {title:"Tonight",
    content: "Watching Netflix"},
    {title:"Tomorrow",
    content: "Completing Homework"}
  ]
} 
*/
const helloWorld = "Hello World"
>>>>>>> 85308e767b6d679b23adec243374a9d10fde4199

app.use(cors())
app.get('/', async (req, res) => {
  // Step 2:
  // res.send(simpleJson)
  res.send(helloWorld)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))