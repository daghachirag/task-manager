(function(Trello) {
    "use strict";

    Trello.Models.Task = Backbone.Model.extend({
        "defaults": function() {
            return {
                "tableChartMappingObj": {}
            };
        }
    });

})(window.Trello);
