angular
    // Injecting into our app module
    .module('docs')

    // Creating an Angular constant and rendering a list of items as JSON
    .constant('GUIDE_DATA', [
  {
    "name": "Overview",
    "type": "content",
    "outputPath": "partials/guide.html",
    "url": "guide"
  },
  {
    "name": "How To",
    "type": "content",
    "outputPath": "partials/guide/howTo.html",
    "url": "guide/howTo"
  }
]);