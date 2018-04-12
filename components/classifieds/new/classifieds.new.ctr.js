(function(){
    'use strict';

    angular.module('ngClassifieds')
        .controller('newClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory){
            const vm = this
            vm.closeSidebar = closeSidebar
            vm.saveClassified = saveClassified

            $timeout(function(){
                $mdSidenav('left').open()
            })
            
            $scope.$watch('vm.sidenavOpen', function(isOpen){
                if(isOpen === false){
                    $mdSidenav('left').close()
                        .then(function(){
                            $state.go('classifieds')
                        })
                }
            })

            function closeSidebar(){
                vm.sidenavOpen = false
            }

            function saveClassified(classified){
                if(classified){
                    classified.contact = {
                        name: 'Jackson',
                        phone: '(123) 456-7890',
                        email: 'email@gmail.com'
                      }
                    $scope.$emit('newClassified', classified)
                    vm.sidenavOpen = false
                }
            }
        })
})()