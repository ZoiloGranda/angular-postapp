angular.module('FinalApp')
.controller('MainController', function($scope, $resource, PostResource) {
	// el update al final se agrega porque no viene por defecto en $resource
	User=$resource('https://jsonplaceholder.typicode.com/users/:id', {id: '@id'});
	$scope.posts= PostResource.query();
    // query lo que hace es un GET a la ruta del Post, y devuelve un arreglo
    // que se almacena en $scope.posts
	$scope.users= User.query();
	$scope.removePost=function(post) {
		PostResource.delete({id: post.id});
		// con el filter se guardan en el arreglo posts, los post que no tengan
		// el id del delete
		$scope.posts=$scope.posts.filter(function(element) {
			return element.id !==post.id;
		});
	};
})
.controller('PostController', function($scope, $routeParams, PostResource, $location) {
	$scope.title='Editar Post';
	//  route params permite acceder a los elementos de la url
	$scope.post= PostResource.get({id: $routeParams.id});
	$scope.savePost=function() {
  PostResource.update({id: $scope.post.id}), ({data: $scope.post});
  $location.path('/post/'+$scope.post.id);
	};
})
.controller('NewPostController', function($scope, PostResource, $location) {
	//  route params permite acceder a los elementos de la url
	$scope.title='Crear Post';
	$scope.post= {};
	$scope.savePost=function() {
		// la funcion que se ejecuta es para demostrar el exito de la operacion
		PostResource.save({data: $scope.post}, function(data) {
			console.log(data);
      $location.path('/');
		});
	};
});
