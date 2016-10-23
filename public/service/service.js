eyeApp.service('signupService', function ($http){
	
	this.signupService= function (data) {
		 return $http({
					     
					       method: 'post',
					       url: 'api/user/signup',
					       data: data
					 }).then(function(result) {
                            return result.data;
                    });		
	}
})