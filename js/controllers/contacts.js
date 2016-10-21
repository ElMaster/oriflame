'use strict';

function contactsCtrl($scope, $stateParams, $http) {
    $scope.register = {}
    $scope.method = 'POST';
    $scope.url = 'http://formspree.io/roman.kosjk@gmail.com';

    $scope.register._cc = 'roma.kosyack@yandex.ua';
    // $scope.register._format = 'plain';
    // $scope.dataForm = function (data2) {
    //     console.log(data2.username)
    // }
    $scope.registerFn = function (data) {
        var dataForm = {
            'Ф.И.О. (полностью):': data.username,
            'Адрес эл.почты:': data.email,
            'Серия и номер паспорта:': data.passport,
            'Дата рождения:': data.data,
            'Индекс:': data.indexing,
            'Адрес фактического проживания:': data.address,
            'Сотовый телефон:': data.phones,
            'Цель регистрации первая?:': data.register1,
            'Цель регистрации вторая?:': data.register2,
            'Цель регистрации третя?:': data.register3,


            'Вы являетесь действующим консультантом:': data.opros,
            'Вопрос перед регистрацией:': data.message,
            '_gotcha': data._gotcha,
            '_cc': $scope.register._cc,
            '_subject': 'Регистрация из сайта Орифлейм'

        }
        $http({
            method: $scope.method,
            url: $scope.url,
            data: dataForm
        }).then(function successCallback(response) {
            $scope.status = response.status;
            $scope.data = response.data;
            $scope.register = {};

        }, function errorCallback(response) {
            $scope.status = response.status;
        });
    }
}

angular
    .module('oriflameApp')
    .controller('contactsCtrl', ['$scope', '$stateParams', '$http', contactsCtrl]);
