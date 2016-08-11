angular.module('votaCampinas').run(['$templateCache', function($templateCache) {$templateCache.put('partials/404.html','<div class="container text-center">\n  <h1>404</h1>\n  <p>Page Not Found</p>\n</div>');
$templateCache.put('partials/contact.html','<div class="container">\n  <h3>Contact Form</h3>\n  <div ng-if="messages.error" role="alert" class="text-danger">\n    <div ng-repeat="error in messages.error">{{error.msg}}</div>\n  </div>\n  <div ng-if="messages.success" role="alert" class="text-success">\n    <div ng-repeat="success in messages.success">{{success.msg}}</div>\n  </div>\n  <form ng-submit="sendContactForm()">\n    <label for="name">Name</label>\n    <input type="text" name="name" id="name" ng-model="contact.name" autofocus>\n    <label for="email">Email</label>\n    <input type="email" name="email" id="email" ng-model="contact.email">\n    <label for="message">Body</label>\n    <textarea name="message" id="message" rows="7" ng-model="contact.message"></textarea>\n    <br>\n    <button type="submit">Send</button>\n  </form>\n</div>\n');
$templateCache.put('partials/footer.html','<div class="container">\n  <div class="row">\n    <div class="col l6 m6 s12">\n        <a href="http://minhacampinas.org.br" class="brand-logo" style="height: 100%;">\n            <img src="img/logomc.png" alt="Logotipo Minha Campinas">\n        </a>\n\t\t</div>\n\t\t<div class="col l6 m6 s12">\n\t\t\t<ul class="footer-links">\n\t\t\t\t<li class="white-text">Fale conosco</li>\n\t\t\t\t<li><a href="https://www.facebook.com/minhacampinas/" target="_blank"><i class="white-text fa fa-facebook fa-2x" aria-hidden="true"></i></a></li>\n\t\t\t\t<li><a href="https://twitter.com/minhacampinas" target="_blank"><i class="white-text fa fa-twitter fa-2x" aria-hidden="true"></i></a></li>\n\t\t\t\t<li><a href="https://www.youtube.com/channel/UCRMS35ZIph6mLTtt9Hbzb7A" target="_blank"><i class="white-text fa fa-youtube fa-2x" aria-hidden="true"></i></a></li>\n\t\t\t</ul>\n\t\t</div>\n  </div>\n</div>\n');
$templateCache.put('partials/forgot.html','<div class="container">\n  <div ng-if="messages.error" role="alert" class="text-danger">\n    <div ng-repeat="error in messages.error">{{error.msg}}</div>\n  </div>\n  <div ng-if="messages.success" role="alert" class="text-success">\n    <div ng-repeat="success in messages.success">{{success.msg}}</div>\n  </div>\n  <form ng-submit="forgotPassword()">\n    <h4>Forgot Password</h4>\n    <p>Enter your email address below and we\'ll send you password reset instructions.</p>\n    <label for="email">Email</label>\n    <input type="email" name="email" id="email" placeholder="Email" ng-model="user.email" autofocus>\n    <br>\n    <button type="submit">Reset Password</button>\n  </form>\n</div>\n');
$templateCache.put('partials/header.html','<nav class="page-header" ng-controller="HeaderCtrl">\n  <div class="nav-wrapper container">\n      <a href="/" class="brand-logo" style="height: 100%;">\n        <!--img src="http://placehold.it/200x100" alt="" style="height: 100%;"-->\n        <img src="http://votacampinas.org.br/img/logo.png" alt="" style="height: 100%;">\n      </a>\n      <a href="#" class="button-collapse" data-activates="mobile-demo" data-sidenav="left" data-menuwidth="500" data-closeonclick="false"><i class="material-icons">menu</i></a>\n\n      <ul class="right hide-on-med-and-down">\n        <li ng-class="{ active: isActive(\'/projeto\')}"><a href="/projeto" ng-click="closeNav()">O Projeto</a></li>\n        <li ng-class="{ active: isActive(\'/como-funciona\')}"><a href="/como-funciona" ng-click="closeNav()">Como funciona</a></li>\n        <li ng-class="{ active: isActive(\'/login\')}" ng-if="!isAuthenticated()"><a href="/login">Entrar</a></li>\n        <li ng-class="{ active: isActive(\'/cadastro\')}" ng-if="!isAuthenticated()"><a href="/cadastro">Cadastre-se</a></li>\n        <li ng-class="{ active: isActive(\'/account\')}" ng-if="isAuthenticated()"><a href="/account">Meu perfil</a></li>\n        <li ng-if="isAuthenticated()"><a href="#" ng-click="logout()">Sair</a></li>\n      </ul>\n       <ul class="side-nav" id="mobile-demo">\n        <li ng-class="{ active: isActive(\'/projeto\')}"><a href="/projeto" ng-click="closeNav()">O Projeto</a></li>\n        <li ng-class="{ active: isActive(\'/como-funciona\')}"><a href="/como-funciona" ng-click="closeNav()">Como funciona</a></li>\n        <li ng-class="{ active: isActive(\'/login\')}" ng-if="!isAuthenticated()"><a href="/" ng-click="closeNav()">Entrar</a></li>\n        <li ng-class="{ active: isActive(\'/cadastro\')}" ng-if="!isAuthenticated()"><a href="/cadastro" ng-click="closeNav()">Cadastre-se</a></li>\n        <li ng-class="{ active: isActive(\'/account\')}" ng-if="isAuthenticated()"><a href="/account" ng-click="closeNav()">Meu Perfil</a></li>\n        <li ng-if="isAuthenticated()"><a href="#" ng-click="logout()">Sair</a></li>\n       </ul>\n  </div>\n  <div class="col s10"></div>\n</nav>\n');
$templateCache.put('partials/login.html','<div class="container">\n  <div ng-if="messages.error" role="alert" class="text-danger">\n    <div ng-repeat="error in messages.error">{{error.msg}}</div>\n  </div>\n\n  <h4>Log In</h4>\n\n  <form ng-submit="login()">\n    <label for="email">Email</label>\n    <input type="email" name="email" id="email" placeholder="Email" ng-model="user.email" autofocus>\n    <label for="password">Password</label>\n    <input type="password" name="password" id="password" placeholder="Password" ng-model="user.password">\n    <p><a href="/forgot">Forgot your password?</a></p>\n    <button type="submit">Log in</button>\n  </form>\n\n  <hr>\n\n  <button ng-click="authenticate(\'facebook\')">Sign in with Facebook</button>\n  <br>\n\n  <p>Don\'t have an account? <a href="/signup">Sign up</a></p>\n</div>\n');
$templateCache.put('partials/profile.html','<div class="container">\n  <div ng-if="messages.error" role="alert" class="text-danger">\n    <div ng-repeat="error in messages.error">{{error.msg}}</div>\n  </div>\n  <div ng-if="messages.success" role="alert" class="text-success">\n    <div ng-repeat="success in messages.success">{{success.msg}}</div>\n  </div>\n\n  <h4>Meu perfil</h4>\n\n  <form ng-submit="updateProfile()">\n    <label for="email">Email</label>\n    <input type="email" name="email" id="email" ng-model="profile.email">\n\n    <label for="name">Nome</label>\n    <input type="text" name="name" id="name" ng-model="profile.name">\n\n    <label>Gravatar</label>\n    <img ng-src="{{profile.gravatar}}" class="gravatar" width="100" height="100">\n    <br>\n\n    <button class="btn waves-effect waves-light" type="submit" name="action">Atualizar perfil\n      <i class="material-icons right">send</i>\n    </button>\n  </form>\n\n  <br>\n  <hr>\n\n  <h4>Alterar senha</h4>\n\n  <form ng-submit="changePassword()">\n    <label for="password">Nova senha</label>\n    <input type="password" name="password" id="password" ng-model="profile.password">\n    <label for="confirm">Confirme sua senha</label>\n    <input type="password" name="confirm" id="confirm" ng-model="profile.confirm">\n    <br>\n\n    <button class="btn waves-effect waves-light" type="submit" name="action">Atualizar senha\n      <i class="material-icons right">send</i>\n    </button>\n  </form>\n</div>\n');
$templateCache.put('partials/reset.html','<div class="container">\n  <div ng-if="messages.error" role="alert" class="text-danger">\n    <div ng-repeat="error in messages.error">{{error.msg}}</div>\n  </div>\n  <div ng-if="messages.success" role="alert" class="text-success">\n    <div ng-repeat="success in messages.success">{{success.msg}}</div>\n  </div>\n\n  <h4>Reset Password</h4>\n\n  <form ng-submit="resetPassword()">\n    <label for="password">New Password</label>\n    <input type="password" name="password" id="password" placeholder="New password" ng-model="user.password" autofocus>\n    <label for="confirm">Confirm Password</label>\n    <input type="password" name="confirm" id="confirm" placeholder="Confirm password" ng-model="user.confirm">\n    <br>\n    <button type="submit">Change Password</button>\n  </form>\n</div>\n');
$templateCache.put('partials/signup.html','<div class="container">\n  <div ng-if="messages.error" role="alert" class="text-danger">\n    <div ng-repeat="error in messages.error">{{error.msg}}</div>\n  </div>\n\n  <h4>Create an account</h4>\n\n  <form ng-submit="signup()">\n    <label for="email">Email</label>\n    <input type="email" name="email" id="email" placeholder="Email" ng-model="user.email" autofocus>\n    <label for="name">Name</label>\n    <input type="text" name="name" id="name" placeholder="Name" ng-model="user.name">\n    <label for="password">Password</label>\n    <input type="password" name="password" id="password" placeholder="Password" ng-model="user.password">\n    <p>By signing up, you agree to the <a href="/">Terms of Service</a>.</p>\n    <button type="submit">Create an account</button>\n  </form>\n\n  <hr>\n\n  <button ng-click="authenticate(\'facebook\')">Sign in with Facebook</button>\n  <br>\n\n  <p>Already have an account? <a href="/login">Log in</a></p>\n</div>\n');
$templateCache.put('partials/cadastro/cadastro.html','<div class="row">\n  <div class="col s12">\n      <h1>Cadastro</h1>\n  </div>\n\n  <div class="col s12">\n    <form name="cadastro" ng-submit="enviar()">\n      <div class="dados-pessoais">\n        <h4>Pessoais</h4>\n        <div class="row">\n          <div class="input-field col s12">\n            <input id="nome" type="text" name="name" data-ng-model="user.name" ng-required="required" autofocus>\n            <label for="nome">Nome</label>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="input-field col s12">\n            <input id="data-nascimento" type="text" class="validate" data-ng-model="user.birthDate" ng-required="required">\n            <label for="data-nascimento">Data de Nascimento</label>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="input-field col s12">\n            <select id="sexo" data-ng-model="user.gender">\n              <option value="" selected>Selecione</option>\n              <option value="F">Feminino</option>\n              <option value="M">Masculino</option>\n            </select>\n             <label>Sexo</label>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="col s12">\n            <input type="checkbox" id="sou-candidato" data-ng-model="user.ehVereador"/>\n            <label for="sou-candidato">Sou Candidato</label>\n          </div>\n        </div>\n\n        <div class="exclusivo-candidato" data-ng-show="user.ehVereador">\n          <div class="row">\n            <div class="input-field col s6">\n              <input id="cod-j-e" type="text" class="validate" data-ng-model="user.vereador.partido" maxlength="5" ng-required="user.ehVereador">\n              <label for="cod-j-e">Partido</label>\n            </div>\n            <div class="input-field col s6">\n              <input id="cod-j-e" type="number" class="validate" data-ng-model="user.vereador.numero" ng-required="user.ehVereador">\n              <label for="cod-j-e">N\xFAmero</label>\n            </div>\n          </div>\n\n           <div class="row">\n             <div class="input-field col s12">\n               <input id="cod-j-e" type="number" class="validate" data-ng-model="user.vereador.codigoJusticaEleitoral" ng-required="user.ehVereador">\n               <label for="cod-j-e">Cod. Justi\xE7a Eleitoral</label>\n             </div>\n           </div>\n\n           <div class="row">\n            <div class="input-field col s12">\n              <textarea id="descricao" class="materialize-textarea" length="120" data-ng-model="user.vereador.descricao" ng-required="user.ehVereador"></textarea>\n              <label for="descricao">Descri\xE7\xE3o - Esta ser\xE1 a descri\xE7\xE3o do seu perfil para o eleitor</label>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="dados-conta">\n        <h4>Conta</h4>\n\n        <div class="row">\n          <div class="input-field col s12">\n            <input id="email" type="email" class="validate" data-ng-model="user.email" ng-required="required">\n            <label for="email">E-mail</label>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="input-field col s12">\n            <input id="senha" type="password" class="validate" data-ng-model="user.password" ng-required="required">\n            <label for="senha">Senha</label>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="input-field col s12">\n            <input id="confirme-senha" type="password" class="validate" data-ng-model="user.passwordConfirm" ng-required="required">\n            <label for="confirme-senha">Confirme sua Senha</label>\n            <span class="pink-text text-darken-2" data-ng-show="user.password !== user.passwordConfirm">As senhas n\xE3o coincidem</span>\n          </div>\n        </div>\n\n      </div>\n\n      <a href="/login">Voltar</a>\n      <button class="btn right waves-effect waves-light" type="submit" name="action" data-ng-disabled="cadastro.$invalid">Cadastrar\n          <i class="material-icons right">send</i>\n      </button>\n    </form>\n  </div>\n</div>\n');
$templateCache.put('partials/comofunciona/como-funciona.html','<div class="row">\n  <div class="col s12">\n    <h1>Como Funciona</h1>\n  </div>\n</div>\n');
$templateCache.put('partials/home/home.html','<div class="row">\n\t<div class="col s12 center-align">\n        <div style="background-image:url(img/campinas.png); color:white;">\n            </br>\n            </br>\n            </br>\n            </br>\n            </br>\n            <h2>Voc\xEA j\xE1 sabe em quem votar para vereador?</h2>\n            <h5>Que tal comparar sua ideias com as dos candidatos e candidatas para verificar quais s\xE3o parecidas.</h5>\n            <h5>\xC9 isso que o Vota Campinas faz!</h5>\n            <br />\n            <p><a href="/prioridades" class="waves-effect waves-light btn">Iniciar</a></p>\n            </br>\n            </br>\n            </br>\n            </br>\n            </br>\n        </div>\n\t</div>\n</div>\n');
$templateCache.put('partials/login/login.html','<div class="row">\n  <div class="col s12">\n    <h1>Login</h1>\n  </div>\n  <!-- <div class="col s12">\n    <button class="btn">Logar com Facebook</button>\n  </div> -->\n\n  <!-- <div class="col s12 center-align">\n    <hr>\n  </div> -->\n\n  <form data-ng-submit="enviar()" name="formLogin" class="col s8 pull-s2 center-align">\n    <div class="col s12 input-field">\n      <label for="email">E-mail</label>\n      <input id="email" name="email" type="email" data-ng-model="user.email" ng-required="true" autofocus>\n    </div>\n\n    <div class="col s12 input-field">\n      <label for="password">Senha</label>\n      <input id="password" name="password" type="password" data-ng-model="user.password" ng-required="true" ng-minlength="">\n    </div>\n\n    <div class="col s12 input-field">\n      <button type="submit" class="btn" ng-disabled="formLogin.$invalid">Entrar</button>\n    </div>\n  </form>\n\n\n  <div class="col s12">\n    <ul>\n      <li><a data-ng-href="/cadastro">Cadastre-se</a></li>\n      <li><a data-ng-href="">Esqueci minha senha</a></li>\n    </ul>\n  </div>\n</div>\n');
$templateCache.put('partials/perfil/perfil.html','<div class="row">\n  <div class="col s12">\n      <h1>Perfil do Candidato</h1>\n  </div>\n  <div class="dados-candidato">\n\t  <div class="col s12 m12">\n\t\t\t<div class="card">\n\t\t\t  <div class="card-panel large">\n\t\t\t  <div class="card-content">\n\t\t\t  \t<img src="http://placehold.it/150x150" alt="">\n\t\t\t  \t<span class="card-title activator grey-text text-darken-4">\n\t\t\t  \t\tNome do Candidato\n\t\t\t  \t</span>\n\t\t\t  \t<p>Partido</p>\n\t\t\t  \t<p>Numero do Candidato</p>\n\t\t\t  \t<p>Descri\xE7\xE3o</p>\n\t\t\t  </div>\n\t\t\t  </div>\n\t\t\t</div>\n\t  </div>\t\n  </div>\n  <div class="respostas-candidato">\n  \t<h2>Respostas</h2>\n  </div>\n  <a href="/login">Voltar</a>\n</div>\n');
$templateCache.put('partials/perguntas/perguntas.html','<div class="row">\n  <div class="col s12">\n      <h1>Analise as afirma\xE7\xF5es - {{pagina}} / {{perguntas.length}}</h1>\n  </div>\n  <div class="col s12">\n    <div class="progress">\n      <div\n        class="determinate"\n        style="width: {{(pagina / perguntas.length)*100}}%"\n        ng-class="{red: pagina < perguntas.length}"\n      ></div>\n    </div>\n  </div>\n  <div class="col s12">\n    <form novalidate>\n        <p>{{perguntas[pagina].pergunta}}</p>\n        <p ng-show="pagina === perguntas.length">{{perguntas[pagina - 1].pergunta}}</p>\n\n        <ul class="form-questoes">\n          <li>\n            <input ng-click="next()" ng-model="perguntas[pagina].resposta" name="resposta-{{perguntas[pagina]}}" id="resposta-2-{{perguntas[pagina]}}" type="radio" value="2" ng-disabled="enviando"/>\n            <label for="resposta-2-{{perguntas[pagina]}}">Concordo plenamente</label>\n           </li>\n           <li>\n             <input ng-click="next()" ng-model="perguntas[pagina].resposta" name="resposta-{{perguntas[pagina]}}" id="resposta-4-{{perguntas[pagina]}}" type="radio" value="4" ng-disabled="enviando"/>\n             <label for="resposta-4-{{perguntas[pagina]}}">Concordo</label>\n           </li>\n           <li>\n              <input ng-click="next()" ng-model="perguntas[pagina].resposta" name="resposta-{{perguntas[pagina]}}" id="resposta-1-{{perguntas[pagina]}}" type="radio" value="1" ng-disabled="enviando"/>\n              <label for="resposta-1-{{perguntas[pagina]}}">Discordo</label>\n           </li>\n           <li>\n             <input ng-click="next()" ng-model="perguntas[pagina].resposta" name="resposta-{{perguntas[pagina]}}" id="resposta-3-{{perguntas[pagina]}}" type="radio" value="3" ng-disabled="enviando"/>\n             <label for="resposta-3-{{perguntas[pagina]}}">Discordo plenamente</label>\n           </li>\n        </ul>\n        <div class="row">\n          <div class="col s6 m6 l6">\n            <input ng-click="back()" ng-show="pagina > 0" type="button" class="btn" value="Voltar">\n          </div>\n          <div class="col s6 m6 l6">\n            <a ng-show="pagina === perguntas.length" class="btn right" href="/ranking">Finalizar</a>\n            <a class="red-text pular tooltipped" data-position="left" data-delay="30" data-tooltip="Voc\xEA s\xF3 pode pular a partir da 18\xAA quest\xE3o" href="" disabled ng-hide="pagina === perguntas.length">* Pular</a>\n          </div>\n        </div>\n    </form>\n  </div>\n</div>\n');
$templateCache.put('partials/prioridades/prioridades.html','<div class="row">\n  <div class="col s12">\n      <h1>Quest\xF5es</h1>\n      <h3>Para voc\xEA, quais s\xE3o as principais prioridades para Campinas?</h3>\n  </div>\n  <div class="col s12">\n    <form id="opcoes" style="min-height: 320px;" novalidate>\n      <div class="opcoes" style="position: relative; min-height: 250px;">\n        <h3>Prioridade n\xEDvel {{pagina}}</h3>\n        <div ng-if="opcoes" ng-repeat="opcao in opcoes | orderBy: \'prioridade\'">\n          <input ng-click="next()" ng-disabled="enviando" ng-model="model.prioridade" name="prioridade" type="radio" value="{{opcao.id}}" id="prioridade-{{$index}}" />\n          <label for="prioridade-{{$index}}">{{opcao.prioridade}}</label>\n        </div>\n      </div>\n      <input ng-click="back()" ng-if="pagina !== 1 && pagina < 4" type="button" class="btn" style="margin-top: 30px;" value="Voltar">\n      <input ng-click="submit()" ng-show="submitOk" type="button" class="btn" style="margin-top: 30px;" value="Enviar">\n    </form>\n  </div>\n</div>  ');
$templateCache.put('partials/projeto/projeto.html','<div class="row">\n  <div class="col s22">\n    <h1>O Projeto</h1>\n    <h5>O que \xE9?</h5>\n    <br>\n    <h6>O projeto Vota Campinas nasceu com o objetivo de ajudar a popula\xE7\xE3o de Campinas a escolher os seus candidatos a vereador. </h6>\n    <h6>Atrav\xE9s de quest\xF5es objetivas os eleitores podem verificar suas afinidades com os candidatos.</h6>\n    <hr>\n    <br>\n    <h5>Realiza\xE7\xE3o</h5>\n    <br>\n    <h6>O projeto Vota Campinas foi desenvolvido por um grupo de programadores e programadoras independentes que utilizam tecnologia </h6>\n    <h6>digital para a constru\xE7\xE3o de um sociedade melhor. A organiza\xE7\xE3o Minha Campinas \xE9 a promotora do projeto.</h6>\n    <hr>\n    <br>\n    <h5>Time do Projeto</h5>\n    <br>\n  </div>\n  <div class="container">\n    <div class="row">\n        <div class="col s2">\n          <img class="circle" src="img/danisoldera.jpg" height="100" width="100" alt="Victor Miguez"/>\n          <p>Daniele Soldera</p>\n        </div>\n        <div class="col s2">\n            <img class="circle" src="img/victormiguez.jpg" height="100" width="100" alt="Victor Miguez"/>\n            <p>Victor Miguez</p>\n        </div>\n        <div class="col s2">\n            <img class="circle" src="img/victorperin.jpg" height="100" width="100" alt="Victor Miguez"/>\n            <p>Victor Perin</p>\n        </div>\n        <div class="col s2">\n            <img class="circle" src="img/gabrielribeiro.jpg" height="100" width="100" alt="Victor Miguez"/>\n            <p>Gabriel Ribeiro</p>\n        </div>\n        <div class="col s2">\n            <img class="circle" src="img/laixuancheng.jpg" height="100" width="100" alt="Victor Miguez"/>\n            <p>Lai Xuancheng</p>\n        </div>\n        <div class="col s2">\n            <img class="circle" src="img/guilhermeluchesi.jpg" height="100" width="100" alt="Victor Miguez"/>\n            <p>Guilherme Luchesi</p>\n        </div>\n    </div>\n    <div class="row">\n         <div class="col s12">\n            <img class="circle" src="img/bordignon.jpg" height="100" width="100" alt="Andr\xE9 Bordignon"/>\n            <p>Andr\xE9 Bordignon</p>\n        </div>\n        \n    </div>\n  </div>\n</div>\n');
$templateCache.put('partials/ranking/ranking.html','<div class="row">\n  <div class="col s12">\n    <h1>Ranking</h1>\n  </div>\n  <div class="col s12">\n    Aqui est\xE3o os candidatos que combina com suas escolhas\n  </div>\n\n  <div class="col s12">\n    <ul class="collection">\n      <li class="collection-item">\n        <div class="row">\n          <div class="col s12 m2 center-align">\n            <img src="http://placehold.it/150x150" alt="" style="width: 100%;">\n          </div>\n          <div class="col s12 m10">\n            <h4>Nome</h4>\n            <p>Partido - Numero: 1234</p>\n            <p>% Afinidade: 80%</p>\n\n          </div>\n\n          <div class="col s12 offset-m9 m3">\n            <button class="btn" style="width: 100%;">Ver Perfil</button>\n          </div>\n        </div>\n      </li>\n    </ul>\n  </div>\n</div>');}]);