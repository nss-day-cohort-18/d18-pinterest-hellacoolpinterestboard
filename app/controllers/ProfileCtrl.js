"use strict";

app.controller("ProfileCtrl", function($scope, $window, AuthUserFactory, UserStorageFactory, HandleFBDataFactory) {
	// console.log("UserDetailsCtrl");
	let s = $scope;

	s.currentUser = AuthUserFactory.getUser();
	let boardsFromLocalStorage = UserStorageFactory.getUserInfo('board');
	console.log("Here are your boards from local storage: ", boardsFromLocalStorage);
	s.boards = [];
	// boardsFromLocalStorage[0].forEach((board) => console.log(board));
	for (var board in boardsFromLocalStorage[0]) {
		let myObj = {};
		myObj[board] = boardsFromLocalStorage[0][board];
		s.boards.push(myObj);
	}

	console.log("Here are your boards: ", s.boards);
	let pinsFromLocalStorage = UserStorageFactory.getUserInfo('pins');
	s.pins = [];
	for (var pin in pinsFromLocalStorage[0]) {
		let myObj = {};
		myObj[pin] = pinsFromLocalStorage[0][pin];
		s.pins.push(myObj);
	}

	s.boardIDs = s.boards.map((item) => Object.keys(item)[0]);
	s.iterableBoards = s.boards.map((item) => item[Object.keys(item)[0]]);

	if (s.pins[0] === null) {
		console.log("You ain't got no pins ta show honey bunny");
	} else {
		console.log("Here are your boards: ", s.boards);
		console.log("Here are your board IDs: ", s.boardIDs);

		s.pins.forEach((pin) => {
			if (s.pins === undefined) {
			} else {
				let myPin = pin[Object.keys(pin)[0]];
				if (myPin) {
					myPin.uglyId = Object.keys(pin)[0];
					let myKey = myPin.boardid;
					let myUID = myPin.uid;

					console.log(myKey, myUID); 

					console.log(s.boards[s.boardIDs.indexOf(myKey)][myKey]);
					console.log(s.boards[s.boardIDs.indexOf(myKey)][myKey].hasOwnProperty('pins'));
					
					if (s.boards[s.boardIDs.indexOf(myKey)][myKey].hasOwnProperty('pins')) {
						s.boards[s.boardIDs.indexOf(myKey)][myKey].pins.push(myPin);
					} else {
						s.boards[s.boardIDs.indexOf(myKey)][myKey].pins = [];
						s.boards[s.boardIDs.indexOf(myKey)][myKey].pins.push(myPin);	

					}					
				}
			}
		});		
	}

	s.boardClicked = (boardInfo) => {
		console.log(boardInfo);

		s.pinsToDisplay = [];
		let myPins = [];
		debugger;
		for (var pin = 0; pin < boardInfo.pins.length; pin++) {
			if (pin === boardInfo.pins.length - 1) {
				myPins.push(boardInfo.pins[pin]);
				s.pinsToDisplay.push(myPins);
			} else if (pin%3 === 0 && pin !== 0) {
				s.pinsToDisplay.push(myPins);
				myPins= [];
				myPins.push(boardInfo.pins[pin]);
			} else {
				myPins.push(boardInfo.pins[pin]);
			}

		}
	};

	let deleteAllPins = (boardID) => {
		return new Promise((resolve, reject) => {
			for (var board in s.boards) {
				if (Object.keys(s.boards[board])[0] === boardID) {
					s.boards[board][boardID].pins.forEach((pin) => {
						console.log(pin);
						HandleFBDataFactory.deleteItem(pin.uglyId, 'pins');
					});
				}
			}
			resolve();
		});
	};

	s.deleteBoard = (boardUglyId) => {
		console.log("About to delete a board and all of it's pins");
		s.boardUglyId = boardUglyId;
		deleteAllPins(s.boardUglyId).then(
				() => HandleFBDataFactory.getItemList('pins')
			).then(
				(pinsObjFromFirebase) => UserStorageFactory.setUserinfo(pinsObjFromFirebase, 'pins')
			).then(
				() => HandleFBDataFactory.deleteItem(s.boardUglyId, 'board')
			).then(
				(boardObjStatusFirebase) => HandleFBDataFactory.getItemList('board')
			).then(
				(boardObjFromFirebase) => UserStorageFactory.setUserinfo(boardObjFromFirebase, 'board')
			).then(
				() => UserStorageFactory.deleteLocalStorage('pins')
			).then(
				() => UserStorageFactory.deleteLocalStorage('board')
			).then(
				$window.location.reload()
			);			
	};

	s.deletePin = (pinUglyId) => {
		console.log("About to delete a pin homeboy");
		HandleFBDataFactory.deleteItem(pinUglyId, 'pins').then(
			(pinsObjStatusFirebase) => HandleFBDataFactory.getItemList('pins')
		).then(
			(pinsObjFromFirebase) => UserStorageFactory.setUserinfo(pinsObjFromFirebase ,'pins')
		).then(
			() => $window.location.reload()
		);
	};



	console.log(s.boards, s.pins, s.boardIDs, s.iterableBoards);
});
