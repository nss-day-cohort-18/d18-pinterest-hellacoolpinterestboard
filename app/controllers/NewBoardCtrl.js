"use strict";

app.controller('NewBoardCtrl', function($scope, $window, GoogleFactory, UserStorageFactory, HandleFBDataFactory, AuthUserFactory){

	//TODO: Hide Navbar
	
	/* This function fires when the submit button on NewBoard.html is clicked. It takes
	the user input from the text boxes on the partial and creates a new object that is sent
	to Firebase. The object contains 1.) the name of the board, 2.) its description, and 3.) the 
	uid of the user who submitted it.*/

	$scope.pinToPost = '';

	$scope.addBoard = () => {
		let newBoardObject = {};
		newBoardObject.title = $scope.boardName;
		newBoardObject.description = $scope.boardDescription;
		newBoardObject.uid = AuthUserFactory.getUser();
		console.log("newBoardObject", newBoardObject);

		HandleFBDataFactory.postNewItem(newBoardObject, "board").then(
			(ObjFromFirebase) => {
				console.log("Object from Firebase", ObjFromFirebase);
				let name = ObjFromFirebase.data.name;
				$scope.pinToPost = GoogleFactory.getStoredPin();
				$scope.pinToPost.boardid = name;
				HandleFBDataFactory.getItemList('board').then(
					(boardObjFromFirebase) => UserStorageFactory.setUserinfo(boardObjFromFirebase, 'board')
				).then(
					() => HandleFBDataFactory.postNewItem($scope.pinToPost, "pins")
				).then(
					(pinsObjStatusFirebase) => HandleFBDataFactory.getItemList('pins')
				).then(
					(pinsObjFromFirebase) => UserStorageFactory.setUserinfo(pinsObjFromFirebase, 'pins')
				).then(
					() => {
						$window.location.reload();
						$window.location.href = '#!/explore';
					}
				);
			}
		);
	};
});
