(function() {
    'use strict';

    angular
        .module('thinkster.posts')
        .controller('IndexController', IndexController)
    
    IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar'];

    function IndexController($scope, Authentication, Posts, Snackbar) {
        var vm = this;

        vm.isAuthenticated = Authentication.isAuthenticated();
        vm.posts = [];

        activate();

        function activate(){
            Posts.all().then(postsSuccess, postsError);

            $scope.$on('post.created', function (event, post) {
                vm.posts.unshift(post);
            });

            $scope.$on('post.created.error', function () {
                vm.posts.shift();
            });

            function postsSuccess(data, status, headers, config) {
                vm.posts = data.data;
            }

            function postsError(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }

})();