(function () {
    'use strict';

    angular
        .module('flapperNews', ['ui.router'])
        .config(stateURLConfig);

    stateURLConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function stateURLConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/templates/home.html',
                controller: 'MainCtrl',
                controllerAs: 'vm',
                resolve: {
                    postPromise: ['posts', function (posts) {
                        return posts.getAll();
                    }]
                },
                onEnter: onAppEnterNoAuth
            })

            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/templates/posts.html',
                controller: 'PostsCtrl',
                controllerAs: 'vm',
                resolve: {
                    post: ['$stateParams', 'posts', function ($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }]
                },
                onEnter: onAppEnterNoAuth
            })

            .state('login', {
                url: '/login',
                templateUrl: '/templates/login.html',
                controller: 'AuthCtrl',
                controllerAs: 'vm',
                onEnter: onAppEnterAuth
            })

            .state('register', {
                url: '/register',
                templateUrl: '/templates/register.html',
                controller: 'AuthCtrl',
                controllerAs: 'vm',
                onEnter: onAppEnterAuth
            });

        $urlRouterProvider.otherwise('/');

        onAppEnterNoAuth.$inject = [
            '$state',
            'auth'
        ];

        function onAppEnterNoAuth($state, auth) {
            if (!auth.isLoggedIn()) {
                $state.go('login');
            }
        }

        onAppEnterAuth.$inject = [
            '$state',
            'auth'
        ];

        function onAppEnterAuth($state, auth) {
            if (auth.isLoggedIn()) {
                $state.go('home');
            }
        }
    }

})();












