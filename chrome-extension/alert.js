$( document ).ready(function() {
	$("#alarm").trigger('play');

	setInterval(function() {
		$("#alarm").trigger('play');
	}, 1000 * 60 * 5);
});


