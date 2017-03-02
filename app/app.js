"use strict";

var app = angular.module("HellaCoolPinterestProject", ["ngRoute"]);

	app.config(function($routeProvider){
    $routeProvider.
    when('/', {
        templateUrl: '../partials/Explore.html',
        controller: "ExploreCtrl"
    });
});

