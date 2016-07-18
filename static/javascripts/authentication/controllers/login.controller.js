(function (){
    'use strict';
    angular
        .module('thinkster.authentication.controllers')
        .controller('LoginController', LoginController);
    
    LoginController.$inject = ['$location', '$window', '$scope', 'Authentication'];

    function LoginController($location, $window, $scope, Authentication) {
        var vm = this;

        vm.login = login;

        activate();

        function activate(){
            if (Authentication.isAuthenticated()){
                $window.location.href = '/';
            }
        }

        function login(){
            Authentication.login(vm.email, vm.password);
        }
    }
})();