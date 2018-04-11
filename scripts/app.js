angular.module('ngClassifieds', ["ngMaterial"])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('orange')
    })
    .directive('helloWorld', function(){
        return {
            template: '<h1>Hello, world!!!</h1>'
        }
    })