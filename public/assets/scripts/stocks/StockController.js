define([
    'jquery',
    './Stock',
    './StockCollection'
], function(
    $,
    Stock,
    StockCollection
) {
    'use strict';

    return [
        '$scope',
        'StockService',
        'HistoricalStockDataService',
        function(
            $scope,
            StockService,
            HistoricalStockDataService
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
                this.stockSet = null;


                return this.setupHandlers()
                            .createChildren()
                            .enable()
                            .getDataPayload();
            };

            /**
             *
             * @method setupHandlers
             * @for StockController
             */
            StockController.prototype.setupHandlers = function setupHandlers() {
                this.parseDataResponseHandler = $.proxy(this.parseDataResponse, this);
                this.parseHistoricalDataResponseHandler = $.proxy(this.parseHistoricalDataResponse, this);

                return this;
            };

            /**
             * @method createChildren
             * @for StockController
             */
            StockController.prototype.createChildren = function createChildren() {
                return this;
            };

            /**
             * @method enable
             * @for StockController
             */
            StockController.prototype.enable = function enable() {
                return this;
            };

            /**
             * @method disable
             * @for StockController
             */
            StockController.prototype.disable = function disable() {
                return this;
            };

            /**
             *
             * @method getDataPayload
             * @for StockController
             */
            StockController.prototype.getDataPayload = function getDataPayload() {
                StockService.getTickerPayload()
                    .then(this.parseDataResponseHandler);

                return this;
            };

            /**
             * @method  parseDataResponse
             * @for  StockController
             * @param  {json}
             */
            StockController.prototype.parseDataResponse = function parseDataResponse(response) {
                var i;
                var quote;
                var stock;
                var data = response.data.payload.query.results.quote;

                this.stockSet = new StockCollection();

                for (i = 0; i < data.length; i++) {
                    quote = data[i];

                    stock = new Stock(quote);
                    this.stockSet.addStock(stock);
                }

                $scope.stocks = this.stockSet.items;

                return this;
            };

            $scope.populateHistoricalData = function getHistoricalData(symbol) {
                var startDate = '2014-07-22';
                var endDate = '2015-07-22';
                // console.log('getHistoricalData', symbol, startDate, endDate);
                var response = HistoricalStockDataService.fetchDataPayload(symbol, startDate, endDate);


                // return this.parseHistoricalDataResponse(response);
            };


            StockController.prototype.parseHistoricalDataResponse = function parseHistoricalDataResponse(response) {
                console.log(response);

                return this;
            };


            return new StockController();
        }
    ];
});