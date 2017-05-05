"use strict";

app.controller('ExploreCtrl', function($scope, $window, GoogleFactory, UserStorageFactory, HandleFBDataFactory, AuthUserFactory){

    $scope.data = GoogleFactory.getGoogleDataArray();

    if ($scope.data.length === 0) {
        let userInfo = UserStorageFactory.getUserInfo('users'),
            interests = [];
        console .log(userInfo);
        Object.keys(userInfo.interests).forEach((interest) => {
            if (userInfo.interests[interest]) interests.push(interest);
        });

        GoogleFactory.GoogleAPI(interests.join(' '), 1).then(
            () => console.log("Done")
        );
        
    }

    /*This function fires when the search button on the explore partial is clicked. It 
    grabs the text from the text input and sends it to the GoogleAPI function, which 
    appends it as a query. It then sets the returned array of objects as $scope.data, 
    which binds to the Explore partial via ng-repeat. Each subsequent search adds 10 
    addition Google results. Thus, searchStart+=10. */
    let searchStart = 1;
    $scope.searchGoogle = function(){
        let searchText = $scope.searchText;
        GoogleFactory.GoogleAPI(searchText, searchStart).
            then(
                () => { searchStart += 10;
                        $window.location.href = "#!/explore";
                    }
            );
    };

    /* This function checks Firebase to determine whether the current user has a board. It
    returns the user's boards.*/
    let checkboards = () => UserStorageFactory.getUserInfo("board");
    

    /* This object is declared outside the functions because we need it in two functions 
    below */
    let ObjectToAdd = {};

    /* This function first checks to determine whether the user has boards saved. If the 
    user has no boards, the user is asked to create a new board. If the user has boards 
    saved in the database, they are displayed on cards via $scope.boards on Explore.html. 
    This function also saves the data from the selected pin as ObjectToAdd in order to add
    it to a board below.*/
    $scope.addPin = (result) => {
        result.uid = UserStorageFactory.getUserInfo('users').uid;
        console.log("pin to store: ", result);
        GoogleFactory.storePinForBoard(result);
        let myBoards = checkboards();
        if (typeof myBoards === 'string') {
            console.log("sending to newBoard page");
            $window.location.href = "#!/newBoard";
            return;
        } else {
            $scope.boardExists = true;
            console .log(typeof myBoards);
            console.log("These are my boards from UserStorage: ", myBoards);
            let keyArray = myBoards.map((board) => Object.keys(board)[0]);
            let boardArray = [];
            for (var i = 0; i < keyArray.length; i++) {
                let newBoardObject = {};
                newBoardObject.key = keyArray[i];
                newBoardObject.title = myBoards[i][keyArray[i]].title;
                newBoardObject.description = myBoards[i][keyArray[i]].description;
                boardArray.push(newBoardObject);
            }
            console.log(boardArray);
            $scope.boards = boardArray;
        }
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
        ObjectToAdd.uid = UserStorageFactory.getUserInfo('users').uid;
        console.log("user", ObjectToAdd.uid);
        console.log("ObjectToAdd at Send", ObjectToAdd);
        HandleFBDataFactory.postNewItem(ObjectToAdd, "pins").then(
            (pinsObjStatusFirebase) => HandleFBDataFactory.getItemList('pins')
        );

    };

    /* This function fires when a user clicks on the button attached to the "Create New 
    Board" card. It first amends the selected object that will be pushed to Firebase by 
    adding the user id. It then passes that object to the Google Factory to store to be 
    recalled when pinned to the newly created board.*/
    $scope.createNewBoard = () => {
        $scope.boardExists = false;
        ObjectToAdd.uid = UserStorageFactory.getUserInfo('users').uid;
        console.log("user", ObjectToAdd.uid);
        console.log("ObjectToAdd at Send", ObjectToAdd);
        GoogleFactory.storePinForBoard(ObjectToAdd);
    };

});
