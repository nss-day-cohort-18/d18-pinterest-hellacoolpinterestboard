"use strict";

app.controller("ProfileCtrl", function($scope, $window, AuthUserFactory, UserStorageFactory, HandleFBDataFactory) {
	// console.log("UserDetailsCtrl");
	let s = $scope;
	s.info = [];
	s.currentUser = UserStorageFactory.getUserInfo('users').uid;


	s.boards = UserStorageFactory.getUserInfo('board');
	console.log("Here are your boards from ProfileCtrl.js: ", s.boards);
	// boardsFromLocalStorage[0].forEach((board) => console.log(board));
	// makeBoardsPinsIterable(boardArr, 'board');

	s.pins = UserStorageFactory.getUserInfo('pins');
	console.log("Here are your pins from ProfileCtrl.js: ", s.pins);
	// makeBoardsPinsIterable(pinsArr, 'pins');

	let updateMyShit = () => {
		if (s.pins === undefined || typeof s.pins === 'string') {
			s.iterableBoards = [];
			s.pinsToDisplay = [];
			console.log("You ain't got no pins ta show honey bunny");
		} else {

			s.boardIDs = s.boards.map((item) => Object.keys(item)[0]);
			s.iterableBoards = s.boards.map((item) => item[Object.keys(item)[0]]);			
			console.log("Here are your boards: ", s.boards);
			console.log("Here are your board IDs: ", s.boardIDs);

			s.pins.forEach((pin) => {
				let myPin = pin[Object.keys(pin)[0]],
						myKey = myPin.boardid,
						myUID = myPin.uid,
						myCurrentBoard = s.boards[s.boardIDs.indexOf(myKey)][myKey];

				myPin.uglyId = Object.keys(pin)[0];

				console.log(myKey, myUID); 
				console.log(myCurrentBoard);
				console.log(myCurrentBoard.hasOwnProperty('pins'));
				
				if (myCurrentBoard.hasOwnProperty('pins')) {
					myCurrentBoard.pins.push(myPin);
				} else {
					myCurrentBoard.pins = [];
					myCurrentBoard.pins.push(myPin);
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


	s.deleteBoard = (boardUglyId) => {
		console.log("About to delete a board and all of it's pins");
		s.boardUglyId = boardUglyId;
		s.boardToDelete = s.boards.map((board) => board[boardUglyId]);

		let pinsUglyIds = [];

		s.boardToDelete.map((board) => {
			if (board) {
				board.pins.map((pin) => pinsUglyIds.push(pin.uglyId));
			}
		});

		let deletePin = (uglyId) => HandleFBDataFactory.deleteItem(uglyId, 'pins');
		let deletePins = pinsUglyIds.map(deletePin);

		console.log("Here is your pinsToDelete Arr arr: ", pinsUglyIds);

		//Delete all pins associated with the board, then update local
		Promise.all(deletePins).then(
				() => HandleFBDataFactory.getItemList('pins')
			).then(
				(pinsArr) => {
					s.pins = pinsArr;

					//delete selected board from firebase and update local
					HandleFBDataFactory.deleteItem(s.boardUglyId, 'board').then(
						(boardObjStatusFirebase) => HandleFBDataFactory.getItemList('board')
					).then(
						(boardArr) => {
							s.boards = boardArr;

							//update all $scope variables
							updateMyShit();					
						}
					);
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
