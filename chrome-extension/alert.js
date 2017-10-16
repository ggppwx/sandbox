$( document ).ready(function() {


	
	$("#btn-rest").click(function() {
		chrome.runtime.sendMessage({ "timer": "rest"}, function(response) {
		});
	});


	$("#btn-continue").click(function() {
		chrome.runtime.sendMessage({ "timer": "continue"}, function(response) {
		});
	});


	// chart 
	function plotTimeline(records) {
	  var container = document.getElementById('chart-timeline');

	  // Create a DataSet (allows two way data-binding)
	  	let data = []
	    for (var i = 0; i < records.length; i++) {
	      	let startTimestamp = records[i].start;
	      	let endTimestamp = startTimestamp + records[i].interval * 60 * 1000;
	      	data.push({ 
	      		id: i, 
	      		content: '', 
	      		start: new Date(startTimestamp), 
	      		end: new Date(endTimestamp) 
	      	});
	      		
	      }

	  var items = new vis.DataSet(data);

	  // Configuration for the Timeline
	  var options = {};
	  // Create a Timeline
	  var timeline = new vis.Timeline(container, items, options);

	}


	// retrieveing data 
	chrome.runtime.sendMessage({ "statistic": "today"}, function(response) {
		if (response && response.status == "OK"){
			let result = response.result;
			$("#span-totalTime").text(result.totalTime);
			plotTimeline(result.records);


		}
	});
	
	









});
