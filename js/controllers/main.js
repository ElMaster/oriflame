'use strict';
// $firebaseArray, $firebaseObject,
function mainCtrl($scope, $http, $state, $timeout) {
    // var ref = firebase.database().ref().child('pages');
    // $scope.saveItems = $firebaseObject(ref.child('catalog'));
    // $scope.pageItems =  Pages.get({url: $state.current.data.urlPages});
    //
    // $scope.pagesUpdate = function (dataUpdate) {
    //     Pages.update({url: $state.current.data.urlPages}, dataUpdate)
    // }


    // $timeout(function () {
    //     if (!$().carouFredSel) {
    //         return;
    //     }
    //
    //     $('#block-shares-carusel').carouFredSel({
    //         width	: "100%",
    //         scroll	: 1
    //     });
    //     }, 0);






    // $scope.pageItems2 =  Message.get({name:"roman"}, function (data) {
    //
    // });


    // $scope.pageItems = Pages.get({id: 'feffd17f0e452a1c'},function(response) {
    //     console.log(response);
    // }, function(error) {
    //     alert(error);
    // })
    //
     
    // Pages.update(
    //     { "alanisawesome2": {"name": "Alan Turing222","birthday": "June 23, 1912"}
    // }, function(todo) {
    //     // Do something
    // }, function(error) {
    //     alert(error);
    // });
     // $scope.tt = $firebaseArray(ref.child('catalog'));
    // $scope.pageItems = Pages.query();
    // Pages.get({}, function (data) {
    //     $scope.page = data;
    //     console.log($scope.page);
    // });

    // Pages.get({}, function (data) {
    //     data.name = 'main';
    //     data.title = 'text';
    //
    //     data.$save()
    // });


    // $scope.tt.$save({title:'catalog', description:'text3'})

    // pageIt.$save();
    // console.log();


    console.log('контролер главной страницы');

    // console.log($state.current.name)
}

angular
    .module('oriflameApp')
    .controller('mainCtrl', ['$scope','$http','$state','$timeout', mainCtrl]);
