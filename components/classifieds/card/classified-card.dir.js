(function() {

    'use strict';

    angular.module('ngClassifieds')
        .directive('classifiedCard', function() {
            return {
                templateUrl: 'components/classifieds/card/classified-card.tpl.html',
                scope: {
                    //classifieds: '=classifieds'
                    classifieds: '=',
                    classifiedsFilter: '=',
                    category: '=',
                },
                controller: classifiedCardController,
                controllerAs: 'vm'
            }

            function classifiedCardController($state, $scope, $mdDialog, $mdToast) {
                const vm = this
                const db = firebase.firestore()
                vm.editClassified = editClassified
                vm.deleteClassified = deleteClassified
                vm.showToast = showToast


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
                      const index = $scope.classifieds.indexOf(targetClassified)
                      $scope.classifieds.splice(index, 1)
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

            }
        })
})()