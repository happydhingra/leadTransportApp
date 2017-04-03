app.controller('controls', ['$scope', '$http', '$location', '$cookies','loading','$filter',function ($scope, $http, $location, $cookies, loading, $filter) {


//        console.log($cookies.getObject('user').role);
        $scope.register = function () {
            $location.path('/register');
        };

        $scope.login = function () {
            $location.path('/login');
        };


        $scope.forgot_password = function () {
            $location.path('/forgot_password');
        };

        $scope.myload = function () {
            if($cookies.getObject('user').role = '3'){
            $location.path('/myload');
                
            }else{
                
            $location.path('/myload');
            }
        };

        $scope.dashboard = function () {
//            alert();
            $location.path('/dashboard');
        };
        
        $scope.myprofile = function () {
            if($cookies.getObject('user').role == '4'){
                
            $location.path('/driver_myprofile');
                
            }else{
                
            $location.path('/myprofile');
            
            }
            
        };
        
        $scope.mypayments = function () {
            $location.path('/mypayment');
        };
        
        $scope.changepassword = function () {
            $location.path('/changepassword');
        };
        
        $scope.notification  = function () {
            $location.path('/notification');
        };
        
         $scope.add_load  = function () {
            //loading.active();
            $location.path('/add_load');
            //loading.deactive();
        };
        
         $scope.logout  = function () {
             
            $cookies.remove('user');
            $location.path('/login');
        };
        
        
      $scope.submitForm = function (form) {
          
          alert($filter('date')(new Date($scope.dateExample.value), 'yyyy-MM-dd HH:mm'));
          alert($scope.dateExample.value);
          
//          $filter('date')(new Date(form), 'yyyy-MM-ddHH:mm:ss');
          
          console.log($scope.dateExample.value);
      };
    }]);


app.directive('formattedDate', function(dateFilter, $filter) {
      return {
        require: 'ngModel',
        scope: {
          format: "="
        },
        link: function(scope, element, attrs, ngModelController) {
          ngModelController.$parsers.push(function(data) {
            //convert data from view format to model format
//            var jd = $filter('date')(new Date(data), 'yyyy-MM-dd HH:mm:ss');
            return $filter('date')(new Date(data), 'yyyy-MM-ddTHH:mm:ss');
//            alert(jd);
//            return dateFilter(data, scope.format); //converted
          });
    
          ngModelController.$formatters.push(function(data) {
                //convert data from model format to view format
//            alert();
            return dateFilter(data, scope.format); //converted
          });
        }
      }
    });
