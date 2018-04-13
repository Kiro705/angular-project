(function() {
    "use strict";

    angular.module('ngClassifieds')
    .factory('classifiedsFactory', function($http) {
        
        // Initialize Cloud Firestore through Firebase
        const db = firebase.firestore()
        let classifiedsList = []

        db.collection('classifieds').get()
        .then(classifieds => {
            classifieds.forEach(classified => {
                let temp = classified.data()
                classifiedsList.push(temp)
            })
        })
        .then(() => {
            return {classifiedsList}
        })
        .catch(function(error) {
            return {classifiedsList: ('Error getting documents:', error)}
        })

        return {classifiedsList}
    })
})()