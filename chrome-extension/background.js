
var TIMESTAMP = undefined;
var INTERVAL = undefined;
var POPUP_WINDOW_ID = undefined;


function startTimer(interval) {
	console.log('func::startTimer');
	if (interval == undefined &&  INTERVAL == undefined) { 
		//exception
		throw { name: "ERROR"};
	}

	if (interval == undefined && INTERVAL) {
		interval = INTERVAL;
	}

	chrome.alarms.clear('job', function() {
		chrome.alarms.create('job', {
    		delayInMinutes: interval
		});
		TIMESTAMP = Date.now();
		INTERVAL = interval;
	});


}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) { 

	if (request.timer == "start") {
		let interval = request.interval;
		console.log('START THE TIMER: ' + interval);		
		startTimer(interval)
		sendResponse({status : 'OK'});

	} else if (request.timer == "timestamp") {
		console.log('GET THE TIMER');
		let elapse = Date.now() - TIMESTAMP;
		sendResponse({
			status : 'OK', 
			timestamp : TIMESTAMP, 
			elapse: elapse, 
			interval: INTERVAL
		});
	} else if (request.timer == "stop") {
		console.log('STOP THE TIMER');
		chrome.alarms.clear('job', function() {
    		TIMESTAMP = undefined;
    		INTERVAL = undefined;
		});
		sendResponse({status : 'OK'});
	}
	
});


chrome.windows.onRemoved.addListener(function (id) {
	if (id == POPUP_WINDOW_ID) {
		console.log('popup closed');
		startTimer();
		POPUP_WINDOW_ID = undefined;
	}
});


// recive alarm 
chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'job') {
    	if (POPUP_WINDOW_ID == undefined) {
    		console.log('popup opened');
    		// popup open 
	   		chrome.windows.create({
				url: "alert.html",
				focused: true,
				type: "popup",
				state: "maximized"
			}, function(window) {
				POPUP_WINDOW_ID = window.id;
				
			});
   		} else {
   			chrome.notifications.create('nofi-id', 
   			{
   				type: 'basic',
   				iconUrl: 'icon.png',
   				title: 'hello',
   				message : "pls close popup"
   			});

   		}   			

    }
});



