angular.module('flapperNews')
    .controller('PostsCtrl', [
        '$scope',
        //'$stateParams',
        'posts',
        'post',
        'auth',
        function($scope, /*$stateParams,*/ posts, post, auth){
            //$scope.post = posts.posts[$stateParams.id];
            $scope.post = post;
            $scope.isLoggedIn = auth.isLoggedIn;

            $scope.addComment = function(){
                if ($scope.body === ''){return;}
                posts.addComment(post._id, {
                    body: $scope.body,
                    author: 'user'
                }).success(function(comment) {
                    $scope.post.comments.push(comment);
                });


                /* vervangen door posts.addComment na het toevoegen in de service
                 $scope.post.comments.push({
                 body: $scope.body,
                 author: 'user',
                 upvotes: 0
                 });
                 */
                $scope.body = '';
            };

            $scope.incrementUpvotes = function(comment){
                posts.upvoteComment(post, comment);
            };
        }
]);