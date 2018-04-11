(function(){
    'use strict';

    angular
    .module('ngClassifieds')
    .controller('classifiedsCtrl', function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
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
            $scope.closeSidebar()
            $scope.newClassified = null
            showToast('Listing Saved!')
          }
        }

        $scope.editClassified = function(classifiedForEditing) {
          $scope.editing = true
          $scope.openSidebar()
          $scope.newClassified = classifiedForEditing
        }

        $scope.saveEdit = function() {
          $scope.editing = false
          $scope.newClassified = null
          $scope.closeSidebar()
          showToast('Listing Edited!')
        }

        $scope.deleteClassified = function(event, targetClassified) {
          const confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete ' + targetClassified.title + '?')
            .ok('Yes')
            .cancel('No')
            .targetEvent(event) 
          $mdDialog.show(confirm).then(function(){
            const index = $scope.classifieds.indexOf(targetClassified)
            $scope.classifieds.splice(index, 1)
          }, function() {

          })
        }

        function showToast(message){
          $mdToast.show(
            $mdToast.simple()
              .content(message)
              .position('top, right')
              .hideDelay(35000)
          )
        }
    })
})();