
var TIMESTAMP = undefined;
var INTERVAL = undefined;
var POPUP_WINDOW_ID = undefined;

function playAlarm() {
	chrome.alarms.create('alert', {
		when: Date.now() + 10,
		periodInMinutes: 1
	});
	
}


function restTimer(period) {
	chrome.alarms.create('alert', {
		periodInMinutes: period
	});
}


function miniPopup() {
	if (POPUP_WINDOW_ID){
		chrome.windows.update(POPUP_WINDOW_ID, {
			focused: false, 
			state: "minimized"
		});	
	}
}


function closePopup() {
	if (POPUP_WINDOW_ID) {
		chrome.windows.remove(POPUP_WINDOW_ID, function() {
			POPUP_WINDOW_ID = undefined;
		});
	}
}


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

function completeTimer() {
	// save the task 
	let now = new Date();
	let key = now.toISOString().slice(0,10);

	chrome.storage.sync.get(key, function(object) {
    // Notify that we saved.
	    console.log('current status for date ' + key);
	    console.log(object);

	    // construct new records 
	    if (object[key] == undefined) {
	    	object[key] = [];
	    }

	    let record = {
	    	start: TIMESTAMP,
	    	interval: INTERVAL
	    }
	    object[key].push(record);

	    chrome.storage.sync.set({
	    	[key] : object[key]
	    }, function () {
	    	console.log('key saved');
	    });

		// popup open 
		console.log('popup opened');
		chrome.windows.create({
			url: "alert.html",
			focused: true,
			type: "popup",
			state: "maximized"
		}, function(window) {
			POPUP_WINDOW_ID = window.id;
			playAlarm();
		});

  	});


}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
	if (request.timer == "start") {
		let interval = request.interval;
		console.log('START THE TIMER: ' + interval);		
		closePopup();
		startTimer(interval)
		sendResponse({status : 'OK'});

	} 
	else if (request.timer == "timestamp") {
		console.log('GET THE TIMER');
		let elapse = Date.now() - TIMESTAMP;
		sendResponse({
			status : 'OK', 
			timestamp : TIMESTAMP, 
			elapse: elapse, 
			interval: INTERVAL
		});
	} 
	else if (request.timer == "stop") {
		console.log('STOP THE TIMER');
		chrome.alarms.clear('job', function() {
    		TIMESTAMP = undefined;
    		INTERVAL = undefined;
		});
		closePopup();
		sendResponse({status : 'OK'});
	} 
	else if (request.timer == "rest" ) {
		console.log('REST THE ALARM');
		restTimer(5);
		miniPopup();
		sendResponse({status : 'OK'});
	} 
	else if (request.timer == "continue") {
		console.log('CONTINUE THE ALARM');
		startTimer();
		closePopup();
		sendResponse({status : 'OK'});
	}
	else if (request.statistic == 'today') {
		console.log('GET STAT TODAY');
		let now = new Date();
		let key = now.toISOString().slice(0,10);
		chrome.storage.sync.get(key, function(records) {
			let result = {totalTime : 0 , records : []};
			if (Array.isArray(records[key])) {
				for (var i = 0; i < records[key].length; i++) {					
					let record = records[key][i]
					console.log(record);
					let interval = record.interval;
					let timestamp = record.timestamp;
					if(interval){
						result.records.push(record);
						result.totalTime = result.totalTime + interval;
					}

				}
			}
			sendResponse({status : 'OK', result : result});
		});
		return true;
	} 
	return false;

});


chrome.windows.onRemoved.addListener(function (id) {
	if (id == POPUP_WINDOW_ID) {
		console.log('popup closed');
		// clear alarm 
		POPUP_WINDOW_ID = undefined;
		chrome.alarms.clear('alert', function() {
			console.log('alert alarm cleared');
		});
	}
});


// recive alarm 
chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'job') {
    	if (POPUP_WINDOW_ID == undefined) {
    		completeTimer();
   		} else {
   			chrome.notifications.create('nofi-id', 
   			{
   				type: 'basic',
   				iconUrl: 'icon.png',
   				title: 'hello',
   				message : "pls close popup"
   			});

   		}   			

    } else if (alarm.name === 'alert') {
    	console.log('playing alert');
		if (POPUP_WINDOW_ID) {
			let audio = new Audio('alarm.mp3');
			audio.play();	

			chrome.windows.update(POPUP_WINDOW_ID, {
				focused: true, 
				state: "maximized"
			});	
		}

    }
});



