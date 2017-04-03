app.controller('mark_delay', function ($scope, $http, $location, loading, Flash, $cordovaDialogs, $cookies, geolocation) {



    //Mark Delay
    var load_id = $cookies.getObject('load_id');
	var driver_id=$cookies.getObject('driver_id');
	var lat;
	var long;
	var location;
	$scope.delay_reason='';
// instantiate google map objects for directions
    var geocoder = navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        var geocoder =  new google.maps.Geocoder();
        latlng = new google.maps.LatLng(lat, long),
        geocoder.geocode({'latLng': latlng}, function (results, status) {
            console.log(results);
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                       console.log("Location: " + results[1].formatted_address);
					   location=results[1].formatted_address;
					   
                }
            }
        });


    });


    //console.log(geocoder);

    // alert();
    loading.active();
   // console.log($cookies.getObject('loads'));
    //driver case
    var data = $.param({
        api_key: app_key,
        //driver_id: $cookies.getObject('loads').driver_id,
        //load_id: $cookies.getObject('loads').load_id

    });


    //console.log(data);
    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };
    var url = app_url + 'apiwebs/appdriverdetails.json';
    $http.post(url, data, config)
            .then(function (data) {
                loading.deactive();
                //console.log(data.data.data);
                if (data.data.data.status === 'success') {
                    //$scope.page_discription = data.data.data.result.page_discription;
                    $scope.result = data.data.data.result;
                } else {
                    $scope.invalid_message = data.data.data.responseMessage;
                }

            });

    $scope.fill_inspect = function () {
        alert('fill_inspect');
    };
////////////////Delay reason submit code start from here///////////////////
       $scope.checkValid=function(){
		 if(this.delay_reason!='' || this.delay_reason.length>=1)
		 {
			 $scope.invalid=null;
		 }
	   };
	   $scope.delayReasonSubmit=function(){
			var reason=this.delay_reason;
			 $scope.success='';
			if(this.delay_reason.length<1 || this.delay_reason.length=='')
			{
			   $scope.invalid="Please enter delay reason";
			   return false;
			}
			var data = $.param({
					api_key: app_key,
					load_id: load_id,
					driver_id: driver_id,
					delay_reason:reason,
					location: location,
					mark_lat:lat,
					mark_long:long
				});			
			var url = app_url + 'apiwebs/appdriverdelay.json';
			$http.post(url, data, config)
            .then(function (response) {
				console.log(response);
                if (response.data.data.status === 'success') 
				{
				   $scope.success=response.data.data.responseMessage;
				   $scope.delay_reason='';
				   $scope.invalid='';
                } 
				else 
				{
                    $scope.invalid= data.data.data.responseMessage;
                }
            });	
			//////////////
		}
     ////////////////Delay reason submit code end over here///////////////////
});