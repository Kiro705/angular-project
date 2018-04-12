angular.module('ngClassifieds', ['ngMaterial', 'ui.router'])
    .config(function($mdThemingProvider, $stateProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('orange')

        $stateProvider
            .state('classifieds', {
                url: '/classifieds',
                templateUrl: 'components/classifieds/classifieds.tpl.html',
                controller: 'classifiedsCtrl as vm',
            })
    })