'use strict';

function sharesListCtrl($scope, $firebaseArray, Db) {


    $scope.getShares = $firebaseArray(Db.child('article')) ;


    // Пагитация

    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;

    };


    $scope.pageChanged = function() {};
    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
}

angular
    .module('oriflameApp')
    .controller('sharesListCtrl', ['$scope','$firebaseArray','Db', sharesListCtrl]);
