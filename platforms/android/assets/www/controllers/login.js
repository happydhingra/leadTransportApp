app.controller('login', function ($scope, $http, $location, loading, Flash, $cookies) {



    $scope.user_role = '3'
    $scope.submitForm = function (form) {

        $scope.email_message = "";
        $scope.mobile_message = "";
//        alert($scope.user_role ='3');
        loading.active();
        if ($scope.userForm.$valid !== true) {
            navigator.notification.alert('Please Fill Form Correctly', 'Alert', 'Alert');
            loading.deactive();
            return;
        }

        loading.active();
        setTimeout(function () {
            var data = $.param({
                api_key: app_key,
                username: $scope.mobile_no,
                password: $scope.password,
                role: $scope.user_role
            });
            console.log(data);
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            var url = app_url + 'apiwebs/applogin.json';
            $http.post(url, data, config)
                    .then(function (data) {
//                        console.log(data.data.data.result.role);
                        loading.deactive();
                        if (data.data.data.status === 'success') {
//                            console.log(data.data.data.result);
                            $cookies.putObject('user', data.data.data.result);
                                $location.path('/dashboard');
//                            if (data.data.data.result.role === '4') {
//                                
//                                $location.path('/consumer_dashboard');
//
//                            } else {
//
//                                $location.path('/dashboard');
//                            }
//                            
                            //navigator.notification.alert(data.data.data.responseMessage, 'Alert', 'Alert');
                        } else {
                            
                            $scope.invalid_message = data.data.data.responseMessage;
                        }

                    });

        }, 1500);

    };


});

