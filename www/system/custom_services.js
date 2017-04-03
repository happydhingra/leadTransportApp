app.service('loading', function () {
    var process = {};
    var load = angular.element(document.querySelector('.loading-bg'));
    
    process.active = function () {
        return load.removeClass('hide').addClass('show');
    };
    
    process.deactive = function () {
        return load.removeClass('show').addClass('hide');
    };
    return process;
});
