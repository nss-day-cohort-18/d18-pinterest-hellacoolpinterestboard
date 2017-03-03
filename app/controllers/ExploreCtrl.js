"use strict";

app.controller('ExploreCtrl', function($scope, $window, GoogleFactory, UserStorageFactory, HandleFBDataFactory, AuthUserFactory){

    $scope.data = GoogleFactory.getGoogleDataArray();

    
    /* This function checks Firebase to determine whether the current user has a board. It
    returns the user's boards.*/
    let checkboards = () => {
        let boards = UserStorageFactory.getUserInfo("board");
        return boards;
    };

    /* This object is declared outside the functions because we need it in two functions 
    below */
    let ObjectToAdd = {};

    /* This function first checks to determine whether the user has boards saved. If the 
    user has no boards, the user is asked to create a new board. If the user has boards 
    saved in the database, they are displayed on cards via $scope.boards on Explore.html. 
    This function also saves the data from the selected pin as ObjectToAdd in order to add
    it to a board below.*/
    $scope.addPin = (result) => {
        let myBoards = checkboards();
        if (myBoards === null) {
            $window.location.href = "#!/newBoard";
            return;
        } else {
            $scope.boardExists = true;
            let boards = UserStorageFactory.getUserInfo("board");
            let myBoards = boards[boards.length - 1];
            console.log("These are my boards from UserStorage: ", myBoards);
            let keyArray = Object.keys(myBoards);
            let boardArray = [];
            for (var i = 0; i < keyArray.length; i++) {
                let newBoardObject = {};
                newBoardObject.key = keyArray[i];
                newBoardObject.title = myBoards[keyArray[i]].title;
                newBoardObject.description = myBoards[keyArray[i]].description;
                boardArray.push(newBoardObject);
                $scope.boards = boardArray;
            };
        }
        ObjectToAdd = {};
        ObjectToAdd = result;
        console.log("ObjectToAdd", ObjectToAdd);
    };
  
  /*This function receives the data from the card clicked on the partial. It uses that 
    data to amend the ObjectToAdd with the boardid. It also adds the userid to the object 
    and sends it to Firebase.*/
    $scope.pinToBoard = (board) => {
        $scope.boardExists = false;
        console.log("board", board);
        console.log("board.key", board.key);
        ObjectToAdd.boardid = board.key;
        ObjectToAdd.uid = AuthUserFactory.getUser();
        console.log("user", AuthUserFactory.getUser());
        console.log("ObjectToAdd at Send", ObjectToAdd);
        HandleFBDataFactory.postNewItem(ObjectToAdd, "pins");

    };

    $scope.createNewBoard = () => {
        $scope.boardExists = false;
        ObjectToAdd.uid = AuthUserFactory.getUser();
        console.log("user", AuthUserFactory.getUser());
        console.log("ObjectToAdd at Send", ObjectToAdd);
        GoogleFactory.storePinForBoard(ObjectToAdd);
    };

});
