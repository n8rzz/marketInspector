define([
    'angular',
    './stocks/StockService'
], function(
    angular,
    StockService
) {
    'use strict';

    return angular.module('mi.services', [])
        .factory('StockService', StockService);
});