"use strict";

app.controller('ExploreCtrl', function($scope, GoogleFactory){
  	
    $scope.data = GoogleFactory.getGoogleDataArray();
	
});

    // $scope.data = [
    // 				{"title": "Nashville Software School", 
    // 				"link": "http", 
    // 				"snippet": "this snippet", 
    // 				"image": "http://0.media.collegehumor.cvcdn.com/43/70/bc100d0a647667dfa177af5ee4bacd43-jesus-with-a-dinosaur-1.jpg"},
    // 				{"title": "Nashville Software School", 
    // 				"link": "http", 
    // 				"snippet": "this snippet", 
    // 				"image": "http://0.media.collegehumor.cvcdn.com/71/71/d4c2acd38731680acff7d0b6849bbf8a-jesus-with-a-dinosaur-2.jpg"},
    // 				{"title": "Nashville Software School", 
    // 				"link": "http", 
    // 				"snippet": "this snippet", 
    // 				"image":"http://2.media.collegehumor.cvcdn.com/16/50/97aff4616c4f3b74b7690f9c60ae9bf7-jesus-with-a-dinosaur-16.jpg"},
    // 				{"title": "Nashville Software School", 
    // 				"link": "http", 
    // 				"snippet": "this snippet", 
    // 				"image": "http://2.media.collegehumor.cvcdn.com/81/25/bd4ff191f9a6780ff9d10b57282e0738-jesus-with-a-dinosaur-7.jpg"}
    // 				];
