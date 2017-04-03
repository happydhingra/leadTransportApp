app.controller('profile', function ($scope, $http, $location, loading, Flash, $cookies, $cordovaDialogs, $window) {

    //fetching user data with image name

    if ($cookies.getObject('users')) {
        $scope.email = $cookies.getObject('users').data.data.result.email ? $cookies.getObject('users').data.data.result.email : '';
        $scope.first_name = $cookies.getObject('users').data.data.result.first_name ? $cookies.getObject('users').data.data.result.first_name : '';
        $scope.last_name = $cookies.getObject('users').data.data.result.last_name ? $cookies.getObject('users').data.data.result.last_name : '';
        $scope.contact_number = $cookies.getObject('users').data.data.result.contact_number ? $cookies.getObject('users').data.data.result.contact_number : '';
    }



    loading.active();
    var data = $.param({
        api_key: app_key,
        user_id: $cookies.getObject('user').id,
        user_role_type: $cookies.getObject('user').role
    });
    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };
    var url = app_url + 'apiwebs/appmyprofile.json';
    $http.post(url, data, config)
            .then(function (data) {
//                    console.log(data);
                if (data.data.data.status === 'success') {
                    loading.deactive();
//                    return;
                    var result = data.data.data.result;
                    $scope.email = result.email;
                    $scope.first_name = result.first_name;
                    $scope.last_name = result.last_name;
                    $scope.contact_number = result.mobile;
                    console.log(result);
                    if ($cookies.getObject('user').role === '4') {

                        if ((result.user_detail == null)) {

                            $scope.address = '';
                            $scope.zip_code = '';
                            $scope.telephone = '';
                        }

                        $scope.vehicle_name = result.driver.vehicle_name;
                        $scope.vehicle_number = result.driver.vehicle_number;
                        $scope.additional_details = result.driver.additional_details;
                        $scope.role_cond = $cookies.getObject('user').role;

                    }
                    if ((result.user_detail == null)) {

                        $scope.address = '';
                        $scope.zip_code = '';
                        $scope.telephone = '';
                    } else {

                        $scope.address = result.user_detail.address1;
                        $scope.zip_code = result.user_detail.pincode;
                        $scope.telephone = result.user_detail.alt_landline;
                    }
                    // var profile = data.data.data.profile_image;
                    if ($cookies.getObject('profile_image'))
                    {
                        $scope.profile_image = app_url + 'webroot/uploads/' + result.profiles_image;
                    } else {

                        $scope.profile_image = app_url + 'webroot/uploads/' + result.profiles_image;
                    }
                } else {
                    $scope.invalid_message = data.data.data.responseMessage;
                }

            });



    $scope.showHide = function (fieldId) {
//        alert(fieldId);
        if ($('#' + fieldId).hasClass('hide')) {
            $('#' + fieldId).removeClass('hide');
            $('#' + fieldId).parents().eq(1).find('.grid-form-left-top').addClass('hide');
            $('#' + fieldId + '_i').css('color', 'black');
            //  $('#' + fieldId).val($scope+'.'+fieldId);
        } else if (!$('#' + fieldId).hasClass('hide')) {
            $('#' + fieldId).addClass('hide');
            $('#' + fieldId).parents().eq(1).find('.grid-form-left-top').removeClass('hide').focus();
            $('#' + fieldId + '_i').css('color', '');
        }
    }
    //end userdata fetching


    $scope.submitForm = function (form) {
//        alert();
//        console.log($scope);

        $scope.email_message = "";
        $scope.mobile_message = "";

        loading.active();
        if ($scope.userForm.$valid !== true) {
            $cordovaDialogs.alert('Please Fill Form Correctly', 'Alert', 'Okay');
            loading.deactive();
            return;
        }

        loading.active();
        setTimeout(function () {

            if ($cookies.getObject('user').role === '3') {

                var data = $.param({
                    api_key: app_key,
                    mobile: $scope.contact_number,
                    first_name: $scope.first_name,
                    last_name: $scope.last_name,
                    email: $scope.email,
                    user_id: $cookies.getObject('user').id,
                    address: $scope.address,
                    pincode: $scope.zip_code,
                    user_role_type: $cookies.getObject('user').role
                });

            } else {
                //driver case
                var data = $.param({
                    api_key: app_key,
                    mobile: $scope.contact_number,
                    first_name: $scope.first_name,
                    last_name: $scope.last_name,
                    email: $scope.email,
                    user_id: $cookies.getObject('user').id,
                    address: $scope.address,
                    pincode: $scope.zip_code,
                    user_role_type: $cookies.getObject('user').role,
                    telephone: $scope.telephone
                });

            }
            console.log(data);
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            var url = app_url + 'apiwebs/appeditprofile.json';
            $http.post(url, data, config)
                    .then(function (data) {
                        loading.deactive();
//                console.log(data);
                        if (data.data.data.status === 'success') {
                            $window.location.reload();
                            $scope.message = data.data.data.responseMessage;
                            $cordovaDialogs.alert(data.data.data.responseMessage, 'Alert', 'Okay');
                        } else {
                            $scope.invalid_message = data.data.data.responseMessage;
                        }

                    });

        }, 1500);

    };


});


app.directive('fileModelProfile', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModelProfile);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

app.service('fileUploadProfile', ['$http', '$cookies', function ($http, $cookies) {
        this.uploadFileToUrl = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('profiles_image', file);
            fd.append('user_id', $cookies.getObject('user').id);
            fd.append('api_key', app_key);
            var myEl = angular.element(document.querySelector('.loading-bg'));
            myEl.removeClass('hide').addClass('show');
            setTimeout(function () {
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                        .then(function (response) {
                            console.log(response.data.data.result);

                            if (response.data.data.status == 'success')
                            {
                                var image_paths = app_url + 'webroot/uploads/' + response.data.data.result;
                                $(".imagess").attr('src', image_paths);
//                                alert(image_paths);
//                                console.log(response.data.image_path);
                                $cookies.putObject('profile_image', response.data.image_path);
                            }
                        });
                myEl.removeClass('show').addClass('hide');
            }, 3000);
        }
    }]);

app.controller('updateimageCtrl', ['$scope', 'fileUploadProfile', function ($scope, fileUploadProfile) {
        $scope.uploadFile = function () {
            setTimeout(function () {
                var file = $scope.myFile;
                var uploadUrl = app_url + 'apiwebs/appupdateprofileimage.json';
                fileUploadProfile.uploadFileToUrl(file, uploadUrl);
            }, 500);
        };
    }]);

