describe('', function(){
  var $scope, $rootScope;
  var $controller;
  var $httpBackend;
  var $http;
  var posts;
  beforeEach(function() {
    //angular.mock.module('flapperNews');
    module('flapperNews');
    module(function($provide){
      $provide.value('posts', {
        posts: [{id: '34kd34', title: 'great link', upvotes: 5}, {id: '1454', title: 'nobody cares', upvotes: 0}],
        upvote: function(post){
          post.upvotes += 1;
        }
      });
    });

    inject(function(_posts_){
      posts = _posts_.posts;
    });

    inject(function(_$http_){
        $http = _$http_;
    });

    inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', 'http://localhost/httptest').respond(200, {name: 'rudy'}); // respond 200 status: alles ok
      $httpBackend.when('GET', /\/posts\/.+/).respond(function(method, url, data, headers){
        var args = url.match(/\/posts\/(.+)/);
        for (i in posts) {
          if (posts[i].id === args[1]) {
            return [200, {post: posts[i]}];
          }
        }
      //  return [200, {id: args[1]}]; stond er voor for lus
        return [400, {} ];
      });
    });

    inject(function(_$rootScope_){
      $scope = _$rootScope_.$new();
      $rootScope = _$rootScope_;
    });

    inject(function(_$controller_){
      $controller = _$controller_;
    });
  });

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('', function(){
    var ctrl = $controller('MainCtrl', {$scope: $scope}); //controller aanmaken en zelf scope meegeven

    var post = {title: 'test', upvotes: 4};
    $scope.incrementUpvotes(post);
    expect(post.upvotes).toBe(5);

    $http.get('http://localhost/httptest').success(function(data, status, headers, config){
      $scope.valid = true;
      $scope.name = data.name;
    });

    $http.get('/posts/34kd34').success(function(data, satus, headers, config) {
      //$scope.postid = data.id;;
      $scope.post = data.post
    })

    $httpBackend.flush(); //synchroon call beetje faken
    expect($scope.name).toEqual('rudy');
    expect($scope.post.id).toEqual('34kd34');
    expect($scope.post.title).toEqual('great link');
  });
});
