"use strict";

app.controller("NavCtrl", function($scope, $window, $rootScope, $location, $route, AuthUserFactory, GoogleFactory){
  // $scope.searchText = SearchTermData; //TO DO: inject SearchTermData once Auth is hooked up
  $scope.isLoggedIn = false;
  

  $rootScope.$on("$routeChangeSuccess", function(event, next, current) { 
    console.log($location.path()); 
    if ($location.path() === '/explore' || $location.path() === '/profile') {
    	$scope.isLoggedIn = true;
    } else {
    	$scope.isLoggedIn = false;
    }
  });

	$scope.logoutUser = () => {
		$scope.isLoggedIn = false;
		AuthUserFactory.logoutUser();
	};


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
