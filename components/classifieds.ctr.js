(function(){
    'use strict';

    angular
    .module('ngClassifieds')
    .controller('classifiedsCtrl', function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
        const vm = this

        vm.openSidebar = openSidebar
        vm.closeSidebar = closeSidebar
        vm.saveClassified = saveClassified
        vm.editClassified = editClassified
        vm.saveEdit = saveEdit
        vm.deleteClassified = deleteClassified

        vm.classifieds
        vm.categories
        vm.newClassified
        vm.editing

        classifiedsFactory.getClassifieds()
        .then(function(classifieds){
          vm.classifieds = classifieds.data
          vm.categories = getCategories(vm.classifieds)
        })

        const contact = {
          name: 'Jackson',
          phone: '(123) 456-7890',
          email: 'email@gmail.com'
        }

        function openSidebar(){
          $mdSidenav('left').open()
        }

        function closeSidebar(){
          $mdSidenav('left').close()
        }

        function saveClassified(newClassified){
          console.log(newClassified)
          if(newClassified){
            newClassified.contact = contact
            vm.classifieds.unshift(newClassified)
            vm.closeSidebar()
            vm.newClassified = null
            showToast('Listing Saved!')
          }
        }

        function editClassified(classifiedForEditing) {
          vm.editing = true
          vm.openSidebar()
          vm.newClassified = classifiedForEditing
        }

        function saveEdit() {
          vm.editing = false
          vm.newClassified = null
          vm.closeSidebar()
          showToast('Listing Edited!')
        }

        function deleteClassified(event, targetClassified) {
          const confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete ' + targetClassified.title + '?')
            .ok('Yes')
            .cancel('No')
            .targetEvent(event) 
          $mdDialog.show(confirm).then(function(){
            const index = vm.classifieds.indexOf(targetClassified)
            vm.classifieds.splice(index, 1)
          }, function() {

          })
        }

        function showToast(message){
          $mdToast.show(
            $mdToast.simple()
              .content(message)
              .position('top, right')
              .hideDelay(3500)
          )
        }

        function getCategories(classifieds){
          const categories = []
          angular.forEach(classifieds, function(item){
            angular.forEach(item.categories, function(category){
              categories.push(category)
            })
          })
          return _.uniq(categories)
        }

    })
})();