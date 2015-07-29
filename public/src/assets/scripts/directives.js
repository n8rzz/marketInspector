define([
    'angular',
    './stocks/StockOverviewDirective'
], function(
    angular,
    StockOverviewDirective
) {
    'use strict';

    return angular.module('mi.directives', [])
        .directive('miStockOverview', StockOverviewDirective);

});