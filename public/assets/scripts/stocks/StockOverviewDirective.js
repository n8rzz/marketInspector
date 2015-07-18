define([
    'text!stocks/templates/stockOverviewTemplate.html'
], function(
    stockOverviewTemplate
) {
    'use strict';

    return [

        function(

        ) {
            return {
                restrict: 'E',
                template: stockOverviewTemplate,
                link: function(scope, element, attrs) {

                    var StockOverview = function() {};


                    scope.stockOverview = new StockOverview();
                }
            };
        }
    ];
});