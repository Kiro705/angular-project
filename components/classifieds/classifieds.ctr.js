(function(){
    'use strict';

    /**
     * @ngdoc type
     * @module classifieds.ctr
     * @name classifiedsCtrl
     * @description Classifieds controller
     */

    angular
    .module('ngClassifieds')
    .controller('classifiedsCtrl', function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
        const vm = this
        const db = firebase.firestore()

        vm.openSidebar = openSidebar
        vm.saveClassified = saveClassified
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

        /**
         * @ngdoc method
         * @name classifiedsCtrl#openSidebar
         * @description opens the sidebar by routing to #/classifieds/new
         */
        function openSidebar(){
          $state.go('classifieds.new')
        }

        /**
         * @ngdoc method
         * @name classifiedsCtrl#saveClassified
         * @param {object} newClassified Saves the classified in local vm.classifieds and shows toast to confirm.
         */
        function saveClassified(newClassified){
          if(newClassified){
            newClassified.contact = contact
            vm.classifieds.unshift(newClassified)
            vm.closeSidebar()
            vm.newClassified = null
            showToast('Listing Saved!')
          }
        }

        /**
         * @ngdoc method
         * @name classifiedsCtrl#showToast
         * @param {string} message Shows a toast with the message.
         */
        function showToast(message){
          $mdToast.show(
            $mdToast.simple()
              .content(message)
              .position('top, right')
              .hideDelay(3500)
          )
        }

        /**
         * @ngdoc method
         * @name classifiedsCtrl#getCategories
         * @param {array} classifieds Recieves an array of classifieds with nested categories.
         * @return {array} Returns an array of all unique categories.
         */
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