(function(Trello) {
    "use strict";

    Trello.Models.Card = Backbone.Model.extend({
        "defaults": function() {
            return {
                "tableChartMappingObj": {}
            };
        }
    });

})(window.Trello);
