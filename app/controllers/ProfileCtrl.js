"use strict";

app.controller("ProfileCtrl", function($scope, $window, AuthUserFactory, UserStorageFactory, HandleFBDataFactory) {
	// console.log("UserDetailsCtrl");
	let s = $scope;

	s.currentUser = AuthUserFactory.getUser();
	s.boards = UserStorageFactory.getUserInfo('board');
	s.pins = UserStorageFactory.getUserInfo('pins');
	s.boardIDs = s.boards.map((item) => Object.keys(item)[0]);
	s.iterableBoards = s.boards.map((item) => item[Object.keys(item)[0]]);

	if (s.pins[0] === null) {
		console.log("You ain't got no pins ta show honey bunny");
	} else {
		s.pins.forEach((pin) => {
			if (s.pins === undefined) {
			} else {
				debugger;
				let myPin = pin[Object.keys(pin)[0]];
				myPin.uglyId = Object.keys(pin)[0];
				let myKey = myPin.boardid;
				let myUID = myPin.uid;

				console.log(myKey, myUID);
				s.boards[s.boardIDs.indexOf(myKey)][myKey].pins = [];
				s.boards[s.boardIDs.indexOf(myKey)][myKey].pins.push(myPin);
			}
		});		
	}

	s.boardClicked = (boardInfo) => {
		console.log(boardInfo);
		s.pinsToDisplay = boardInfo.pins;
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
