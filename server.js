// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", (req, res) => {
  let date = new Date();
  
  // Check if date is input
  if (req.params.date_string.length > 0) {
    let input = req.params.date_string;
    
    // Check if dateString or milliseconds
    if (input.indexOf('-') === -1) {
      input = parseInt(input);
    }
    date = new Date(input);
  }
  
  if (date instanceof Date && !isNaN(date)) {
    let unixDate = date.getTime();
    let utcDate = date.toUTCString();
    res.json({unix: unixDate, utc: utcDate});
  } else {
    res.json({unix: null, utc: 'Invalid Date'});
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});