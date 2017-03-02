"use strict";

app.controller("ProfileCtrl", function($scope, AuthUserFactory, UserStorageFactory) {
	// console.log("UserDetailsCtrl");
	let s = $scope;
	s.currentUser = AuthUserFactory.getUser();
	s.boards = UserStorageFactory.getUserInfo('board');
	s.pins = UserStorageFactory.getUserInfo('pins');
	s.boardIDs = s.boards.map((item) => Object.keys(item)[0]);
	s.iterableBoards = s.boards.map((item) => item[Object.keys(item)[0]]);

	s.pins.forEach((pin) => {
		let myKey = pin.boardid;
		let myUID = pin.uid;

		console.log(myKey, myUID);
		s.boards[s.boardIDs.indexOf(myKey)][myKey].pins = [];
		s.boards[s.boardIDs.indexOf(myKey)][myKey].pins.push(pin);
		// .pins['pin.uid'] = pin;
	});

	s.boardClicked = (boardInfo) => {
		console.log(boardInfo);
		s.pinsToDisplay = boardInfo.pins;
	};



	console.log(s.boards, s.pins, s.boardIDs, s.iterableBoards);



});
