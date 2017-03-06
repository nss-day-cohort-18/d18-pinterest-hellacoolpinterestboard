"use strict";

var app = angular.module("HellaCoolPinterestProject", ["ngRoute"]);

//resolve for the app to check whether or not a user is logged in
let isAuth = (AuthUserFactory, $location) => new Promise ((resolve, reject) => {
	console.log("I am here");
	AuthUserFactory.isAuthenticated()
		.then((userExists) => {
			console.log("userExists", userExists);
			if (userExists) {
				AuthUserFactory.changeLogin(true);
				console.log("Authenticated, go ahead");
				resolve();
			} else {
				AuthUserFactory.changeLogin(false);
				console.log("Authentication rejected, go away. Fucker.");
				$location.path('/login');
				reject();
			}
		});
});


app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/register', {
			templateUrl: '/partials/Register.html',
			controller: 'RegisterCtrl'
		})
		.when('/newBoard', {
    	templateUrl: '../partials/NewBoard.html',
    	controller: 'NewBoardCtrl'
    	})
		.when('/explore', {
			templateUrl: '/partials/Explore.html',
			controller: 'ExploreCtrl',
			resolve: {isAuth}
		})
		.when('/login', {
			templateUrl: '/partials/Login.html',
			controller: 'LoginCtrl'
		})
		.when('/profile', {
			templateUrl: '/partials/Profile.html',
			controller: 'ProfileCtrl',
			resolve: {isAuth}
		})
		.otherwise('/register');
});

app.run(($location, FBCreds) => {
	console.log("Here is your authConfig within app.js: ", FBCreds);
	firebase.initializeApp(FBCreds);
});













