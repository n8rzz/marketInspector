define([
    'jquery',
    '../lib/util/assert',
    '../lib/util/constants',
    './Stock',
    './StockCollection',
    './HistoricalPoint'
], function(
    $,
    assert,
    CONSTANTS,
    Stock,
    StockCollection,
    HistoricalPoint
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
                this.populateHistoricalDataHandler = $.proxy(this.populateHistoricalData, this);
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
                $scope.populateHistoricalData = this.populateHistoricalDataHandler;

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

            // TODO: use user defined date ranges
            /**
             *
             *
             * @param symbol
             * @returns {StockController}
             */
            StockController.prototype.populateHistoricalData = function populateHistoricalData(symbol) {
                var startDate = '2014-07-22';
                var endDate = '2015-07-22';

                HistoricalStockDataService.fetchDataPayload(symbol, startDate, endDate)
                    .then(this.parseHistoricalDataResponseHandler);

                return this;
            };

            /**
             *
             * @param response
             */
            StockController.prototype.parseHistoricalDataResponse = function parseHistoricalDataResponse(response) {
                assert(response.status === 200, 'There was an error getting the historical data for this symbol');

                $scope.hasHistoricalData = true;
                var rawHistoricalData = response.data.query.results.quote;
                var symbol = this.stockSet.findStockBySymbol(rawHistoricalData[0].Symbol);

                return this.addHistoricalDataToStock(symbol, rawHistoricalData);
            };

            /**
             *
             * @param symbol
             * @param data
             */
            StockController.prototype.addHistoricalDataToStock = function addHistoricalDataToStock(symbol, data) {
                assert(symbol instanceof Stock, 'Expected symbol to be an instance of Stock');
                assert(typeof data === 'object', 'Expected historical data set to be an object');

                var i;
                var point;

                for (i = 0; i < data.length; i++) {
                    point = new HistoricalPoint();
                    point.hydrate(data[i]);
                    symbol.historicalDataSet.addPoint(point);
                }

                return this.requestToCalculateAverages(symbol);
            };

            /**
             *
             * @param symbol {Stock}
             */
            StockController.prototype.requestToCalculateAverages = function requestToCalculateAverages(symbol) {
                console.log('requestToCalculateAverages', symbol);

                symbol.historicalDataSet.calculateAverage(
                    CONSTANTS.MOVING_AVERAGE_TYPE.SMA,
                    CONSTANTS.MOVING_AVERAGE_LENGTH.FIVE,
                    null,
                    null
                );

            };

            return new StockController();
        }
    ];
});
