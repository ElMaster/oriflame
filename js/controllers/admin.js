

function sessionCtrl($scope, $state, Auth) {
   
    $scope.signIn = function() {
        $scope.firebaseUser = null;
        $scope.error = null;

        Auth.$signInWithEmailAndPassword($scope.email, $scope.password)
            .then(function(firebaseUser) {
                $state.go('manager')
            }).catch(function(error) {
            $scope.error = error;
        });
    };
    $scope.createUser = function() {
        $scope.message = null;
        $scope.error = null;

        // Create a new user
        Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
            .then(function (firebaseUser) {
                $state.go('manager')

            }).catch(function (error) {

            $scope.error = error;
        });
    };
    
    $scope.auth = Auth;
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;

    });
}

angular
    .module('oriflameApp')
    .controller('sessionCtrl', ['$scope', '$state','Auth', sessionCtrl]);
