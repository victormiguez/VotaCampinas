
Ranking.$inject = ["$http"];(function() {
'use strict';

/**
 * @name votaCampinas
 * @description Web App to Find Candidatos that Match with you
 * # Angular Module
 */
 
angular.module('votaCampinas', ['ngRoute', 'satellizer', 'angular-loading-bar'])
  .config(["$routeProvider", "$locationProvider", "$authProvider", "cfpLoadingBarProvider", function ($routeProvider, $locationProvider, $authProvider, cfpLoadingBarProvider) {
    skipIfAuthenticated.$inject = ["$location", "$auth"];
    loginRequired.$inject = ["$location", "$auth"];
    $locationProvider.html5Mode(true);

    cfpLoadingBarProvider.parentSelector = '.loading-bar-container';

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home/home.html'
      })
      .when('/home', {
        templateUrl: 'partials/home/home.html'
      })
      .when('/projeto', {
        templateUrl: 'partials/projeto/projeto.html'
      })
      .when('/como-funciona', {
        templateUrl: 'partials/comofunciona/como-funciona.html'
      })
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login/login.html',
        controller: 'loginController',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/ranking', {
        templateUrl: 'partials/ranking/ranking.html',
        controller: 'rankingController',
        resolve: { loginRequired: loginRequired }
      })
      .when('/cadastro', {
        templateUrl: 'partials/cadastro/cadastro.html',
        controller: 'cadastroController',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/prioridades', {
        templateUrl: 'partials/prioridades/prioridades.html',
        controller: 'prioridadesController',
        resolve: { loginRequired: loginRequired }
      })
      .when('/candidato/:id', {
        templateUrl: 'partials/candidato/candidato.html',
        controller: 'candidatoController',
        resolve: { loginRequired: loginRequired }
      })
      .when('/perguntas', {
        templateUrl: 'partials/perguntas/perguntas.html',
        controller: 'perguntasController',
        resolve: { loginRequired: loginRequired }
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/account', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/recuperar-senha', {
        templateUrl: 'partials/forgot.html',
        controller: 'ForgotCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/reset/:token', {
        templateUrl: 'partials/reset.html',
        controller: 'ResetCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';
    $authProvider.facebook({
      url: '/auth/facebook',
      clientId: '980220002068787',
      redirectUri: 'http://localhost:3000/auth/facebook/callback'
    });

    function skipIfAuthenticated ($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired ($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  }])
  .run(["$rootScope", "$window", function ($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  }]);
})();

angular.module('votaCampinas')
  .controller('ContactCtrl', ["$scope", "Contact", function($scope, Contact) {
    $scope.sendContactForm = function() {
      Contact.send($scope.contact)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };
  }]);

angular.module('votaCampinas')
  .controller('ForgotCtrl', ["$scope", "Account", function($scope, Account) {
    $scope.forgotPassword = function() {
      Account.forgotPassword($scope.user)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };
  }]);

angular.module('votaCampinas')
  .controller('HeaderCtrl', ["$scope", "$location", "$window", "$auth", function($scope, $location, $window, $auth) {
    $(".button-collapse").sideNav();

    $scope.closeNav = function() {
      $(".button-collapse").sideNav('hide');
    };
    
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    
    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.user;
      $location.path('/');
      $scope.closeNav();
    };
  }]);

angular.module('votaCampinas')
  .controller('LoginCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function($scope, $rootScope, $location, $window, $auth) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/prioridades');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
  }]);
angular.module('votaCampinas')
  .controller('ProfileCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", "Account", function($scope, $rootScope, $location, $window, $auth, Account) {
    $scope.profile = $rootScope.currentUser;

    $scope.updateProfile = function() {
      Account.updateProfile($scope.profile)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.changePassword = function() {
      Account.changePassword($scope.profile)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $window.scrollTo(0, 0);
          $scope.messages = {
            error: [response.data]
          };
        });
    };
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: [response.data]
          };
        });
    };

    $scope.deleteAccount = function() {
      Account.deleteAccount()
        .then(function() {
          $auth.logout();
          delete $window.localStorage.user;
          $location.path('/');
        })
        .catch(function(response) {
          $scope.messages = {
            error: [response.data]
          };
        });
    };
  }]);
