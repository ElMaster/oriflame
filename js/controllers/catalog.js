'use strict';

function catalogCtrl($scope, $state) {
    console.log('контролер каталога');
    // console.log($state.current.data.title)
   
    
}

angular
    .module('oriflameApp')
    .controller('catalogCtrl', ['$scope','$state', catalogCtrl]);
