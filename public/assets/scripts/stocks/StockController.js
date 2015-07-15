define([
    './Stock',
    './StockService'
], function(
    Stock,
    StockService
) {
    'use strict';

    return [
        '$scope',
        'StockService',
        function(
            $scope,
            StockService
        ) {

            /**
             * @class StockController
             * @constructor
             */
            var StockController = function() {
                return this.init();
            };

            /**
             *
             * @method init
             * @for StockController
             */
            StockController.prototype.init = function init() {

                return this.setupHandlers()
                            .getDataPayload();
            };

            /**
             *
             * @method setupHandlers
             * @for StockController
             */
            StockController.prototype.setupHandlers = function setupHandlers() {
                return this;
            };

            /**
             *
             * @method getDataPayload
             * @for StockController
             */
            StockController.prototype.getDataPayload = function getDataPayload() {
                StockService.getTickerPayload()
                    .then(function(data) {
                        $scope._payload = data;
                        $scope.ticker = 'Success';
                    });

                return this;
            };


            return new StockController();
        }
    ];
});