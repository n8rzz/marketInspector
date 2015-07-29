define([
    'angular',
    'jquery'
], function(
    angular,
    $
) {
    'use strict';

    return [
        '$http',
        function(
            $http
        ) {

            var BASE_URL = '/payload';

            /**
             * @class StockService
             * @constructor
             */
            var StockService = function() {};


            StockService.prototype.getTickerPayload = function getTickerPayload() {
                return $http.get(BASE_URL);
            };


            return new StockService();
        }
    ];
});