"use strict";

var app = angular.module("HellaCoolPinterestProject", ["ngRoute"]);
	app.config(function($routeProvider){
    $routeProvider.
    when('/', {
        templateUrl: '../partials/Explore.html',
        controller: "ExploreCtrl"
    });
});


//resolve for the app to check whether or not a user is logged in
let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
	console.log("I am here");
	AuthFactory.isAuthenticated()
		.then((userExists) => {
			console.log("userExists", userExists);
			if (userExists) {
				AuthFactory.changeLogin(true);
				console.log("Authenticated, go ahead");
				resolve();
			} else {
				console.log("Authentication rejected, go away.");
				reject();
			}
		});
});


app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/register', {
			templateUrl: '/partials/Register.html',
			controller: 'RegisterCtrl',
		})
		.when('/explore', {
			templateUrl: '/partials/Explore.html',
			controller: 'ExploreCtrl',
		})
		.otherwise('/register');
});

app.run(($location, FBCreds) => {
	console.log("Here is your authConfig within app.js: ", FBCreds);
	firebase.initializeApp(FBCreds);
});













