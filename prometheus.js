#!/usr/bin/env node
var request  = require('request');

//End and Start Epochtime
var Et = Math.round((new Date()).getTime() / 1000);
var St=Et-10;


//Initialize the queries
var queries=[
		//	"node_memory_MemAvailable_bytes",
	//		"node_procs_running",
			"node_memory_free_bytes_total"
		];


for(var i=0;i<queries.length;i++){


	//Create object for generating token
	var getMetric = {
		uri: 'http://localhost:9090/api/v1/query?query='+queries[i]+'&time='+Et+'&_='+St,
	  	method: 'GET',
	  	headers: {
	      	'Content-Type': 'application/json',
	      	'Accept': 'application/json',
	  		}
		};

	request(getMetric, function(error, response, body) {
	  
		if(error){
			console.log(error)
			   	}
	  	else{
	  		var regExp1 = new RegExp('value.*\,\"(.*)\"');
			var regExp2 = new RegExp('name.*\"\:\"([a-zA-Z_]+)\"\,')
			var met_val = body.match(regExp1);
			var met_name = body.match(regExp2);
		 	console.log(met_name[1]+': '+met_val[1]);
	  	}
	
	});

}
