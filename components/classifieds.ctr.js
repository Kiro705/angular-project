(function(){
    'use strict';

    angular
    .module('ngClassifieds')
    .controller('classifiedsCtrl', function($scope, $http, classifiedsFactory, $mdSidenav){
        classifiedsFactory.getClassifieds()
        .then(function(classifieds){
          $scope.classifieds = classifieds.data
        })

        const contact = {
          name: 'Jackson',
          phone: '(123) 456-7890',
          email: 'email@gmail.com'
        }

        $scope.openSidebar = function(){
          $mdSidenav('left').open()
        }

        $scope.closeSidebar = function(){
          $mdSidenav('left').close()
        }

        $scope.saveClassified = function(newClassified){
          if(newClassified){
            newClassified.contact = contact
            $scope.classifieds.unshift(newClassified)
            $mdSidenav('left').close()
            $scope.newClassified = null
          }
        }
    })
})();