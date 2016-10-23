eyeApp.controller('signupCtrl', function($scope, signupService){
	$scope.user={};
	$scope.validateForm = function() {
		if($scope.user.password==$scope.user.conf_password) {
			console.log($scope.user);
		signupService.signupService($scope.user);
		}
		else return false;
	}
})