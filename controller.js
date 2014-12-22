/* Angular controller JS */
   
   function TodoCtrl($scope) {
        $scope.todos = [];

        var Todo = $data.define("Todo", {
            task: String,
            done: Boolean,
            tsmark: String
        });
        
 
         Todo.readAll().then(function (todos) {
            $scope.$apply(function () {
                $scope.todos = todos;
            });
        });
        
        $scope.$watch('search', function(search) {
            var promise = (search ? Todo.query('it.task.contains(p)',{p: search}) : Todo.readAll());
            promise.then(function (todos) {
                $scope.$apply(function () {
                    $scope.todos = todos;
                });
            });       
        });
        
        $scope.remove = function (todo) {
            todo.remove()
                .then(function() {
                    $scope.$apply(function() {
                       var todos = $scope.todos;
                       todos.splice(todos.indexOf(todo), 1);
                    });
                })
               .fail(function(err) {
                   alert("Error deleting item");
               });
        }

        $scope.addNew = function (todo) {
        	// set timestamp
        	var tsmark = Date.now(); //new Date().getTime(); // to IE8 and earlier
        	$scope.newTodo.tsmark = tsmark;
            Todo.save(todo).then(function (todo) {
                $scope.$apply(function () {
                    $scope.newTodo = null;
                    $scope.todos.push(todo);
                });
            });
        };
    }
    