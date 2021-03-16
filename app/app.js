var myPortfolioApp = angular.module('myPortfolioApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate']);

myPortfolioApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/landingPage.html',
            controller: 'portfolioController'
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'portfolioController'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'portfolioController'
        })
        .when('/project/:id', {
            templateUrl: 'views/project.html',
            controller: 'portfolioController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'portfolioController'
        })
        .when('/thanks', {
            templateUrl: 'views/thanks.html',
            controller: 'portfolioController'
        })
        .otherwise({
            templateUrl: 'views/home.html',
            controller: 'portfolioController'
        });

    $locationProvider.html5Mode(true);
}]);

myPortfolioApp.controller('portfolioController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    //Loads data from JSON file
    $http.get('data/projects.json').then(function (response) {
        $scope.projects = response.data;
    });

    //Grabs :id param from url and is used to fetch the correct object from json
    $scope.id = $routeParams.id;

    $scope.init = function(){
        var typeText = document.querySelector("#str")
        var textToBeTyped = "Front-end developer"
        var index = 0, isAdding = true

        function playAnim() {
            setTimeout(function () {
                // set the text of typeText to a substring of
                // the textToBeTyped using index.
                typeText.innerText = textToBeTyped.slice(0, index)
                if (isAdding) {
                // adding text
                if (index > textToBeTyped.length) {
                    // no more text to add
                    isAdding = false
                    //break: wait 2s before playing again
                    setTimeout( function () {
                    playAnim()
                    }, 2000)
                    return
                } else {
                    // increment index by 1
                    index++
                }
                } else {
                // removing text
                if (index === 0) {
                    // no more text to remove
                    isAdding = true
                } else {
                    // decrement index by 1
                    index--
                }
                }
                // call itself
                playAnim()
            }, 120)
        }
        // start animation
        playAnim()
    }

    $scope.dob = 1994;
    $scope.currYear = new Date().getFullYear();

    $scope.isMenuOpen = false;

    $scope.toggleMenu = function () {
        $scope.isMenuOpen = !$scope.isMenuOpen;
    }

}]);