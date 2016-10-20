'use strict';

function sharesDetailCtrl($scope, $stateParams, $firebaseArray, Db) {
    
    $scope.getShares = $firebaseArray(Db.child('article').orderByChild("url").equalTo($stateParams.url));
  
}

angular
    .module('oriflameApp')
    .controller('sharesDetailCtrl', ['$scope','$stateParams','$firebaseArray','Db', sharesDetailCtrl]);
