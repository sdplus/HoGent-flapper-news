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
        vm.getUserName = auth.getUserName;
        vm.logOut = auth.logOut;
    }

})();
