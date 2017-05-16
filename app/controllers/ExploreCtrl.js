"use strict";

app.controller('ExploreCtrl', function($scope, $window, $timeout, GoogleFactory, UserStorageFactory, HandleFBDataFactory, AuthUserFactory) {

    // This function listens for when the user scrolls to the bottom of the page, then 
    // calls functions to append pins to the bottom
    // $(window).scroll(function() {   
    //    if($(window).scrollTop() + $(window).height() == $(document).height()) {
    //        if ($scope.usersInterests) {
    //             $scope.getInterestsToUpdatePage();                
    //        }
    //        else $scope.searchGoogle();                       
    //    }
    // });

    $scope.data = [];
    $scope.searchInterestsStart = 1;
    $scope.searchInputStart = 1;
    // This is to help determine what is currently on the page.. Whether it's a 
    // search, or auto populated with the user's interests.
    $scope.usersInterests = true;

    $scope.getInterestsToUpdatePage = () => {            
        // Resets $scope.data array  to empty so you can add in pins directly related
        // to your interests
        if (!$scope.usersInterests) {
            $scope.data = [];
            $scope.searchInputStart = 1;
        }
        $scope.usersInterests = true;
        let userInfo = UserStorageFactory.getUserInfo('users'),
            interests = [];  
        // Take all of user's interests, and push them to interests array     
        Object.keys(userInfo.interests).forEach((interest) => {
            if (userInfo.interests[interest]) interests.push(interest);
        });
        // Join the interests together and send them to Google api search 
        GoogleFactory.GoogleAPI(interests.join(' '), $scope.searchInterestsStart).then(
            (googleDataArray) => {
                // Push them to your data keyArray
                googleDataArray.forEach((pin) => $scope.data.push(pin));                                   
                // apply $scope changes, and up the search                
                $timeout( () => $scope.searchInterestsStart += 10 );                    
            }
        );        
    };
    // call method on page load
    // $scope.getInterestsToUpdatePage();




    /*This function fires when the search button on the explore partial is clicked. It 
    grabs the text from the text input and sends it to the GoogleAPI function, which 
    appends it as a query. It then sets the returned array of objects as $scope.data, 
    which binds to the Explore partial via ng-repeat. Each subsequent search adds 10 
    addition Google results. Thus, searchStart+=10. */
    let searchInputStart = 1;
    $scope.searchGoogle = function() {
        if ($scope.usersInterests) {
            $scope.data = [];
            $scope.searchInterestsStart = 1;            
        }
        $scope.usersInterests = false;
        let searchText = $scope.searchText;
        GoogleFactory.GoogleAPI(searchText, $scope.searchInputStart).
            then(
                (googleDataArray) => { 
                    googleDataArray.forEach((pin) => $scope.data.push(pin));
                    console.log($scope.data);                    
                    $timeout( () => $scope.searchInputStart += 10 );                    
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
