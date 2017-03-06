"use strict";

app.factory("AuthUserFactory", function($window, UserStorageFactory) {

	let isLoggedIn = false;

	//Args: {email: '', password: ''}
	//Return: User obj from Firebase
	let createUser = (userObj) => firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
			.catch( (error) => console.log("error: ", error.code, error.message));
	

	//Args: {email: '', password: ''}
	//Return: UserObj from Firebase
	let loginUser = (userObj) => firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
		.catch( (error) => {
			console.log("error:", error.code, error.message);
			$window.location.href = '#!/login';
		});
	

	//Removes any data stored within localStorage
	//Signs user out of Firebase
	let logoutUser = function(){
		console.log("logoutUser");
		console.log("Everything is commented out. Check to make sure this will work first! logoutUser() AuthUserFactory.js");
		// isLoggedIn = false;
		// localStorage.removeItem('notes');
		// localStorage.removeItem('profile');
		// return firebase.auth().signOut();
	};


	//Args: boolean
	//Changes isLoggedIn boolean
	let changeLogin = (loginState) => {
		isLoggedIn = loginState;
	}; 
	

	//Checks firebase onAuthStateChanged() and sets currentUser to uid 
	//Return: boolean- true if logged in
	let isAuthenticated = function () {
		console.log("Within AuthUserFactory.js isAuthenticated():");
		console.log("Everything is commented out. Check to make sure this will work first!");
		// return new Promise ( (resolve, reject) => {
		// 	firebase.auth().onAuthStateChanged( (user) => {
		// 		console.log("Here is your user from AuthFactory: ", user);
		// 		if (user){
		// 			currentUser = user.uid;
		// 			console.log("Here is your var currentUser (uid) from AuthUserFactory.js isAuthenticated(): ", currentUser);
		// 			resolve(true);
		// 		}else {
		// 			resolve(false);
		// 		}
		// 	});
		// });
	};


	//Sets google provider
	let googleProvider = new firebase.auth.GoogleAuthProvider();
	//Sign in with given provider using Firebase
	//Args: providerType Ex: googleProvider
	//Return: 
	let authWithProvider = () => firebase.auth().signInWithPopup(googleProvider);

	return {createUser,
					loginUser, 
					logoutUser, 
					changeLogin, 
					isAuthenticated, 
					authWithProvider
				};
});








