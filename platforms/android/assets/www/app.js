var app_url = 'http://projects.tekshapers.in/leaptransporter/';
//var app_url = 'http://localhost/taxapp/';
var app_key = 'f3f26320c290d9634646618_@DDjh4c607c707ade18f8ea';
//var loading = angular.element(document.querySelector('.loading-bg'));

//alert();
var app = angular.module("app", ['ngRoute', 'ngFlash', 'ngCookies', 'ngMessages', 'use', 'ngCordova','720kb.datepicker','google-maps','geolocation']);
app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                resolve: {function($cookies, $location) {
                        if ($cookies.getObject('user')) {

                            if ($cookies.getObject('user').role === '4') {

                                $location.path('/dashboard');
                            } else {

                                $location.path('/consumer_dashboard');
                            }
                        } else {

                            $location.path('/');
                        }
                    }},
                templateUrl: "splash.html"

            }).when("/login", {

        templateUrl: "login.html"

    }).when("/howitwork", {
        resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    if ($cookies.getObject('user').role === '4') {

                        $location.path('/dashboard');
                    } else {

                        $location.path('/consumer_dashboard');
                    }
                } else {

                    $location.path('/howitwork');
                }
            }},

        templateUrl: "splash-login-register.html"

    }).when("/login", {
        resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    if ($cookies.getObject('user').role === '4') {

                        $location.path('/dashboard');
                    } else {

                        $location.path('/consumer_dashboard');
                    }
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "login.html"

    }).when("/controls", {
      

        templateUrl: "test.html"

    }).when("/register", {

        resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    if ($cookies.getObject('user').role === '4') {

                        $location.path('/dashboard');
                    } else {

                        $location.path('/consumer_dashboard');
                    }
                } else {

                    $location.path('/register');
                }
            }},

        templateUrl: "register.html"

    }).when("/dashboard", {
        resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    $location.path('/dashboard');
                    
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "dashboard.html"

    }).when("/mark_delay", {
        resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    $location.path('/mark_delay');
                    
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "dealy-in-delivery-driver.html"

    }).when("/terms_and_cond", {
        resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    $location.path('/terms_and_cond');
                    
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "term-services.html"

    }).when("/navigate", {
        resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    $location.path('/navigate');
                    
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "navigate-location-driver.html"

    }).when("/driver_details", {
        resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    $location.path('/driver_details');
                    
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "view-driver-details.html"

    }).when("/consumer_dashboard", {

       resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    $location.path('/consumer_dashboard');
                    
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "dashboard.html"

    }).when("/forgot_password", {

        resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    if ($cookies.getObject('user').role === '4') {

                        $location.path('/dashboard');
                    } else {

                        $location.path('/consumer_dashboard');
                    }
                } else {

                    $location.path('/forgot_password');
                }
            }},

        templateUrl: "forgot-password.html"

    }).when("/myprofile", {

       resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    $location.path('/myprofile');
                    
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "profile.html"

    }).when("/driver_myprofile", {

        resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    $location.path('/driver_myprofile');
                    
                } else {

                    $location.path('/login');
                }
            }},
        templateUrl: "profile.html"

    }).when("/myload", {

        resolve: {function($cookies, $location) {
               if ($cookies.getObject('user')) {
                    $location.path('/myload');
                    
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "my-loads.html"

   }).when("/myload_details", {

        resolve: {function($cookies, $location) {
               if ($cookies.getObject('user')) {
                    $location.path('/myload_details');
                    
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "view-loads-customer-panel.html"

    }).when("/mypayment", {

        resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    $location.path('/mypayment');
                    
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "my-payments-driver.html"

    }).when("/changepassword", {

        resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    $location.path('/changepassword');
                    
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "reset-password.html"

    }).when("/notification", {

        resolve: {function($cookies, $location) {
                if ($cookies.getObject('user')) {
                    $location.path('/notification');
                    
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "notifications.html"

    }).when("/add_load", {

        resolve: {function($cookies, $location) {
               if ($cookies.getObject('user')) {
                    $location.path('/add_load');
                    
                } else {

                    $location.path('/login');
                }
            }},

        templateUrl: "add-load-consumer-panel.html"

    }).otherwise({

        redirectTo: '/'

    });
});


