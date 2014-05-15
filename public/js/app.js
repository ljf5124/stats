// Generated by CoffeeScript 1.7.1
(function() {
  var app;

  app = angular.module('BApp', ['B.Chart.Users', 'B.Table.Commands', 'B.Table.Pkgs', 'B.Map', 'B.Delta', 'ngResource', 'ui.bootstrap']);

  app.controller('BHeaderCtrl', function(bDataSvc) {
    bDataSvc.fetchOverview.then((function(_this) {
      return function(data) {
        return _this.totalPkgs = data.totalPkgs;
      };
    })(this));
  });

  app.factory('topojson', function() {
    return topojson;
  });

  app.factory('d3', function() {
    d3.legend = function() {
      var chart, items, lBox, lItems;
      items = {};
      chart = d3.select(this.node().parentNode);
      lBox = this.selectAll(".box").data([true]);
      lItems = this.selectAll(".items").data([true]);
      lBox.enter().append("rect").classed("box", true);
      lItems.enter().append("g").classed("items", true);
      chart.selectAll("[data-legend]").each(function() {
        var path;
        path = d3.select(this);
        items[path.attr("data-legend")] = {
          pos: path.attr("data-legend-pos") || this.getBBox().y,
          color: path.attr("data-legend-color") || (path.style("fill") !== "none" ? path.style("fill") : path.style("stroke"))
        };
      });
      items = d3.entries(items).sort(function(a, b) {
        return a.value.pos - b.value.pos;
      });
      lItems.selectAll("text").data(items, function(d) {
        return d.key;
      }).call(function(d) {
        return d.enter().append("text");
      }).call(function(d) {
        return d.exit().remove();
      }).attr("x", "1em").attr("y", function(d, i) {
        return i * 1.25 + "em";
      }).text(function(d) {
        switch (d.key) {
          case 'N':
            return 'New';
          case 'E':
            return 'Returning';
          default:
            return d.key;
        }
      });
      lItems.selectAll("circle").data(items, function(d) {
        return d.key;
      }).call(function(d) {
        return d.enter().append("circle");
      }).call(function(d) {
        return d.exit().remove();
      }).attr("cx", 0).attr("cy", function(d, i) {
        return i - 0.25 + "em";
      }).attr("r", "0.4em").style("fill", function(d) {
        return d.value.color;
      });
    };
    return d3;
  });

  app.factory('bApiRoot', function($location) {
    if ($location.host() === 'localhost') {
      return "/data/:type";
    } else {
      return "/bower/data/:type";
    }
  });

  app.factory('bDataSvc', function($resource, $http, bApiRoot) {
    var fetchCommandsP, fetchGeoP, fetchOverviewP, fetchPkgsP, fetchUsersP, ga;
    ga = $resource(bApiRoot, null, {
      getUsers: {
        method: 'GET',
        params: {
          type: 'users'
        },
        isArray: true
      },
      getCommands: {
        method: 'GET',
        params: {
          type: 'commands'
        },
        isArray: true
      },
      getPkgs: {
        method: 'GET',
        params: {
          type: 'pkgs'
        },
        isArray: true
      },
      getOverview: {
        method: 'GET',
        params: {
          type: 'overview'
        }
      },
      getGeo: {
        method: 'GET',
        params: {
          type: 'geo'
        },
        isArray: true
      }
    });
    fetchUsersP = ga.getUsers().$promise;
    fetchCommandsP = ga.getCommands().$promise;
    fetchPkgsP = ga.getPkgs().$promise;
    fetchOverviewP = ga.getOverview().$promise;
    fetchGeoP = ga.getGeo().$promise;
    return {
      fetchUsers: fetchUsersP,
      fetchCommands: fetchCommandsP,
      fetchPkgs: fetchPkgsP,
      fetchOverview: fetchOverviewP,
      fetchGeo: fetchGeoP
    };
  });

  app.filter('round', function() {
    return function(input, decimals) {
      if (input == null) {
        return void 0;
      } else if (input >= 1000) {
        return (input / 1000).toFixed(1) + ' k';
      } else {
        return input.toFixed(decimals);
      }
    };
  });

}).call(this);

//# sourceMappingURL=app.map
