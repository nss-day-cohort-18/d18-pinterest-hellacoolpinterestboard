"use strict";

app.factory("GoogleFactory", function($window, $q, $http, googleCredentials) {
    
    /* This function connects to the Google API and returns an object that contains the 
    first ten Google search results and the attendant metadata for any query sent as an 
    argument from ExploreCtrl. It then parses the data into an array of new objects. Each 
    object in that array contains 1.) the image, 2.) the link, 3.) the snippet, and 
    4.) the title affiliated with the search result. ***** Note that the URL has the site 
    pinterest.com hard-coded into the URL, so each query entered will return results 
    affiliated with Pinterest. ***** */    

    let createLinkDisplay = (link) => {             
        if (link.indexOf('explore') === -1) {
            let myTerms = link.split('.com/');
            return myTerms[1];
        } else {
            let myTerms = link.split('explore/');
            return myTerms[1];            
        }
    };

    let GoogleAPI = (searchText, searchStart) => {
        return $q((resolve, reject)=>{            
            $http.get(`${googleCredentials.URL}`+searchText+`&start=${searchStart}`)
            .then((googleObject)=>{                        
                let googleDataArray = [];
                for (var obj in googleObject.data.items) {
                    let googleDataObj = {};
                    googleDataObj.title = googleObject.data.items[obj].title;
                    googleDataObj.link = googleObject.data.items[obj].link;
                    googleDataObj.linkDisplay = createLinkDisplay(googleObject.data.items[obj].link);
                    googleDataObj.image = googleObject.data.items[obj].pagemap.cse_image[0].src;
                    googleDataObj.snippet = googleObject.data.items[obj].snippet;
                    googleDataArray.unshift(googleDataObj);
                }                
                resolve(googleDataArray);
                })
                .catch((error)=>{
                    reject(error);
                });
        });
    };

    let storedPin;
    let storePinForBoard = (pin) => storedPin = pin;
    let getStoredPin = () => storedPin;
    

    return { GoogleAPI, storePinForBoard, getStoredPin };
});



