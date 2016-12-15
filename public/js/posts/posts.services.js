a(function () {
    'use strict';

    angular
        .module('flapperNews')
        .factory('posts', posts);

    posts.$inject = [
        '$http',
        'auth'
    ];

    function posts($http, auth) {
        var postsResponse = {
            getAll: getAll,
            create: create,
            upvote: upvote,
            get: get,
            posts: [],
            delete: deletePost
        };

        o.getAll = function () {
            return $http.get('/posts').success(function (data) {
                angular.copy(data, o.posts);
            });
        };

        function create() {
            return $http.post('/posts', post, {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            })
        }

        function upvote(post) {
            return $http.put('/posts/' + post._id + '/upvote', null, {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            })
        }

        function get(id) {
            return $http.get('/posts/' + id).then(function (res) {
                return res.data;
            });
        }

        function addComment(id, comment) {
            return $http.post('/posts/' + id + '/comments', comment, {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            });
        }

        function upvote(post, comment) {
            return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            })
        }

        function deletePost(id) {
            return $http.delete('/posts/' + id, {
                headers: {
                    Authorization: 'Bearer ' + auth.getToken()
                }
            });
        }

        return postsResponse;
    }
})();