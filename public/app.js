
var eyeApp = angular.module("myApp", ['ngRoute']);

eyeApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/views/home.html',
			controller: 'homeCtrl'
		})
		.when('/signup', {
			templateUrl: '/views/signup.html',
			controller: 'signupCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);