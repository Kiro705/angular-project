/**
 *
 * @ngdoc module
 * @name ngClassifieds
 *
 * @requires ui.router 
 * @requires ngMaterial
 *
 * @description
 *
 * This is the Classifieds main module. It includes all of our components for the app.
 *
 **/
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
            .state('classifieds.new', {
                url: '/new',
                templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
                controller: 'newClassifiedsCtrl as vm',
            })
            .state('classifieds.edit', {
                url: '/edit/:id',
                templateUrl: 'components/classifieds/edit/classifieds.edit.tpl.html',
                controller: 'editClassifiedsCtrl as vm',
                params: {
                    classified: null
                }
            })
    })