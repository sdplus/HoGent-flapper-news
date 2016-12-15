(function () {
    'use strict';

    angular
        .module('flapperNews')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = [
        'posts',
        'auth'
    ];


    function MainCtrl(posts, auth) {

        var vm = this;
        vm.posts = [];
        vm.addPost = addPost;
        vm.incrementUpvotes = incrementUpvotes;
        vm.delete = deletePost;

        init();

        function init() {
            postsService
                .getAll()
                .then(function successCallback(serviceResponse) {
                    vm.posts = serviceResponse.data;
                }, processError);
        }

        function addPost() {
            posts.create({
                title: vm.title,
                link: vm.link
            }).then(function (res) {
                vm.posts.push(res.data);
                vm.title = '';
                vm.link = '';
            }, error);
        }

        function incrementUpvotes(post) {
            posts.upvote(post).then(function () {
                post.upvotes++;
            }, error);
        }

        function deletePost(id) {
            posts.delete(id).then(function (res) {
                if (res.data.success) {
                    init();
                } else {
                    error;
                }

            }, error);
        }

        function error() {
            alert('Something went wrong');
        }
    }

})();
