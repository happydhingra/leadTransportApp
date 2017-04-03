app.controller('register', function ($scope, $http, $location, loading, Flash, $cordovaDialogs) {

    $scope.ghj = function(form){
        console.log($scope[form].$error);
        
            $scope.showMsgs = true;
        if($scope[form].$error){
        }else{
            alert();
        }
        
    };
    
    
    $scope.submitForm = function (form) {
//        alert();
        

        $scope.email_message = "";
        $scope.mobile_message = "";

        var args = {

            api_key: app_key,
            first_name: $scope.first_name,
            last_name: $scope.last_name,
            mobile: $scope.mobile_no,
            email: $scope.email,
            password: $scope.password,
            conform_password: $scope.confirmPassword
        };

        loading.active();
        if($scope.userForm.$valid !== true){
           $cordovaDialogs.alert('Please Fill Form Correctly', 'Alert', 'Okay');
           loading.deactive();
           return;
        }
        //console.log($scope.userForm.$valid);
        setTimeout(function () {
            $http({
                method: 'POST',
                url: app_url + 'apiwebs/appregister.json',
                data: args, //forms user object
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (data) {
                loading.deactive();
                if (data.data.data.status === 'success') {
                    $cordovaDialogs.alert(data.data.data.responseMessage, 'Alert', 'Okay');
                    $location.path('/login');
                    // alert(data.data.data.responseMessage);

                } else {
                    if (data.data.data.result != '') {

                        $scope.email_message = data.data.data.result.email;
                        $scope.mobile_message = data.data.data.result.mobile;

                    }
                }
            });
        }, 1500);

    };
    $scope.register = function () {
        $location.path('/register');
    };

});