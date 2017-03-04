"use strict";

console.log("UserStorageFactory.js is connected");

app.factory("UserStorageFactory", function() {

	//variables to hold users' info
	let currentUserInfo = '';
	let currentUserPins = '';
	let currentUserBoard = '';


	//Args: The obj name you want to store within localStorage 
	//Ex: 'board', 'pins', 'users'
	let getUserInfo = (location) => {
		switch (location) {
			case 'pins': 
				return currentUserPins;
			case 'board': 
				return currentUserBoard;
			case 'users': 
				return currentUserInfo;
		} 
		// JSON.parse(localStorage.getItem(location));
	};


	//Args(2): userinfoObj = {userInfoInformation in obj form}, location = ('board', 'pins', 'users')
	let setUserinfo = (userInfoObj, location) => {
		return new Promise((resolve) => {
			switch(location) {
				case 'users': 
					// localStorage.removeItem(location);
					// localStorage.setItem(location, JSON.stringify(userInfoObj));
					currentUserInfo = userInfoObj;
					resolve();
					break;
				case 'board': 
					// localStorage.removeItem(location);
					// localStorage.setItem(location, JSON.stringify(currentUserBoard));
					currentUserBoard = userInfoObj;
					resolve();
					break;
				case 'pins': 
					// localStorage.removeItem(location);
					// localStorage.setItem(location, JSON.stringify(currentUserPins));
					currentUserPins = userInfoObj;
					resolve();
					break;
			}
		});
	};


	//Trying without localStorage for now
	// let deleteLocalStorage = (location) => {
	// 	return new Promise((resolve, reject) => {
	// 		localStorage.removeItem(location);
	// 		resolve();
	// 	});
	// };
	
	return {getUserInfo, setUserinfo};
});





