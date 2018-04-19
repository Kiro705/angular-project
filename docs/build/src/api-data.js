angular
    // Injecting into our app module
    .module('docs')

    // Creating an Angular constant and rendering a list of items as JSON
    .constant('API_DATA', [
  {
    "name": "ngClassifieds",
    "stateName": "ngClassifieds",
    "type": "module",
    "outputPath": "partials/api/ngClassifieds.html",
    "url": "api/ngClassifieds",
    "docs": [
      {
        "name": "classifiedCard",
        "stateName": "classifiedCard",
        "type": "directive",
        "outputPath": "partials/api/ngClassifieds/directive/classifiedCard.html",
        "url": "api/ngClassifieds/directive/classifiedCard"
      },
      {
        "name": "classifiedsCtrl",
        "stateName": "classifiedsCtrl",
        "type": "type",
        "outputPath": "partials/api/ngClassifieds/type/classifiedsCtrl.html",
        "url": "api/ngClassifieds/type/classifiedsCtrl"
      },
      {
        "name": "classifiedsFactory",
        "stateName": "classifiedsFactory",
        "type": "service",
        "outputPath": "partials/api/ngClassifieds/service/classifiedsFactory.html",
        "url": "api/ngClassifieds/service/classifiedsFactory"
      },
      {
        "name": "editClassifiedsCtrl",
        "stateName": "editClassifiedsCtrl",
        "type": "type",
        "outputPath": "partials/api/ngClassifieds/type/editClassifiedsCtrl.html",
        "url": "api/ngClassifieds/type/editClassifiedsCtrl"
      },
      {
        "name": "newClassifiedsCtrl",
        "stateName": "newClassifiedsCtrl",
        "type": "type",
        "outputPath": "partials/api/ngClassifieds/type/newClassifiedsCtrl.html",
        "url": "api/ngClassifieds/type/newClassifiedsCtrl"
      }
    ]
  }
]);