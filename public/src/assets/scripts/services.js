define([
    'angular',
    './stocks/StockService',
    './stocks/HistoricalStockDataService'
], function(
    angular,
    StockService,
    HistoricalStockDataService
) {
    'use strict';

    return angular.module('mi.services', [])
        .factory('StockService', StockService)
        .factory('HistoricalStockDataService', HistoricalStockDataService);
});