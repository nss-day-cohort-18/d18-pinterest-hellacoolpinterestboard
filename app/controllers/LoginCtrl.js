"use strict";

app.controller("LoginCtrl", function($scope, $location, $window, AuthUserFactory, HandleFBDataFactory, UserStorageFactory) {
	let s = $scope;

	//Holds email and password information when a user logs back in to send to firebase
	s.account = {
		email: "",
		password: ""
	};


	//takes s.account and sends the obj to AuthFactory.js to log the user in. 
	//Also changes the window to /list view
	s.login = () => {
  	console.log("you clicked login: ", s.account);
  	AuthUserFactory.loginUser(s.account).then( 
  		(userData) => {
				console.log("LoginCtrl.js login user: ", userData.uid);
				AuthUserFactory.setUser(userData.uid);
				HandleFBDataFactory.getUserInfo().then(
					() => $window.location.href = '#!/explore'
				);
			},
			(error) => console.log("Error creating user: ", error)
    );
	};


	//
	s.loginGoogle = () => {
	console.log("you clicked login with Google");
	AuthUserFactory.authWithProvider()
		.then(
			(userInfo) => {
	    	console.log("logged in user:", userInfo);
	    	AuthUserFactory.setUser(userInfo.user.uid);
	    	HandleFBDataFactory.getUserInfo().then(
	    		() => $window.location.href = '#!/explore'
	    	);
		}).catch(
			(error) => {
	    	console.log("error with google login", error);
	    	AuthUserFactory.changeLogin(false);
	    	var errorCode = error.code;
	    	var errorMessage = error.message;
	    	var email = error.email;
	    	var credential = error.credential;
	  		// ...
			});
	};
});






