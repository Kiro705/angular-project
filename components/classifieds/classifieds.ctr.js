(function(){
    'use strict';

    angular
    .module('ngClassifieds')
    .controller('classifiedsCtrl', function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
        const vm = this
        const db = firebase.firestore()

        vm.openSidebar = openSidebar
        vm.saveClassified = saveClassified
        vm.editClassified = editClassified
        vm.deleteClassified = deleteClassified

        vm.classifieds = classifiedsFactory.classifiedsList
        vm.categories
        vm.newClassified
        vm.editing

        $scope.$watch('vm.classifieds.length', function(length){
          if(length > 0){
            console.log(vm.classifieds)
            vm.categories = getCategories(vm.classifieds)
          }
        })

        $scope.$on('newClassified', function(event, classified){
          classified.id = vm.classifieds.length + 1
          db.collection('classifieds').add(classified)
          .then(() => {
            vm.classifieds.unshift(classified)
            showToast('Listing for ' + classified.title + ' successfully saved!');
          })
          .catch(error => {
            showToast('Error saving ' + classified.title + ': ' + error);
          })
        })

        $scope.$on('savingClassified', function(event, editedClassified){
          //Removes $$hashKey to avoid duplicates in database
          delete editedClassified.$$hashKey
          db.collection('classifieds').where('id', '==', editedClassified.id)
            .get().then((data) => {
              data.forEach(singleClassified => {
                db.collection('classifieds').doc(singleClassified.id).update(editedClassified)
                  .then(() => showToast(editedClassified.title + ' successfully edited!'))
                  .catch((error) => {
                    showToast('Editing error, check console.')
                    console.error(error)
                  })
              })
            })
        })

        function openSidebar(){
          $state.go('classifieds.new')
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
          $state.go('classifieds.edit', {id: classifiedForEditing.id, classified: classifiedForEditing})
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
            db.collection('classifieds').where('id', '==', targetClassified.id)
            .get().then((data) => {
              data.forEach(singleClassified => {
                db.collection('classifieds').doc(singleClassified.id).delete()
                  .then(() => showToast(targetClassified.title + ' successfully deleted!'))
                  .catch((error) => {
                    showToast('Error deleting ' + targetClassified.title)
                    console.error(error)
                  })
              })
            })
          }, function() {
            showToast(targetClassified.title + ' was not deleted!')
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