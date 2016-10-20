'use strict';

angular
    .module('oriflameApp')
    .controller('AppCtrl', ['$scope','$http','Auth','$firebaseArray','Db',
        function AppCtrl($scope, $http, Auth, $firebaseArray, Db) {
            console.log('главный контролер');
            $scope.app = {
                name: 'Roman',
                author: "roman",
                layout: {
                    isMobileNav: false

                }
            }

           
            
            $scope.auth = Auth;
            $scope.auth.$onAuthStateChanged(function(firebaseUser) {
                $scope.firebaseUser = firebaseUser;
            });
            $scope.getShares = $firebaseArray(Db.child('article').limitToFirst(4)) ;
            $scope.comments = $firebaseArray(Db.child('comments').limitToFirst(3));
        }
    ]);

