



chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) { 

	if (request.timer == "start") {
		let interval = request.interval;
		console.log('START THE TIMER: ' + interval);
		chrome.alarms.create('job', {
        	periodInMinutes: interval
    	});
	}
	sendResponse({status : 'OK'});

});




// recive alarm 
chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'job') {

   		chrome.windows.create({
			url: "alert.html",
			focused: true,
			type: "popup",
			state: "maximized"
		});
    }
});


   		chrome.notifications.create('nofi-id', 
   			{
   				type: 'basic',
   				iconUrl: 'icon.png',
   				title: 'hello',
   				message : "hahahhaaahhahahh"});



