(function () {
    'use strict';

    angular
        .module('flapperNews')
        .controller('PostsCtrl', PostCtrl);

    PostCtrl.$inject = [
        '$stateParams',
        'posts',
        'comments',
        'auth'
    ]


    function PostCtrl($scope, posts, comments, auth) {


        var vm = this;
        vm.post = {};
        vm.addComment = addComment;
        vm.upvote = upvote;
        vm.delete = deleteComment;

        init();

        function init() {
            return getPost();
        }

        function getPost() {
            return posts.get($stateParams.id).then(function (data) {
                vm.post = data;
                return vm.post;
            }, error);

            function addComment() {

                comments.add(vm.post._id, {
                    body: vm.body
                }).then(function (res) {
                    vm.post.comments.push(res.data);
                    vm.body = '';
                    vm.hideModal();
                }, error);
            }

            function upvote(comment) {
                comments.upvote(comment).then(function (res) {
                    comment.upvotes = res.data.upvotes;
                }, error);
            }

            function deleteComment(id) {
                comments.delete(id).then(function (res) {
                    if (res.data.success) {
                        init();
                    } else {
                        error();
                    }
                }, error);
            }

            function error() {
                alert('Something went wrong');
            }
        }
    }

})();