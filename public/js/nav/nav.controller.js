(function () {
    'use strict';

    angular
        .module('flapperNews')
        .controller('NavCtrl', NavCtrl);

    NavCtrl.$inject = [
        'auth'
    ];


    function NavCtrl(auth) {

        var vm = this;
        vm.title = 'NavCtrl';

        vm.isLoggedIn = auth.isLoggedIn;
        vm.currentUser = auth.currentUser;
        vm.logOut = auth.logOut;
    }

})();