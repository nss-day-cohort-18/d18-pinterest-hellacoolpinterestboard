"use strict";

console.log("UserStorageFactory.js is connected");

app.factory("UserStorageFactory", function() {

	//Information received at registration
	let loggedInUserInfo = {
		firstName: '',
		lastName: '',
		mailingAddress: '',
		emailAddress: '',
		userName: '', 
		birthday: '',
		gender: '',
		interests: '',
		picture: '',
		streetAddress: '', 
		city: '',
		zip: ''
	};

	//variables to hold users' info
	let currentUserInfo = () => angular.fromJson(localStorage.getItem('users'));
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
				return currentUserInfo();
		} 
		// JSON.parse(localStorage.getItem(location));
	};


	//Args(2): userinfoObj = {userInfoInformation in obj form}, location = ('board', 'pins', 'users')
	let setUserinfo = (userInfoObj, location) => {
		return new Promise((resolve) => {
			switch(location) {
				case 'users': 		
					localStorage.removeItem('users');		
					localStorage.setItem('users', angular.toJson(userInfoObj));
					resolve();
					break;
				case 'board': 					
					currentUserBoard = userInfoObj;
					resolve();
					break;
				case 'pins': 					
					currentUserPins = userInfoObj;
					resolve();
					break;
			}
		});
	};
	
	return {getUserInfo, setUserinfo};
});





