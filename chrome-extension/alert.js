$( document ).ready(function() {


	// play alarm 
	$("#alarm").trigger('play');
	setInterval(function() {
		$("#alarm").trigger('play');
		window.focus();
	}, 1000 * 60 * 5);



	// retrieveing data 
	chrome.runtime.sendMessage({ "statistic": "today"}, function(response) {
		if (response && response.status == "OK"){
			let timestamp = response.timestamp;

		}
	});








});
