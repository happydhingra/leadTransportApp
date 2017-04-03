app.controller('driver_details', function ($scope, $http, $location, loading, Flash, $cordovaDialogs, $cookies, geolocation) {

// instantiate google map objects for directions
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var geocoder = navigator.geolocation.getCurrentPosition(function(position){
        var lat     = position.coords.latitude;
        var long    = position.coords.longitude;
        console.log('Your latitude is :' + lat + ' and longitude is ' + long);  
        
//         var lat = 44.88623409320778,
//         lng = -87.86480712897173,
         latlng = new google.maps.LatLng(lat, long),
         console.log(latlng);
         
         
         var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        alert("Location: " + results[1].formatted_address);
                    }
                }
            });
         
         
    });
    
   
    console.log(geocoder);

    alert();
    loading.active();
    console.log($cookies.getObject('loads'));
    //driver case
    var data = $.param({
        api_key: app_key,
        driver_id: $cookies.getObject('loads').driver_id,
        load_id: $cookies.getObject('loads').load_id

    });


    console.log(data);
    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };
    var url = app_url + 'apiwebs/appdriverdetails.json';
    $http.post(url, data, config)
            .then(function (data) {
                loading.deactive();
                console.log(data.data.data);
                if (data.data.data.status === 'success') {
                    //$scope.page_discription = data.data.data.result.page_discription;
                    $scope.result = data.data.data.result;
                } else {
                    $scope.invalid_message = data.data.data.responseMessage;
                }

            });

    $scope.fill_inspect = function () {
        alert('fill_inspect');
    }


});