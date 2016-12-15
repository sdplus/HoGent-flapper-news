angular.module('flapperNews')
    .controller('MainCtrl', [
        '$scope',
        'posts',
        'auth',
        function($scope, posts, auth){
            $scope.posts = posts.posts;
            $scope.isLoggedIn = auth.isLoggedIn;

            $scope.addPost = function(){
                if(!$scope.title || $scope.title === ''){return;}
                posts.create({
                    title: $scope.title,
                    link: $scope.link
                });
                /*  vervangen door posts.create na o.create in service zodat posts opgeslagen worden to the server
                 $scope.posts.push({
                 title: $scope.title,
                 link: $scope.link,
                 upvotes: 0,
                 comments: [
                 {author: 'Joe', body: 'Cool post', upvotes: 0},
                 {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                 ]
                 });
                 */
                $scope.title = '';
                $scope.link = '';
            };

            $scope.incrementUpvotes = function(post){
                posts.upvote(post);
            };
        }
]);
