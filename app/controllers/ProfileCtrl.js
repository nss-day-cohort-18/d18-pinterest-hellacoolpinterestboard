"use strict";

app.controller("ProfileCtrl", function($scope, AuthFactory) {
	// console.log("UserDetailsCtrl");

	$scope.currentUser = AuthFactory.getUser();

});
