(function(){
    'use strict';

    angular
        .module('thinkster.posts', [
            'thinkster.posts.controllers',
            'thinkster.posts.services',
            'thinkster.posts.directives'
        ]);
    
    angular
        .module('thinkster.posts.controllers', []);
    
    angular
        .module('thinkster.posts.services', []);
    
    angular
        .module('thinkster.posts.directives', ['ngDialog']);
})();