"use strict";

console.log("UserStorageFactory.js is connected");

app.factory("UserStorageFactory", function() {

	//variables to hold users' info
	let currentUserPins = [];
	let currentUserBoard = [];


	//Args: The obj name you want to store within localStorage 
	//Ex: 'board', 'pins', 'users'
	let getUserInfo = (location) => JSON.parse(localStorage.getItem(location));
	//Args(2): userinfoObj = {userInfoInformation in obj form}, location = ('board', 'pins', 'users')
	let setUserinfo = (userInfoObj, location) => {
		return new Promise((resolve) => {
			switch(location) {
				case 'users': 
					localStorage.setItem(location, JSON.stringify(userInfoObj));
					resolve();
					break;
				case 'board': 
					currentUserBoard.push(userInfoObj);
					localStorage.setItem(location, JSON.stringify(currentUserBoard));
					resolve();
					break;
				case 'pins': 
					currentUserPins.push(userInfoObj);
					localStorage.setItem(location, JSON.stringify(currentUserPins));
					resolve();
					break;
			}
		});
	};
	
	return {getUserInfo, setUserinfo};
});





