$( document ).ready(function() {



	$("#btn-rest").click(function() {
		chrome.runtime.sendMessage({ "timer": "rest"}, function(response) {
		});
	});


	// retrieveing data 
	chrome.runtime.sendMessage({ "statistic": "today"}, function(response) {
		if (response && response.status == "OK"){
			let result = response.result;
			$("#span-totalTime").text(result.totalTime);
		}
	});








});
