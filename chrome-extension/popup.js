$(document).ready(function() {


$("#btn-start").click(function() {

	let interval = parseInt($("#entry-interval").val());
	console.log(interval);

	chrome.runtime.sendMessage({ "timer": "start", "interval": interval}, function(response) {
		console.log('------------');


	});

});

});