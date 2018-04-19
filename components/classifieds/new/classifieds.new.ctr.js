(function(){
    'use strict';

    /**
     * @ngdoc type
     * @module ngClassifieds
     * @name newClassifiedsCtrl
     * @description Classifieds controller for making new classifieds.
     * 
     */
    angular.module('ngClassifieds')
        .controller('newClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory){
            const vm = this
            vm.closeSidebar = closeSidebar
            vm.saveClassified = saveClassified

            $timeout(function(){
                $mdSidenav('left').open()
            })
            

            /**
             * @ngdoc property
             * @name newClassifiedsCtrl#sidenavOpen$watch
             * @description Watches for vm.sidenavOpen to be closed, then navigates to /classifieds
             */
            $scope.$watch('vm.sidenavOpen', function(isOpen){
                if(isOpen === false){
                    $mdSidenav('left').close()
                        .then(function(){
                            $state.go('classifieds')
                        })
                }
            })

            /**
             * @ngdoc method
             * @name newClassifiedsCtrl#closeSidebar
             * @description sets vm.sidenavOpen to equal false.
             */
            function closeSidebar(){
                vm.sidenavOpen = false
            }

            /**
             * @ngdoc method
             * @name newClassifiedsCtrl#saveClassified
             * @param {Object} classified The new classified
             * @description adds a default contact to a classified then emits the classified to the parent to be saved.
             */
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