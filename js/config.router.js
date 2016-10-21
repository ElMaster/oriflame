angular
    .module('oriflameApp')
    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
                console.log(error);
                if (error === "AUTH_REQUIRED") {
                    $state.go("admin");
                }
            });

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);


                if ($state.current.name == 'main.catalog') {
                    if (angular.element(window).width() >= 767) {
                        angular.element('body').css('overflow', 'hidden');
                        angular.element(window).resize(function () {
                            if (angular.element(window).width() >= 767) {
                                angular.element('body').css('overflow', 'hidden');
                            } else {
                                angular.element('body').css('overflow', 'inherit');
                            }
                        })
                    }
                } else {
                    angular.element('body').css('overflow', 'inherit');
                }

            });

        }
    ])
    .directive("sizeWatcher", function () {
        return {
            link: function ($scope, $element, $attributes) {
                var elem = angular.element(window).height();
                $element.css('height', (elem - 110) + 'px')
                angular.element(window).resize(function () {
                    elem = angular.element(window).height();
                    $element.css('height', (elem - 110) + 'px')
                });
            }
        };
    })
    .directive("elementThis", ["$cookies", function ($cookies) {
        return {
            link: function ($scope, $element, $attributes) {
                var now = new Date();
                var exp = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());

                $scope.commentSession = new Date().getTime();

                if ($cookies.get('commentCookies' + $attributes.type)) {
                    var session = new Date(parseInt($cookies.get('commentCookies' + $attributes.type)) + (1 * 24 * 60 * 60 * 1000));

                    if ($scope.commentSession > session.getTime()) {
                        $element.find('button').attr('disabled', false);
                    } else {
                        $element.find('button').attr('disabled', true);
                    }
                }
                $scope.commentsPlus = function (data) {
                    $cookies.put("commentCookies" + $attributes.type, $scope.commentSession, {expires: exp});
                    $element.find('button').attr('disabled', true);
                    $scope.comments.$save(data);
                }
            }
        };
    }])
    .factory('Db', function () {
            var ref = firebase.database().ref();
            return ref;
        }
    )
    .factory("Auth", ["$firebaseAuth",
        function ($firebaseAuth) {
            return $firebaseAuth();
        }
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$resourceProvider', '$sceProvider', '$cookiesProvider',
        function ($stateProvider, $urlRouterProvider, $resourceProvider, $sceProvider, $cookiesProvider) {
            $cookiesProvider.defaults.path = '/';
            $resourceProvider.defaults.actions.update = {
                method: 'PUT'
            };
            $sceProvider.enabled(false);
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('main', {
                    abstract: true,
                    templateUrl: 'views/common/layout.html'
                })
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'views/signin.html',
                    data: {
                        title: 'Авторизацния',
                        main: false,
                        urlPages: 'admin'
                    }

                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'views/register.html',
                    data: {
                        title: 'Регистрация',
                        main: false,
                        urlPages: 'admin'
                    }

                })
                .state('manager', {
                    url: '/manager',
                    templateUrl: 'views/manager.html',
                    data: {
                        title: 'Админка',
                        main: false,
                        urlPages: 'manager'
                    },
                    resolve: {
                        "currentAuth": ["Auth", function (Auth) {
                            return Auth.$requireSignIn();
                        }],
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    insertBefore: '#load_styles_before',
                                    files: [
                                        'bower_components/summernote/dist/summernote.css'
                                    ]
                                },
                                {

                                    files: [
                                        'bower_components/bootstrap/js/tooltip.js',
                                        'bower_components/bootstrap/js/dropdown.js',
                                        'bower_components/bootstrap/js/modal.js',
                                        'bower_components/summernote/dist/summernote.min.js'
                                    ]
                                },
                                {
                                    name: 'summernote',
                                    files: [
                                        'bower_components/angular-summernote/dist/angular-summernote.min.js'
                                    ]
                                },
                                {
                                    name: 'angularFileUpload',
                                    files: [
                                        'bower_components/angular-file-upload/dist/angular-file-upload.js',
                                        'js/directives/directives.js'
                                    ]
                                }]).then(function () {
                                return $ocLazyLoad.load('js/controllers/manager.js');
                            });
                        }]

                    }

                })
                .state('main.home', {
                    url: '/',
                    templateUrl: 'views/home.html',
                    data: {
                        title: 'Главная',
                        main: true,
                        urlPages: 'home'
                    }

                })
                .state('main.catalog', {
                    url: '/catalog',
                    templateUrl: 'views/catalog.html',

                    data: {
                        title: 'Каталог',
                        main: false,
                        urlPages: 'catalog'
                    }
                })
                .state('main.shares', {
                    url: '/shares',
                    abstract: true,
                    template: "<div class='nga-fast nga-stagger nga-slide-down' ui-view></div>"

                })
                .state('main.shares.list', {
                    url: '/list',
                    templateUrl: 'views/shares.list.html',

                    data: {
                        title: 'Акции, новости',
                        main: false,
                        urlPages: 'list'
                    }
                })
                .state('main.shares.detail', {
                    url: '/:url',
                    templateUrl: 'views/shares.detail.html',

                    data: {
                        title: 'Акция',
                        main: false,
                        urlPages: 'shares_detail'
                    }
                })
                .state('main.comment', {
                    url: '/comment',
                    templateUrl: 'views/comment.html',

                    data: {
                        title: 'Отзывы',
                        main: false,
                        urlPages: 'comment'
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'angularFileUpload',
                                    files: [
                                        'bower_components/angular-file-upload/dist/angular-file-upload.js',
                                        'js/directives/directives.js'
                                    ]
                                }]);
                        }]

                    }
                })
                .state('main.contacts', {
                    url: '/contacts',
                    templateUrl: 'views/contacts.html',
                    data: {
                        title: 'Контакты',
                        main: false,
                        urlPages: 'contacts'
                    }

                })
        }
    ]);
