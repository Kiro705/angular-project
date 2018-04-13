(function(){
    'use strict';

    angular.module('ngClassifieds')
        .controller('editClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout){
            const vm = this
            vm.closeSidebar = closeSidebar
            vm.saveEdit = saveEdit
            vm.classified = $state.params.classified

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

            function saveEdit(editedClassified){
                    $scope.$emit('savingClassified', editedClassified)
                    vm.sidenavOpen = false
            }
        })
})()