app.controller('load_details', function ($scope, $http, $location, loading, Flash, $cordovaDialogs, $cookies, $window) {




    loading.active();
    setTimeout(function () {
        var data = $.param({
            api_key: app_key,
            load_id: $cookies.getObject('load_id')
        });
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var url = app_url + 'apiwebs/apploaddetailsbyid.json';
        $http.post(url, data, config)
                .then(function (data) {
                    console.log(data.data.data.result);
                    if (data.data.data.status == 'success') {
                        loading.deactive();

                        $scope.load_details = data.data.data.result;

                    } else {

                    }
                });
    }, 1500);

    $scope.load_reason = function (reason) {

        if (reason === 'accept') {
            //accept
            var load_status = '4';
        } else {

            var load_status = '3';
            // alert(data);
        }

        loading.active();
        setTimeout(function () {
            var data = $.param({
                api_key: app_key,
                load_id: $cookies.getObject('load_id'),
                load_status: load_status
            });
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            var url = app_url + 'apiwebs/aapchangeloadstatus.json';
            $http.post(url, data, config)
                    .then(function (data) {
                        console.log(data.data.data.responseMessage);
                        if (data.data.data.status == 'success') {
                            loading.deactive();
                            $window.location.reload();
                            $cordovaDialogs.alert(data.data.data.responseMessage, 'Alert', 'Okay');
                            $location.path('/dashboard');
                            //$scope.load_details = data.data.data.result;

                        } else {
                            
                             $cordovaDialogs.alert('Error', 'Alert', 'Okay');
                        }
                    });
        }, 1500);


       // alert(data);
        //fetch and hit the api futher
    };



    $scope.submitForm = function (form) {


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
        if ($scope.userForm.$valid !== true) {
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