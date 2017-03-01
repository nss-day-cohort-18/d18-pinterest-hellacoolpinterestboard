"use strict";

console.log("HandleFBDataFactory.js is connected");

app.factory("HandleFBDataFactory", ($q, $http, FBCreds, AuthFactory, UserStorageFactory) => {

	//This function goes to firebase, organizes the object returned, and stores it locally.
	//Args: Single location string Ex: 'users', 'pins', 'board'
	//Return: locationInfo Obj
	let getItemList = (location) => {

		let user = AuthFactory.getUser();
		console.log("I am now within HandleFBDataFactory.js getItemList() to get: ", location);

		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/${location}.json?orderBy="uid"&equalTo="${user}"`).then(
					(itemObject) => {
						console.log("This is your itemCollection from within ItemFactory.js getItemList(): ", itemObject.data);
						if (itemObject.data === null) {
							console.log("You have no data in firebase!");
							resolve();
						} else {
							console.log("Sending the data to be stored in UserStorageFactory.js from getItemList()");
							if (location === 'board') {
								AuthFactory.changeLogin(true);
								console.log("Finish setting up getItemList() from HandleFBDataFactory.js. Here is your 'board' obj: ", itemObject);

								// let profileInfo = itemObject.data[Object.keys(itemObject.data)[0]];
								// console.log("You are sending this profile info to be set within UserStorageFactory.js: ", profileInfo);
								// UserStorageFactory.setCurrentUserProfileInfo(profileInfo);
								// resolve(profileInfo);								
							} else if (location === 'pins') {
								AuthFactory.changeLogin(true);
								console.log("Finish setting up getItemList() from HandleFBDataFactory.js. Here is your 'pins' obj: ", itemObject);
								// let notesInfo = itemObject.data;
								// console.log("You are sending this notes info to be set within UserStorageFactory.js: ", notesInfo);
								// UserStorageFactory.setCurrentUserNotes(notesInfo);
								// resolve(notesInfo);						
							} else if (location === 'users') {
								AuthFactory.changeLogin(true);
								console.log("Finish setting up getItemList() from HandleFBDataFactory.js. Here is your 'users' obj: ", itemObject);
								// let notesInfo = itemObject.data;
								// console.log("You are sending this notes info to be set within UserStorageFactory.js: ", notesInfo);
								// UserStorageFactory.setCurrentUserNotes(notesInfo);
								// resolve(notesInfo);
							}
						}
				}).catch((error) => reject(error));
		});
	};



	//Function to post items to Firebase
	//Args(2): newItem = {usersInfo/pinsInfo/boardInfo: ''}, location = string representing firebase collection ('users', 'pins', 'board')
	//Return: Location Obj from Firebase {}
	let postNewItem = (newItem, location) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/${location}.json`,
				JSON.stringify(newItem))
					.then(
						(ObjectFromFirebase) => {
							console.log("Here is my obj from firebase from HandleFBDataFactory.js postNewItem(): ", ObjectFromFirebase);
							resolve(ObjectFromFirebase);
						})
					.catch((error) => error);
		});
	};



	//Function to remove items from a specific collection from within Firebase
	//Args(2): itemID: string assigned by firebase, location: string for specific collection Ex: ('users', 'board', 'pins')
	let deleteItem = (itemID, location) => {
		console.log('Within ItemFactory.js deleteItem(): ', itemID, 'location: ', location);
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/${location}/${itemID}.json`)
				.then((ObjectFromFirebase) => resolve(ObjectFromFirebase));
		});
	};

	return {getItemList, postNewItem, deleteItem};
});


















