console.log('connected');
var app = angular.module('myApp',['ngRoute','ngResource']);

app.config(function($routeProvider){
	$routeProvider
		.when('/todo',{
			templateUrl:'./templates/todos.ejs',
			controller:'TodoController'
		})

		.when('/:id',{
			templateUrl:'templates/todoDetails.ejs',
			controller:'TodoDetailCtrl'
		})
});





app.factory('Todos', ['$resource', function($resource){
		  return $resource('/todos/:id', null, {
			'update': { method:'PUT' }
		  });
		}])
app.controller('TodoController',function($scope,Todos){
	console.log('connected');
	$scope.editing =[];
	$scope.todos = Todos.query();

	$scope.save = function(){
		if(!$scope.newTodo || $scope.newTodo.length<1) return;
		var todo = new Todos ({name:$scope.newTodo, completed: false});

		todo.$save(function(){
			$scope.todos.push(todo);
			$scope.newTodo ="";
		});
	}

	$scope.update = function(index){
		var todo = $scope.todos[index];
		Todos.update({id:todo._id},todo);
		$scope.editing[index] =false;
	}

	$scope.edit = function(index){
		$scope.editing[index] = angular.copy($scope.todos[index]);
	}

	$scope.cancel = function(index){
		$scope.todos[index] = angular.copy($scope.editing[index]);
		$scope.editing[index] = false;
	}

})

	app.controller('TodoDetailCtrl', function($scope,Todos,$routeParams,$location) {
			console.log('connected 2 controller');
			// $scope.todo = Todos[$routeParams.id];
			$scope.todo = Todos.get({id:$routeParams.id});

			$scope.update = function(){
				Todos.update({id:$scope.todo.id},$scope.todo,function(){
					$location.url('/');
				});
			}
		});