"use strict";

app.factory("AuthUserFactory", function($window) {

	//Information received at registration
	let loggedInUserInfo = {
		firstName: '',
		lastName: '',
		mailingAddress: '',
		emailAddress: '',
		userName: '', 
		birthday: '',
		gender: '',
		interests: '',
		picture: '',
		streetAddress: '', 
		city: '',
		zip: ''
	};
	let currentUser = '';
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


	//Return: true if logged in, false if logged out
	let checkIfLoggedIn = () => {
		console.log("Everything is commented out. Check to make sure this will work first! checkIfLoggedIn() AuthUserFactory.js");
			// if (isLoggedIn) {
			// 	return isLoggedIn;
			// } else {
			// 	return isLoggedIn;
			// }
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


	//Return: User uid
	let getUser = () => currentUser;
	//Sets uid of logged in user
	//Args: uid  
	let setUser = (userID) => currentUser = userID;


	//Return: User Profile Obj/ See line 8
	let getUserInfo = () => loggedInUserInfo;
	//Sets loggedInUserInfo, see line 8
	//Args: userObj = {userInfo: ''}
	let setUserInfo = (userObj) => {
		loggedInUserInfo = userObj;
		console.log("Here is your loggedInUserInfo from AuthUserFactory.js setUserInfo()", loggedInUserInfo);
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
					checkIfLoggedIn, 
					changeLogin, 
					isAuthenticated, 
					getUser, 
					setUser,
					getUserInfo, 
					setUserInfo,
					authWithProvider
				};
});








