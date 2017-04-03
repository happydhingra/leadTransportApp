app.controller('terms_cond', ['$scope', '$http', '$location', 'loading', function ($scope, $http, $location, loading) {
        loading.active();
        setTimeout(function () {


            //driver case
            var data = $.param({
                api_key: app_key,
                page_id:'1'

            });


            console.log(data);
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            var url = app_url + 'apiwebs/appstaticpages.json';
            $http.post(url, data, config)
                    .then(function (data) {
                        loading.deactive();
//                console.log(data.data.data.result);
                        if (data.data.data.status === 'success') {
                            $scope.page_discription = data.data.data.result.page_discription;
                            $scope.page_name = data.data.data.result.page_name;
                        } else {
                            $scope.invalid_message = data.data.data.responseMessage;
                        }

                    });

        }, 1500);



        $scope.how_it_works = function () {



            $location.path('/howitwork');
        };

        $scope.skip = function () {
            $location.path('/login');
        };

        $scope.login = function () {
            $location.path('/login');
        };

        $scope.register = function () {
            $location.path('/register');
        }

    }]);