app.controller('myload', function ($scope, $http, $location, loading, Flash, $cordovaDialogs, $cookies) {
    $scope.load_details = function (load_id) {
        $cookies.putObject('load_id', load_id);
        $location.path('/myload_details');


    };
    
    $scope.navigate = function (load_id) {
        //alert(load_id);
        $cookies.putObject('load_id', load_id);
        $location.path('/navigate');


    };
    
    $scope.driver_details =  function(load_id, driver_id){
//        alert(load_id + ' '+driver_id);
        var loads = {
            load_id:load_id,
            driver_id:driver_id
        };
        $cookies.putObject('loads', loads);
        $location.path('/driver_details');
//        console.log($cookies.getObject('loads'));
    };

    //activate conditions for button's

    $scope.role_type = $cookies.getObject('user').role;

    $scope.mark_delay = function (load_id,driver_id) {
        //alert('Mark Delay');
         $cookies.putObject('load_id', load_id);
		 $cookies.putObject('driver_id', driver_id);
        $location.path('/mark_delay');
    };

    
    $scope.search = function () {

        //fetching year
        var data = $.param({
            api_key: app_key,
            user_id: $cookies.getObject('user').id,
            user_role_type: $cookies.getObject('user').role,
            search_value: $scope.searching
        });
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var url = app_url + 'apiwebs/appmyloadpsearch.json';
        $http.post(url, data, config)
                .then(function (data) {

                    console.log(data);

                    if (data.data.data.status == 'success') {
//                        loading.deactive();
                        console.log(data.data.data.result);
                        $scope.autosearch = data.data.data.result;
                    } else {
                    }

                });

    };

    loading.active();

    //fetching year
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
    var url = app_url + 'apiwebs/appmyloadpbyid.json';
    $http.post(url, data, config)
            .then(function (data) {
                if (data.data.data.status == 'success') {
                    loading.deactive();
                    console.log(data.data.data.result);
                    $scope.result = data.data.data.result;
                } else {


                    loading.deactive();
                    $scope.message = 'No Record Found';
                }

            });

    $scope.register = function () {
        $location.path('/register');
    };

});