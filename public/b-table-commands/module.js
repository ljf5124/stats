// Generated by CoffeeScript 1.7.1
(function() {
  var module;

  module = angular.module('B.Table.Commands', []);

  module.directive("bTableCommands", function(bGaSvc) {
    return {
      templateUrl: 'b-table-commands/partial.html',
      restrict: 'E',
      link: function(scope, ele) {
        bGaSvc.fetchCommands.then(function(data) {
          return scope.commands = data;
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=module.map
