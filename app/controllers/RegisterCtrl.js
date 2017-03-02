"use strict";

console.log("RegisterCtrl.js is connected");

app.controller("RegisterCtrl", function($scope, $window, AuthUserFactory, HandleFBDataFactory, UserStorageFactory) {
		let s = $scope;
		s.currentUser = false;

		s.userInfo = {
			firstName: "",
			lastName: "",
			email: "",
			userName: "",
			password: "",
			birthDate: "",
			streetAddress: "",
			city: "",
			zip: "",
			interests: {}
		};

		s.rows = [];
		s.interests = ['Animals', 'Architecture', 'Art', 'Cars', 'Celebs', 'Design', 'Education', 'Entertainment', 'Gardens', 'Geek', 'Health', 'History', 'Holiday & Party', 'Illustrations', 'Kids', 'Outdoors', 'Photography', 'Quotes', 'Science', 'Sports', 'Tattoos', 'Tech', 'Weddings']; 

		let rowToPush = [];
		for (var category = 0; category < s.interests.length + 1; category++) {
			if (!(s.interests[category] === undefined)) {
				s.userInfo.interests[s.interests[category]] = false;
				if (category === 0) {
					rowToPush.push(s.interests[category]);
				} else if (category === s.interests.length - 1) {
					rowToPush.push(s.interests[category]);
					s.rows.push(rowToPush);
					rowToPush = [];
				}else if (category % 4 !== 0) {
					rowToPush.push(s.interests[category]);
				} else {
					s.rows.push(rowToPush);
					rowToPush = [];
					rowToPush.push(s.interests[category]);
				}
			}
		}

		s.currentLocation = window.location;
		console.log(s.currentLocation.hash);

		s.days = [];
		s.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		s.years = [];
		// months.forEach((month) => $(`<li ng-click="updateBirthInfo(${month}, birthMonth)"><a>${month}</a></li>`).appendTo('.birth-month') );
		for (var year = 2017; year > 1950; year--) {
			s.years.push(year);
		}
		for (let day = 1; day < 32; day++) {
			if (day.toString().length === 1) {
				s.days.push('0'+ day);
			} else {
				s.days.push(day);
			}
		}

		//Args(2): birthValue = string (day, month, year)
		//				 location= string for userInfo (birthDay, birthMonth, birthYear)
		s.setBirthInfo = (birthValue, location) => s.userInfo[location] = birthValue;

		//Takes all information saved within s.userInfo, checks to make sure all required fields are 
		//filled out and sends the information to firebase to be updated
		s.clickRegister = () => {
			console.log("You clicked registerNewUser()");
			//Make sure firstName, lastName, userName, email, password, and reEnterPassword are filled out
			if (s.userInfo.firstName.length === 0 || s.userInfo.lastName.length === 0 || s.userInfo.userName.length === 0 || s.userInfo.email.length === 0 || s.userInfo.password.length < 6 || s.userInfo.zip.length === 0) {
				console.log("Here is your user info: ", s.userInfo);
				alert("Please fill out the required fields");
				//Check to make sure that both passwords are the same
			} else {
				console.log("Here is your user info: ", s.userInfo);
			}
		};

		s.clickExplore = () => {
			if (!(s.userInfo.hasOwnProperty('interests'))) {
				console.log("Add some stuffffff");
			} else { 
				let myInterests = Object.keys(s.userInfo.interests);
				if (myInterests.length < 4) {
					alert("Add 4 interests please!");
				} else {
					console.log("This is ready to be sent to firebase!! ", s.userInfo);
					AuthUserFactory.createUser({email: s.userInfo.email, password: s.userInfo.password}).then(
						// Update uid, remove passwords, and join interests to string instead of array to make Firebase happy
						(userData) => {
							console.log("RegisterCtrl new user: ", userData);
							// AuthUserFactory.changeLogin(true);
							s.userInfo.uid = userData.uid;
							s.userInfo.password = "";
							HandleFBDataFactory.postNewItem(s.userInfo, 'users').then(
								(profileObjFromFirebase) => {
									console.log("Here is your profile info from firebase: ", profileObjFromFirebase);
									// send User Info from firebase to be stored within localstorage
									UserStorageFactory.setUserinfo(s.userInfo, 'users');
									s.userInfo = {};
									$window.location.href = "#!/explore";
								});
						},
						(error) => console.log("Error creating user: ", error)
					);
				}
			}
		};
});















