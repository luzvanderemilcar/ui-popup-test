
//Set dependencies
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

// Handle Request
app.get("/bmicalculator", (req, res) => {
	res.sendFile(__dirname + "/bmiCalculator.html");
});

// Send the result to the user
app.post("/bmicalculator", (req, res) => {
	
	//Request processing
	const weightNumber = parseFloat(req.body.weight);
	const heightNumber = parseFloat(req.body.height);

	/*function bmiCalculator(weight, height) {
		return weight / Math.power(height, 2);
	}
	*/
	
	// Import bmiCalculator function bmiCalculator.js	
	import {bmiCalculator} from __dirname + "/bmiCalculator.js";	

	//Response processing
	res.send("Your BMI Score is : " + bmiCalculator(weightNumber, heightNumber));
});


//Setting the port the server should listen to
app.listen(3000, () => {
	console.log("Server running at port 3000");
});