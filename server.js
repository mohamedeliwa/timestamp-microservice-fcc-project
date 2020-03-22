// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
// var cors = require('cors');
// app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?",  function (req, res) {

    let dateString;
    // checking if the date param is empty
    if (!req.params.date_string) {
      // returning the current date
      return res.json({ unix: new Date().getTime(), utc: new Date().toUTCString()})
    } else {
      // checking if the date param is in  ISO-8601 format (e.g. "2015-12-25") 
      // or if it's in  unix timestamp format (e.g. "1450137600")
      // if ISO format we will create Date object directly
      // if unix, we will convert the param string into integer first then create the Date object
      dateString = (req.params.date_string.includes("-")) ? ( new Date(req.params.date_string) ) : (
        new Date(parseInt(parseInt(req.params.date_string)))
      )  
    }
    // checking if the param string was an invalid date first
     return dateString == "Invalid Date" ? ( res.json({"error" : "Invalid Date" }) ): (
       res.json({ unix: dateString.getTime(), utc:  dateString.toUTCString()})
     );
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("message " + process.env.MSG);
  console.log('Your app is listening on port ' + listener.address().port);
});