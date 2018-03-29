$(document).ready(function() {

updateTime();



$("#btn-start").click(function() {

	let interval = parseInt($("#entry-interval").val());
	console.log(interval);

	chrome.runtime.sendMessage({ "timer": "start", "interval": interval}, function(response) {
		updateTime();
	});

});

$("#btn-stop").click(function() {
	chrome.runtime.sendMessage({ "timer": "stop"}, function(response) {
		updateTime();
	});

});


$("#btn-clock").click(function() {

	
});

function updateTime() {
	chrome.runtime.sendMessage({ "timer": "timestamp"}, {}, function(response) {
		if (response && response.status == "OK"){
			let timestamp = response.timestamp;
			if (timestamp) {
				$("#span-timestamp").text(new Date(timestamp).toTimeString());	
				let elapse = response.elapse/(60 * 1000);
				let interval = response.interval; 	
				let progress = elapse* 100/interval;
				$("#span-elapse").text(elapse);
				$("#span-interval").text(interval);
				$("#progressbar").attr("value", progress);	
			} else {
				$("#span-timestamp").text("");	
				$("#span-elapse").text(0);
				$("#span-interval").text("");
				$("#progressbar").attr("value", 0);	
			}
		}

	});



	chrome.runtime.sendMessage({ "statistic": "today"}, function(response) {
		if (response && response.status == "OK"){
			let result = response.result;
			$("#span-totalTime").text(result.totalTime);

		}
	});

}


});