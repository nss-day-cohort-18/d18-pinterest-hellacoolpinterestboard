"use strict";

app.factory("GoogleFactory", function($window, $q, $http, googleCredentials) {
    
    /* This function connects to the Google API and returns an object that contains the 
    first ten Google search results and the attendant metadata for any query sent as an 
    argument from ExploreCtrl. It then parses the data into an array of new objects. Each 
    object in that array contains 1.) the image, 2.) the link, 3.) the snippet, and 
    4.) the title affiliated with the search result. ***** Note that the URL has the query 
    "pinterest" hard coded as the first search term, so each query entered will return
    results affiliated with Pinterest. ***** */
    let googleDataArray = [];

    let GoogleAPI = (searchText) => {
        return $q((resolve, reject)=>{
            $http.get(`${googleCredentials.URL}`+searchText)
            .then((googleObject)=>{
            console.log("googleObject", googleObject);
                // googleDataArray = [];
            for (var obj in googleObject.data.items) {
                let googleDataObj = {};
                googleDataObj.title = googleObject.data.items[obj].title;
                googleDataObj.link = googleObject.data.items[obj].link;
                googleDataObj.image = googleObject.data.items[obj].pagemap.cse_image[0].src;
                googleDataObj.snippet = googleObject.data.items[obj].snippet;
                googleDataArray.unshift(googleDataObj);
                }
                console.log("googleDataArray", googleDataArray);
                resolve(googleDataArray);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };

    let storedPin;
    
    let storePinForBoard = (pin) => {
        storedPin = pin;
        console.log("storedPin", storedPin);
    };

    let getStoredPin = () => {
        return storedPin;
    };

    let getGoogleDataArray = () => {
        return googleDataArray;
    };

    return {GoogleAPI, getGoogleDataArray, storePinForBoard, getStoredPin};
});



