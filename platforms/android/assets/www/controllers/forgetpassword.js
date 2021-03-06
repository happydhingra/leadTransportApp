app.controller('forgetpassword', function ($scope, $http, $location, loading, Flash, $cookies, $cordovaDialogs) {



    $scope.submitForm = function (form) {

        $scope.email_message = "";
        $scope.mobile_message = "";

        var args = {

            api_key: app_key,
            username: $scope.mobile_no
        };
//        console.log(args);
        loading.active();
        if ($scope.userForm.$valid !== true) {
            $cordovaDialogs.alert('Please Check Mobile Number', 'Alert', 'Alert');
            loading.deactive();
            return;
        }

        loading.active();
        setTimeout(function () {
            var data = $.param({
                api_key: app_key,
                mobile: $scope.mobile_no
            });
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            var url = app_url + 'apiwebs/appforgotpassword.json';
            $http.post(url, data, config)
                    .then(function (data) {
                        console.log(data);
                        loading.deactive();
                        if (data.data.data.status === 'success') {
//                            console.log(data.data.data.result);
                            $cordovaDialogs.alert('OTP has been sent to your registered email', 'Alert', 'Okay');
//                            $cookies.putObject('user', data.data.data.result);
                            $location.path('/login');

                            //navigator.notification.alert(data.data.data.responseMessage, 'Alert', 'Alert');
                        } else {

                            $scope.invalid_message = data.data.data.responseMessage;
                        }

                    });

        }, 1500);

    };


});


app.controller('changepasswordController', function ($scope, $http, $location, $cookieStore, $localStorage, Flash, $sessionStorage, $window, sessionService) {


    // create a blank object to handle form data.
    $scope.user = {};
    {
        $scope.user.password
    }
//    console.log($cookieStore.get('users').data.data.result.user_type);

    if ($cookieStore.get('users').data.data.result.user_type == '3')
    {
        $scope.homestatus = 'Yes';
    } else {
        $scope.homestatus = 'No';

    }
    // calling our submit function.
    $scope.submitForm = function () {
        // Posting data to php file
        //console.log($cookieStore.get('users').data.data.result.id);

        var args = {
            password: $scope.user.password,
            confirm_password: $scope.user.confirm_password,
            user_id: $cookieStore.get('users').data.data.result.id
        };
        var myEl = angular.element(document.querySelector('.loading-bg'));
        myEl.removeClass('hide').addClass('show');
        setTimeout(function () {
            $http({
                method: 'POST',
                url: app_url + 'webservices/user/set_password',
                data: args, //forms user object
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                    .then(function (data) {
                        var response = data.data.responseStatus;

                        if (response == 'success') {
                            Flash.create('success', "Password have been changed successfully! And you need to login again");
                            $cookieStore.remove('users');
                            $location.path('/login');
                            myEl.removeClass('show').addClass('hide');
                        } else {
                            var resss = data.data.responseMessage;
//                        Flash.create('danger', resss);
                            alert(resss);
                            $location.path('/changepassword');
                        }
                    });
        }, 5000);

    };
});