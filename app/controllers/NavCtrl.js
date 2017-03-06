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


	

});
