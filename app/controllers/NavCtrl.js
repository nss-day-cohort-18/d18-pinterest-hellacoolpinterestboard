"use strict";

app.controller("NavCtrl", function($scope, $window, AuthUserFactory, GoogleFactory){
  // $scope.searchText = SearchTermData; //TO DO: inject SearchTermData once Auth is hooked up
  $scope.isLoggedIn = false;

 //  firebase.auth().onAuthStateChanged( function(user){
	// 	if (user) {
	// 		$scope.isLoggedIn = true;
	// 		console.log("currentUser logged in", user, $scope.isLoggedIn);
	// 		$scope.$apply();
	// 	}else{
	// 		$scope.isLoggedIn = false;
	// 		console.log("currentUser logged in", $scope.isLoggedIn);
	// 		$window.location.href = "#!/login"; //TO DO: need to decide where this $location directs the user after they login
	// 	}
	// });


	

});
