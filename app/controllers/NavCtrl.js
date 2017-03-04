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


	/*This function fires when the search button on the explore partial is clicked. It 
	grabs the text from the text input and sends it to the GoogleAPI function, which 
	appends it as a query. It then sets the returned array of objects as $scope.data, 
	which binds to the Explore partial via ng-repeat.*/
  $scope.searchGoogle = function(){
		let searchText = $scope.searchText;
		GoogleFactory.GoogleAPI(searchText).
			then(
				() => $window.location.href = "#!/explore"
			);
	};

});
