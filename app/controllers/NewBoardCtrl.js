"use strict";

app.controller('NewBoardCtrl', function($scope, $window, GoogleFactory, UserStorageFactory, HandleFBDataFactory, AuthUserFactory){

	//TODO: Hide Navbar
	$scope.addBoard = () => {
		let newBoardObject = {};
		newBoardObject.title = $scope.boardName;
		newBoardObject.description = $scope.boardDescription;
		newBoardObject.uid = AuthUserFactory.getUser();
		console.log("newBoardObject", newBoardObject);
		HandleFBDataFactory.postNewItem(newBoardObject, "board");
	};
});