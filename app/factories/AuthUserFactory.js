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
		isLoggedIn = false;		
		localStorage.removeItem('users');
		return firebase.auth().signOut();
	};


	//Args: boolean
	//Changes isLoggedIn boolean
	let changeLogin = (loginState) => {
		isLoggedIn = loginState;
	}; 

	let getLogin = () => isLoggedIn;

	//Checks firebase onAuthStateChanged() and sets currentUser to uid 
	//Return: boolean- true if logged in
	let isAuthenticated = function () {
		return new Promise ( (resolve, reject) => {
			firebase.auth().onAuthStateChanged( (user) => {
				if (user){
					isLoggedIn = true;
					console.log("Here is your var currentUser from AuthUserFactory.js isAuthenticated(): ", user);
					resolve(isLoggedIn);
				}else {
					isLoggedIn = false;
					resolve(false);
				}
			});
		});
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
					getLogin,
					isAuthenticated, 
					authWithProvider
				};
});








