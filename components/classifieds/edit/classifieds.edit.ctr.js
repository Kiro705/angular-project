(function(){
    'use strict';

    /**
     * @ngdoc type
     * @module ngClassifieds
     * @name editClassifiedsCtrl
     * @description Classifieds controller for editing already existing classifieds.
     * 
     */
    angular.module('ngClassifieds')
        .controller('editClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout){
            const vm = this
            vm.closeSidebar = closeSidebar
            vm.saveEdit = saveEdit
            vm.classified = $state.params.classified

            $timeout(function(){
                $mdSidenav('left').open()
            })
            
            /**
             * @ngdoc property
             * @name editClassifiedsCtrl#sidenavOpen$watch
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
             * @name editClassifiedsCtrl#closeSidebar
             * @description sets vm.sidenavOpen to equal false.
             */
            function closeSidebar(){
                vm.sidenavOpen = false
            }

            /**
             * @ngdoc method
             * @name editClassifiedsCtrl#saveEdit
             * @param {Object} editedClassified The edited classified
             * @description emits the classified to the parent controller to be saved.
             */
            function saveEdit(editedClassified){
                    $scope.$emit('savingClassified', editedClassified)
                    vm.sidenavOpen = false
            }
        })
})()