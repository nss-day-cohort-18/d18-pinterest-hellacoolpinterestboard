"use strict";

app.controller('ExploreCtrl', function($scope, $window, GoogleFactory, UserStorageFactory){

    $scope.data = GoogleFactory.getGoogleDataArray();
    
    let checkboards = () => {
        let boards = UserStorageFactory.getUserInfo("board");
        console.log("board", boards);
        return boards;
    };

    $scope.addPin = (result) => {
        if (checkboards() === null) {
            console.log("null");
            $scope.boardValue = false;
            $window.location.href = "#!/newBoard";
            return;
        } else {
            //TODO: ask user to select a board
        }
        let ObjectToAdd = {};
        ObjectToAdd = result;
        console.log("ObjectToAdd", ObjectToAdd);
        //TODO: add pin to appropriate board
    };
	
});
