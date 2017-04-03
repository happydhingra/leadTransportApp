app.controller('dashboard', function ($scope, $http, $location, loading, Flash, $cookies, $cordovaDialogs) {

    if($cookies.getObject('user').role === '3'){
        
        $scope.user_role_type = $cookies.getObject('user').role;
    }
    //fetching makers list
    loading.active();
    var data = $.param({
        api_key: app_key,
        user_id: $cookies.getObject('user').id,
        user_role_type:$cookies.getObject('user').role
    });
    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };
    var url = app_url + 'apiwebs/appaddloaddetailsbyid.json';
    $http.post(url, data, config)
            .then(function (data) {
//                console.log(data);
                if (data.data.data.result != '') {

                    if (data.data.data.result) {

                        $scope.loads = data.data.data.result;
                    } else {

                        $scope.load = 'No Reocrd Found';
                    }

//                    loading.deactive();

                }
            });
    //fetching makers list
//    loading.active();
    var data = $.param({
        api_key: app_key,
        user_id: $cookies.getObject('user').id,
        user_role_type:$cookies.getObject('user').role
    });
    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };
    var url = app_url + 'apiwebs/appconsumerloadtotalbyid.json';
    $http.post(url, data, config)
            .then(function (data) {
//                console.log(data);
                if (data.data.data.result != '') {

                    $scope.total_load = data.data.data.result;

//                    loading.deactive();

                }
            });

    //fetching makers list
//    loading.active();
    var data = $.param({
        api_key: app_key,
        user_id: $cookies.getObject('user').id,
        user_role_type:$cookies.getObject('user').role
    });
    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };
    var url = app_url + 'apiwebs/appconsumerloadcompletedbyid.json';
    $http.post(url, data, config)
            .then(function (data) {
//                console.log(data);
                if (data.data.data.result != '') {

                    $scope.load_completed = data.data.data.result;

//                    loading.deactive();

                }
            });


    //fetching makers list
//    loading.active();
    var data = $.param({
        api_key: app_key,
        user_id: $cookies.getObject('user').id,
        user_role_type:$cookies.getObject('user').role
    });
    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };
    var url = app_url + 'apiwebs/appconsumerloadprogresssbyid.json';
    $http.post(url, data, config)
            .then(function (data) {
//                console.log(data);
                if (data.data.data.result != '') {

                    $scope.load_progress = data.data.data.result;

                    loading.deactive();

                }
            });
  $scope.load_details = function (load_id) {
        $cookies.putObject('load_id',load_id);
        $location.path('/myload_details');
       

    };
//    $scope.changedValue = function (data) {
//        //fetching model list
//        var data = $.param({
//            api_key: app_key,
//            make_id: data
//        });
//        var config = {
//            headers: {
//                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
//            }
//        };
//        var url = app_url + 'apiwebs/appmodellist.json';
//        $http.post(url, data, config)
//                .then(function (data) {
//                    //console.log(data.data.data.result);
//                    if (data.data.data.result != '') {
//
//                        $scope.model = data.data.data.result;
//
//                    }
//                });
//        };
//
////fetching year
//    var data = $.param({
//        api_key: app_key
//    });
//    var config = {
//        headers: {
//            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
//        }
//    };
//    var url = app_url + 'apiwebs/apploadyear.json';
//    $http.post(url, data, config)
//            .then(function (data) {
//                //console.log(data.data.data.result);
//                if (data.data.data.result != '') {
//
//                    $scope.year = data.data.data.result;
//
//                }
//            });

    $scope.submitForm = function (form) {

        if ($scope.userForm.$valid !== true) {
            $cordovaDialogs.alert('Please Fill Form Correctly', 'Alert', 'Alert');
            loading.deactive();
            return;
        }
//        

        $scope.email_message = "";
        $scope.mobile_message = "";
        // console.log($scope);

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
                make_id: $scope.userForm.make,
                model_id: $scope.userForm.model,
                load_year: $scope.userForm.year,
                number_vehicles: $scope.vehicle_number,
                vin_number: $scope.vin_number,
                pickup_date: $scope.pickup_date,
                pickup_name: $scope.pickup_name,
                pickup_email: $scope.pickup_email,
                pickup_mobile: $scope.pickup_mobile_no,
                pickup_address: $scope.pickup_address,
                pickup_zipcode: $scope.pickup_zipcode,
                drop_name: $scope.dropoff_name,
                drop_email: $scope.dropoff_email,
                drop_mobile: $scope.dropoff_mobile_no,
                drop_address: $scope.dropoff_address,
                drop_zipcode: $scope.dropoff_zipcode,
                payvia_type: $scope.payvia,
                added_user_id: $cookies.getObject('user').id
            });

            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            var url = app_url + 'apiwebs/aapaddloaddetails.json';
            $http.post(url, data, config)
                    .then(function (data) {
                        console.log(data);
                        loading.deactive();
                        if (data.data.data.status === 'success') {
//                            console.log(data.data.data.result);
                            $cookies.putObject('user', data.data.data.result);
                            $location.path('/dashboard');

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