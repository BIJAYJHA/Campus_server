
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://BIJAY_JHA:bj.prank0209@ds255539.mlab.com:55539/campusplacement";
const port = process.env.PORT || 3001;
var details = {
	id:[],
	qus:[],
	ans:[],
	option:[]
};

	app.use(cors());      // to support JSON-encoded bodies
	app.use( bodyParser.json() );       // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	  extended: true
	})); 

	app.use(express.json());       // to support JSON-encoded bodies
	app.use(express.urlencoded()); // to support URL-encoded bodies

	app.get('/getReady.json', (req, res) => {
    console.log('get is received for question page');
    MongoClient.connect(url, function(err, dbo) {
	    if (err) throw err;
	 
	    var database = dbo.db('campusplacement');
	    database.collection("placementquestions").find({}).toArray( function(err, questions) {
	    if (err) throw err;
	    
	    for (var i = 1 ; i <= questions.length ; i++) {
	     details.id[i-1] = i
	     details.qus[i-1] = questions[i-1].qus;
	     details.option[i-1] = questions[i-1].option;
	     details.ans[i-1] = questions[i-1].ans;
	     } 

	    console.log(details);
	    dbo.close();
		res.setHeader('Cache-Control', 'no-cache');
   		res.json("success");
	    });
         
      }); 
	 
	});

	app.get('/getquestion.json', (req, res) => {
		var idreq = req.query.quesno;
		res.setHeader('Cache-Control', 'no-cache');
   		res.json({
   			"question" : details.qus[idreq],
   			"option" : details.option[idreq],
   			"answer" : details.ans[idreq]
   		});

	});
	
app.listen(port, "192.168.43.131" ,  function () {
  console.log("server is created!!");
})