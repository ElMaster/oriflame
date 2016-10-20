'use strict';

function managerCtrl($scope, $state, $stateParams, Auth, $firebaseArray, FileUploader, Db) {
    $scope.shares = {};
    $scope.shares.date = new Date();
    $scope.options = {
        height: 200
    }


    $scope.getShares = $firebaseArray(Db.child('article'));
    $scope.comments = $firebaseArray(Db.child('comments'));

    
    var uploader = $scope.uploader = new FileUploader({
        url: 'upload.php',
        removeAfterUpload: true

    });
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });


    $scope.sharesFn = function (data) {
        data.date = data.date.getTime();
        // data.textRich = $('#some-textarea').val();
        $scope.getShares.$add(data);
        $scope.uploader.uploadAll();
        $scope.shares = {};
        // $('#some-textarea').val();
    }


    $scope.idNull = false;



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
    .controller('managerCtrl', ['$scope', '$state', '$stateParams','Auth', '$firebaseArray', 'FileUploader','Db', managerCtrl]);
