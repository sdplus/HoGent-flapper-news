angular.module('flapperNews')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider){
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'MainCtrl',
            resolve: {
              postPromise: ['posts', function(posts) {
                return posts.getAll();
              }]
            }
          });

          $stateProvider.state('posts', {
            url: '/posts/{id}',
            templateUrl: 'templates/posts.html',
            controller: 'PostsCtrl',
            resolve: {
              post: ['$stateParams', 'posts', function($stateParams, posts) {
                return posts.get($stateParams.id);
              }]
            }
          });

          $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth', function($state, auth) {
              if(auth.isLoggedIn()) {
                $state.go('home');
              }
            }]
          });

          $stateProvider.state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth', function($state, auth) {
              if(auth.isLoggedIn()){
                $state.go('home');
              }
            }]
          });

          $urlRouterProvider.otherwise('home');
      }
]);











