'use strict';

function commentsListCtrl($scope, $state, $stateParams, $firebaseArray, FileUploader, Db, $timeout) {
    $scope.comment = {};
    $scope.sacsesfull = null;
    $scope.comment.moderator = false;
    $scope.comment.rating = 0;
    $scope.comment.date = new Date().getTime();
    $scope.comment.files = 'user_2.jpg';
   


    


    $scope.comments = $firebaseArray(Db.child('comments'));
    var uploader = $scope.uploader = new FileUploader({
        url: 'upload_c.php',
        removeAfterUpload: true

    });


    $scope.commentsFn = function (data) {
        $timeout (function () {
            $scope.comments.$add(data).then(function () {
                $scope.sacsesfull = "Спасибо, Ваш коментарий добавлен на модерацию"
            });
        },400)

        $scope.uploader.uploadAll();
        $scope.comment = {};
    };

   

}

angular
    .module('oriflameApp')
    .controller('commentsListCtrl', ['$scope', '$state', '$stateParams', '$firebaseArray', 'FileUploader', 'Db','$timeout', commentsListCtrl]);
