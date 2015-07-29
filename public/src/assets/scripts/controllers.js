define([
    'angular',
    './stocks/StockController'
], function(
    angular,
    StockController
) {
    'use strict';

    return angular.module('mi.controllers', [])
        .controller('StockController', StockController);

});