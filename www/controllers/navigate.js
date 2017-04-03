app.controller('navigate', function ($scope, $http, $location, loading, Flash, $cookies, $cordovaDialogs, $filter, $document) {


    $scope.map = {
        control: {},
        center: {
            latitude: -37.812150,
            longitude: 144.971008
        },
        zoom: 20

    };
    // marker object
    $scope.marker = {
        center: {
            latitude: -37.812150,
            longitude: 144.971008
        }
    };
    // instantiate google map objects for directions
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var geocoder = new google.maps.Geocoder();

//     directions object -- with defaults




    loading.active();

    //fetching year
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
                var origin =  data.data.data.result[0].pickup_address;
                var destination =  data.data.data.result[0].drop_address;
                $scope.directions = {
                    origin: origin,
                    destination: destination,
                    showList: true
                };
                // get directions using google maps api
                var request = {
                    origin: $scope.directions.origin,
                    destination: $scope.directions.destination,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                console.log(request);
                directionsService.route(request, function (response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {

                        directionsDisplay.setDirections(response);
                        directionsDisplay.setMap($scope.map.control.getGMap());
                        directionsDisplay.setPanel(document.getElementById('directionsList'));
                        $scope.directions.showList = true;
                    } else {
                        alert('Google route is not correct! Please Check it Again');
                    }
                });
                $scope.directionss = {
                    origins: data.data.data.result[0].drop_address,
                    destinations: data.data.data.result[0].pickup_address,
                    showList: true
                };
                if (data.data.data.status === 'success') {
                    loading.deactive();
                    //console.log(data.data.data.result);
                    $scope.result = data.data.data.result;
                } else {
                    loading.deactive();
                    $scope.message = 'No Record Found';
                }

            });

            $scope.nav = function(){
//                alert("http://maps.google.com/?q=" + $scope.directions.destination + ',' + $scope.directions.origin +"_system");
                window.open("http://maps.google.com/?q=" + $scope.directions.destination ,"_system");
               
            };
});