angular.module('votaCampinas')
  .controller('ResetCtrl', ["$scope", "$location", "Account", function($scope, $location, Account) {
    
    var token = $location.$$path.split('reset/')[1];

    $scope.resetPassword = function() {
      Account.resetPassword($scope.user, token)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };

          $location.path('/login');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    }
  }]);

angular.module('votaCampinas')
  .controller('SignupCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function ($scope, $rootScope, $location, $window, $auth) {
    $scope.signup = function () {
      $auth.signup($scope.user)
        .then(function (response) {
          $auth.setToken(response);
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function (response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function (response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function (response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
  }]);

angular.module('votaCampinas')
  .factory('Account', ["$http", function($http) {
    return {
      updateProfile: function(data) {
        return $http.put('/account', data);
      },
      changePassword: function(data) {
        return $http.put('/account', data);
      },
      deleteAccount: function() {
        return $http.delete('/account');
      },
      forgotPassword: function(data) {
        return $http.post('/forgot', data);
      },
      resetPassword: function(data, token) {
        return $http.post('/reset/' + token, data);
      }
    };
  }]);
angular.module('votaCampinas')
  .factory('Contact', ["$http", function($http) {
    return {
      send: function(data) {
        return $http.post('/contact', data);
      }
    };
  }]);
(function () {
  'use strict';

  Partidos.$inject = ["$http"];
  angular
    .module('votaCampinas')
    .factory('Partidos', Partidos);

  function Partidos ($http) {
    return {
      obterTodos: obterTodos
    };

    function obterTodos () {
      return $http
        .get('/api/partidos')
        .then(obterTodosComplete);

      function obterTodosComplete (res) {
        return res.data;
      }
    }
  }
})();

(function () {
  'use strict';
  var app = angular.module('votaCampinas');
  var cadastroController = function ($scope, $rootScope, $location, $window, $auth, Partidos) {
    $scope.user = {};
    $scope.required = true;

    $scope.$watchCollection('user.ehVereador', function (ehVereador) {
      if (ehVereador && !$scope.partidos) {
        Partidos.obterTodos()
        .then(function (res) {
          $scope.partidos = res;
          $('select').material_select();
        })
        .catch(function (err) {
          console.error(err);
        });
      }
    });

    $scope.enviar = function () {
      $scope.user.gender = $('#sexo').val();
      $auth.signup($scope.user)
        .then(function (response) {
          $auth.setToken(response);
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/prioridades');
        })
        .catch(function (response) {
          window.scrollTo(0, 0);
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
         .finally(function() {
            $scope.cadastro.$setPristine();
        });
    };

    $scope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function (response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function (response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };

    $('#cnpj').mask('00.000.000/0000-00');
  };
  cadastroController.$inject = ["$scope", "$rootScope", "$location", "$window", "$auth", "Partidos"];

  app.controller('cadastroController', cadastroController);
}());

(function () {
  'use strict';

  var app = angular.module('votaCampinas');

  var candidatoController = function ($scope, $routeParams, candidatoFactory, perguntasFactory) {
    var candidatoId = $routeParams.id;

    $scope.possiveisRespostas = {
      1: 'Discordo',
      2: 'Concordo plenamente',
      3: 'Discordo plenamente',
      4: 'Concordo'
    };

    candidatoFactory.obterCandidato(candidatoId).then(function (candidato) { $scope.candidato = candidato.data; });
    candidatoFactory.obterRespostas(candidatoId).then(function (respostas) { $scope.candidato.respostas = respostas.data; });

    perguntasFactory.obterPerguntas().then(function (perguntas) { $scope.perguntas = perguntas.data; });
    perguntasFactory.obterRespostas().then(function (respostas) { $scope.respostasEleitor = respostas.data; });
  };
  candidatoController.$inject = ["$scope", "$routeParams", "candidatoFactory", "perguntasFactory"];

  app.controller('candidatoController', candidatoController);
}());

(function () {
  'use strict';

  var app = angular.module('votaCampinas');

  var candidatoFactory = function ($rootScope, $http) {
    return {
      obterCandidato: obterCandidato,
      obterRespostas: obterRespostas
    };

    function obterCandidato (candidatoId) {
      return $http.get('/api/candidato/' + candidatoId);
    }

    function obterRespostas (candidatoId) {
      return $http.get('/api/candidato/' + candidatoId + '/respostas');
    }
  };
  candidatoFactory.$inject = ["$rootScope", "$http"];

  app.factory('candidatoFactory', candidatoFactory);
})();

(function () {

  'use strict';

  var app = angular.module('votaCampinas');

  var loginController = function ($scope, $rootScope, $location, $window, $auth, Account) {
    $scope.enviar = function () {
      $auth.login($scope.user)
        .then(function (response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/prioridades');
        })
        .catch(function (response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
        .finally(function() {
            $scope.formLogin.$setPristine()
        });
      
    };

    $scope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function (response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function (response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };

  };
  loginController.$inject = ["$scope", "$rootScope", "$location", "$window", "$auth", "Account"];

  app.controller('loginController', loginController);

}());
(function () {
  'use strict';

  var app = angular.module('votaCampinas');

  var perguntasController = function ($rootScope, $scope, $timeout, $q, perguntasFactory) {
    $rootScope.pagina = 0;
    $scope.selecionadas = {};

    $q.all([
      perguntasFactory.obterRespostas(),
      perguntasFactory.obterPerguntas()
    ])
    .then(function (res) {
      $scope.respostas = res[0].data;
      $rootScope.pagina = res[0].data.length;
      $scope.perguntas = res[1].data;
      $scope.perguntas.map(function (pergunta, indice) {
        if ($scope.respostas[indice]) {
          $scope.perguntas[indice].resposta = $scope.respostas[indice].resposta;
        }
      });
    });

    $scope.next = function () {
      if ($rootScope.currentUser.ehVereador) {
        return false;
      }
      salvarResposta();
    };

    $scope.pular = function () {
      if ($rootScope.pagina < 15) {
        return false;
      }
      salvarResposta();
      $scope.enviando = true;
    };

    $scope.nextVereador = function (resposta) {
      if (!resposta) return false;
      $scope.enviando = true;
      salvarResposta();
    };

    function salvarResposta () {
      $scope.enviando = true;

      $timeout(function () {
        var pergunta = angular.copy($scope.perguntas[$rootScope.pagina]);
        perguntasFactory.salvarResposta(pergunta)
        .success(function () {
          ++$rootScope.pagina;
          $scope.enviando = false;
        });
      }, 700);
    }

    $scope.back = function () {
      --$rootScope.pagina;
    };
  };
  perguntasController.$inject = ["$rootScope", "$scope", "$timeout", "$q", "perguntasFactory"];

  app.controller('perguntasController', perguntasController);
}());

(function () {
  'use strict';

  var app = angular.module('votaCampinas');

  var perguntasFactory = function ($rootScope, $http) {
    return {
      obterPerguntas: obterPerguntas,
      salvarResposta: salvarResposta,
      obterRespostas: obterRespostas
    };

    function obterPerguntas () {
      return $http.get('/api/perguntas');
    }

    function salvarResposta (pergunta) {
      delete pergunta.pergunta;

      var obj = {
        usuarioId: $rootScope.currentUser.id,
        pergunta: pergunta
      };

      return $http.post('/api/respostas', obj);
    }

    function obterRespostas () {
      return $http.get('/api/respostas/');
    }
  };
  perguntasFactory.$inject = ["$rootScope", "$http"];

  app.factory('perguntasFactory', perguntasFactory);
})();

(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var prioridadesController = function ($rootScope, $scope, $timeout, $http, $location) {
    if (!$rootScope.currentUser) {
      return false;
    }

  	var inTransition = false;

    $scope.submitOk     = false;
  	$scope.pagina       = 1;
    $scope.respostas    = [];

    $scope.model = {
      id: '',
      prioridade: ''
    };

    $http.get('/api/prioridades/' + $rootScope.currentUser.id)
      .success(function (res) {
        if (res.length === 3) {
          $location.path('perguntas');
        }
      });

    $http.get('/api/prioridades')
      .success(function (suc) {
        $scope.opcoes = suc;
      })
      .error(function (err) {
        console.log(err);
      });

  	$scope.next = function(){
      $scope.enviando = true;
      $scope.returned = false;
  		if(!inTransition){
        var opcoes  = $scope.opcoes,
            opcao   = $scope.model.prioridade,
            op      = {};

        var idx = opcoes.map(function(i){
          if(i.id == opcao){ op = i; }
          return Number(i.id);
        }).indexOf(Number(opcao));

        if($scope.pagina >= 3 && !$scope.submitOk) {
          $scope.submitOk = true;
        } else if($scope.submitOk) {
          $scope.respostas.pop();
        } else{
          inTransition = true;
          $timeout(function(){
            opcoes.splice(idx, 1);
            opcao = '';
            $scope.pagina += 1;
            $('.opcoes').animate({left: '-400', opacity: 0}, 400).animate({left: '600'}, 400).animate({left: '0', opacity: 1}, 400);
            return inTransition = false;
          }, 500);

        }

        $scope.respostas.push(op);
        $scope.enviando = false;
      }
  	}

  	$scope.back = function(){
      if($scope.submitOk){
        $scope.respostas.pop();
        return $scope.submitOk = false;
      }

      var lastOption = $scope.respostas.pop();
      $scope.returned = true;
      $scope.opcoes.push(lastOption);
      $scope.pagina -= 1;
      $scope.model.prioridade = lastOption.id;
      $('.opcoes').animate({left: '500', opacity: 0}, 400).animate({left: '-400'}, 400).animate({left: '0', opacity: 1}, 400);
  	}

    $scope.submit = function(){
      $http.post('/api/prioridades', $scope.respostas)
      .success(function(suc){
        $location.path('/perguntas');
      })
      .error(function(err){
        console.log(err);
      })
      .finally(function() {
        $scope.formPrioridades.$setPristine();
      });
    }

  }
  prioridadesController.$inject = ["$rootScope", "$scope", "$timeout", "$http", "$location"];

  app.controller('prioridadesController', prioridadesController);

}());

(function () {
 'use strict';
  var app = angular.module('votaCampinas');

  var pontuacaoFilter = function () {
    return function (pontuacao) {
      var pontuacaoMaxima = 88;
      return Math.round(pontuacao * 100 / pontuacaoMaxima);
    };
  };

  app.filter('pontuacaoFilter', pontuacaoFilter);
}());

(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var rankingController = function ($scope, Ranking) {
    Ranking.obterMatches()
    .then(function (res) {
      $scope.candidatos = res;
    });

    (function(d, s, id) {
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) return;
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.7&appId=245108102541730";
     fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

     (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
      }(document, "script", "twitter-wjs"));
  };
  rankingController.$inject = ["$scope", "Ranking"];

  app.controller('rankingController', rankingController);

}());

angular
  .module('votaCampinas')
  .factory('Ranking', Ranking);

function Ranking ($http) {
  return {
    obterMatches: obterMatches
  };

  function obterMatches () {
    return $http
    .get('/api/ranking')
    .then(obterMatchesComplete)
    .catch(obterMatchesFailed);

    function obterMatchesComplete (res) {
      return res.data;
    }

    function obterMatchesFailed (err) {
      return err;
    }
  }
}

angular.module('votaCampinas')
  .filter('capitalize', function() {
    return function(input){
      input = input.replace(/[0-9]/g, '').toLowerCase().split(" ");
      input.pop(input.indexOf(''));
      input.pop(input.indexOf('-'));

      return input.map(function(e){
        return e.charAt(0).toUpperCase() + e.substr(1);
      }).join(' ');
    };
});
