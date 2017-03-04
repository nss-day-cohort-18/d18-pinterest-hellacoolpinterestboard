"use strict";

app.controller("ProfileCtrl", function($scope, $window, AuthUserFactory, UserStorageFactory, HandleFBDataFactory) {
	// console.log("UserDetailsCtrl");
	let s = $scope;
	s.info = [];
	s.currentUser = UserStorageFactory.getUserInfo('users').uid;

	// let makeBoardsPinsIterable = (boardPinsArr, location) => {
	// 	if (boardPinsArr === null || boardPinsArr === undefined) {
	// 		console.log("You ain't go no boards to show!");
	// 	} else {
	// 		boardPinsArr.forEach((boardPinObj) => {
	// 			let myObj = {};
	// 			myObj[boardPinObj] = boardPinsArr[boardPinObj];
	// 			s[location].push(myObj);
	// 		});	
	// 		console.log("Here are your boards: ", s[location]);
	// 	}
	// };

	s.boards = UserStorageFactory.getUserInfo('board');
	console.log("Here are your boards from ProfileCtrl.js: ", s.boards);
	// boardsFromLocalStorage[0].forEach((board) => console.log(board));
	// makeBoardsPinsIterable(boardArr, 'board');

	s.pins = UserStorageFactory.getUserInfo('pins');
	console.log("Here are your pins from ProfileCtrl.js: ", s.pins);
	// makeBoardsPinsIterable(pinsArr, 'pins');

	let updateMyShit = () => {
		if (s.pins[0] === null) {
			console.log("You ain't got no pins ta show honey bunny");
		} else {

			s.boardIDs = s.boards.map((item) => Object.keys(item)[0]);
			s.iterableBoards = s.boards.map((item) => item[Object.keys(item)[0]]);			
			console.log("Here are your boards: ", s.boards);
			console.log("Here are your board IDs: ", s.boardIDs);

			s.pins.forEach((pin) => {
				debugger;
				let myPin = pin[Object.keys(pin)[0]],
						myKey = myPin.boardid,
						myUID = myPin.uid;

				myPin.uglyId = Object.keys(pin)[0];

				console.log(myKey, myUID); 

				console.log(s.boards[s.boardIDs.indexOf(myKey)][myKey]);
				console.log(s.boards[s.boardIDs.indexOf(myKey)][myKey].hasOwnProperty('pins'));
				
				if (s.boards[s.boardIDs.indexOf(myKey)][myKey].hasOwnProperty('pins')) {
					s.boards[s.boardIDs.indexOf(myKey)][myKey].pins.push(myPin);
				} else {
					s.boards[s.boardIDs.indexOf(myKey)][myKey].pins = [];
					s.boards[s.boardIDs.indexOf(myKey)][myKey].pins.push(myPin);	

				}					
			});
		}
	};

	updateMyShit();

	s.boardClicked = (boardInfo) => {
		console.log(boardInfo);
		s.pinsToDisplay = [];
		let myPins = [];
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
			let counter = 1;

			for (var board = 0; board < s.boards.length; board++) {
				if (Object.keys(s.boards[board])[0] === boardID) {
					s.boards[board][boardID].pins.forEach((pin) => {
						counter = board + 1;
						console.log(pin);
						HandleFBDataFactory.deleteItem(pin.uglyId, 'pins').then(
							() => {
								if (counter === s.boards[board][boardID].pins.length) {
									counter = 1;
									debugger;
									resolve();	
								} else {
									console.log("Deleted " + counter);
								}
							}
						);
					});
				}
			}
		});
	};

	s.deleteBoard = (boardUglyId) => {
		console.log("About to delete a board and all of it's pins");
		s.boardUglyId = boardUglyId;
		deleteAllPins(s.boardUglyId).then(
				() => HandleFBDataFactory.getItemList('pins')
			).then(
				() => HandleFBDataFactory.deleteItem(s.boardUglyId, 'board')
			).then(
				(boardObjStatusFirebase) => HandleFBDataFactory.getItemList('board')
			).then(
				() => {
					s.boards = UserStorageFactory.getUserInfo('board');
					s.pins = UserStorageFactory.getUserInfo('pins');
					updateMyShit();
				}
			);		
	};

	s.deletePin = (pinUglyId) => {
		console.log("About to delete a pin homeboy");
		HandleFBDataFactory.deleteItem(pinUglyId, 'pins').then(
			(pinsObjStatusFirebase) => HandleFBDataFactory.getItemList('pins')
		).then(
			() => {
				s.boards = UserStorageFactory.getUserInfo('board');
				s.pins = UserStorageFactory.getUserInfo('pins');		
				updateMyShit();		
			}
		);
	};

	console.log(s.boards, s.pins, s.boardIDs, s.iterableBoards);
});
