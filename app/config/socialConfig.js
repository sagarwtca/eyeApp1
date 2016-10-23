module.exports= {
	facebookAuth :{
		 appId: "1307414972604806",
         secretId: "0290f8325874b194a0c9901bd64aef38",
         callback_URL: "http://localhost:3000/auth/facebook/callback",
         callback_URL_DEV : "http://nodedating-datingnode.rhcloud.com/auth/facebook/callback"
	},

	twitterAuth :{
		 appId: "rBw3yZNu1ccNoEFiVvk3ZIkt0",
         secretId: "zfENEaIeF8s7MkUHSn0IeFbXNIzHvQICqRrG2ZAn9VqudAARQw",
         callback_URL: "http://localhost:3000/auth/twitter/callback",
         callback_URL_DEV : "http://nodedating-datingnode.rhcloud.com/auth/facebook/callback"
	},

	googleAuth :{
		 appId: "896110435981-50qj8j89a6uq12uq65gk5hgbqoardue5.apps.googleusercontent.com",
         secretId: "jyMyLKUpL6lJvWHxCxCf2tN1",
         callback_URL: "http://localhost:3000/api/user/twitter/callback",
         callback_URL_DEV : "http://nodedating-datingnode.rhcloud.com/auth/facebook/callback"
	}
}