// Generated by CoffeeScript 1.7.1
(function() {
  var app;

  app = angular.module('BApp', ['B.Chart.Users', 'ngResource']);

  app.controller('BMainCtrl', function() {});

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

  app.factory('bGaSvc', function($resource) {
    var fetchPromise, ga;
    ga = $resource('/data/:type', null, {
      getTraffic: {
        method: 'GET',
        params: {
          type: 'users'
        },
        isArray: true
      }
    });
    fetchPromise = ga.getTraffic().$promise;
    return {
      fetch: fetchPromise
    };
  });

}).call(this);

//# sourceMappingURL=app.map
