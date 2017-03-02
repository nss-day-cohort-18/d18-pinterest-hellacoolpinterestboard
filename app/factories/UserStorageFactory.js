"use strict";

console.log("UserStorageFactory.js is connected");

app.factory("UserStorageFactory", function() {

	//variables to hold users' info
	let currentUserProfileInfo = '';
	let currentUserPins = '';
	let currentUserBoard = '';


	//Args: The obj name you want to store within localStorage 
	//Ex: 'board', 'pins', 'users'
	let getUserInfo = (location) => JSON.parse(localStorage.getItem(location));
	//Args(2): userinfoObj = {userInfoInformation in obj form}, location = ('board', 'pins', 'users')
	let setUserinfo = (userInfoObj, location) => {
		return new Promise((resolve) => {
			localStorage.setItem(location, JSON.stringify(userInfoObj));
			console.log("Stored within local storage from UserStorageFactory.js setUserInfo(): ", location + " " + userInfoObj);
			resolve();
		});
	};
	
	return {getUserInfo, setUserinfo};
});





