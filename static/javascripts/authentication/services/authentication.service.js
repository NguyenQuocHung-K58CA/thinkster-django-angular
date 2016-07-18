(function () {
    'use strict';

    angular
        .module('thinkster.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http'];

    function Authentication($cookies, $http) {
        var Authentication = {
            register: register,
            login: login,
            logout: logout,
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            unAuthenticate: unAuthenticate,
            setAuthenticatedAccount: setAuthenticatedAccount
        };

        return Authentication;

        function register(email, password, username){
            return $http.post('/api/v1/accounts/', {
                username: username,
                password: password,
                email: email
            }).then(registerSuccess, registerError);
        }

        function registerSuccess(data, status, headers, config) {
            Authentication.login(data.data.email, data.data.password);
        }

        function registerError(data, status, headers, config) {
            console.error('Register failure!');
        }

        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                email: email,
                password: password
            }).then(loginSuccess, loginError);
        }

        function loginSuccess(data, status, header, config) {
            Authentication.setAuthenticatedAccount(data.data);
            window.location.href = '/';
        }

        function loginError(data, status, header, config) {
            console.error('Login failure!');
        }

        function getAuthenticatedAccount(){
            if (!$cookies.get("authenticatedAccount")){
                return;
            }
            return JSON.parse($cookies.get("authenticatedAccount") );
        }

        function isAuthenticated() {
            return !!$cookies.get("authenticatedAccount");
        }

        function setAuthenticatedAccount(account) {
            $cookies.put("authenticatedAccount", JSON.stringify(account) );
        }

        function unAuthenticate() {
            $cookies.remove("authenticatedAccount");
        }

        function logout() {
            return $http.post('/api/v1/auth/logout/').then(logoutSuccess, logoutError);
        }

        function logoutSuccess(data, status, headers, config) {
            Authentication.unAuthenticate();
            window.location.href = '/';
        }

        function logoutError(data, status, headers, config) {
            console.error('Logout failure!');
        }
    }
})();