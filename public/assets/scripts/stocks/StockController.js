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
                this._stockSet = null;


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

            // TODO: rename fn
            /**
             * Uses StockService to request data payload from server
             * Hands response data oof to responseHandler
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
             * Parses JSON data received from the server
             *
             * @method parseDataResponse
             * @for StockController
             * @param response {object}
             * @returns $scope.stocks {object}
             */
            StockController.prototype.parseDataResponse = function parseDataResponse(response) {
                assert(response.status === 200, 'There was an error getting Stock data');

                var i;
                var quote;
                var stock;
                var data = response.data.payload.query.results.quote;

                this._stockSet = new StockCollection();

                for (i = 0; i < data.length; i++) {
                    quote = data[i];

                    stock = new Stock(quote);
                    this._stockSet.addStock(stock);
                }

                $scope.stocks = this._stockSet.items;
            };

            // TODO: use user defined date ranges
            // TODO: rename fn
            /**
             * Uses HistoricalDataService to request historical data for symbol from startDate to endDate
             *
             * @method populateHistoricalData
             * @fr StockController
             * @param symbol
             * @param requestedStartDate {string}
             * @param requestedEndDate {string}
             */
            StockController.prototype.populateHistoricalData = function populateHistoricalData(symbol, requestedStartDate, requestedEndDate) {
                var endDate = requestedEndDate || '2015-07-25';
                var startDate = requestedStartDate || '2014-07-25';

                HistoricalStockDataService.fetchHistoricalDataForStockWithTimePeriod(symbol, startDate, endDate)
                    .then(this.parseHistoricalDataResponseHandler);

                return this;
            };

            /**
             * Parse JSON data
             *
             * @method parseHistoricalDataResponse
             * @for StockController
             * @param response {object}
             */
            StockController.prototype.parseHistoricalDataResponse = function parseHistoricalDataResponse(response) {
                assert(response.status === 200, 'There was an error getting the historical data for this symbol');

                var rawHistoricalData = response.data.query.results.quote;
                var symbol = this._stockSet.findStockBySymbol(rawHistoricalData[0].Symbol);

                return this.addHistoricalDataToStock(symbol, rawHistoricalData);
            };

            /**
             * Add historical data to Stock.historicalDataSet
             *
             * @method addHistoricalDataToStock
             * @for StockController
             * @param symbol {object|Stock} symbol to add historical data to
             * @param data {object|JSON} data received from API
             */
            StockController.prototype.addHistoricalDataToStock = function addHistoricalDataToStock(symbol, data) {
                assert(symbol instanceof Stock, 'Expected symbol to be an instance of Stock');
                assert(typeof data === 'object', 'Expected historical data set to be an object');

                // TODO: historical avg - refactor to look for length greater than 1
                //if (symbol.historicalDataSet.hasHistoricalData()) {
                    //alert('Historical Data already exists for this Symbol');
                    //return this;
                //}

                var i;
                var point;

                for (i = 0; i < data.length; i++) {
                    point = new HistoricalPoint();
                    point.hydrate(data[i]);
                    symbol.historicalDataSet.addPoint(point);
                }

                symbol.historicalDataSet.buildHistoricalAverageData();

                console.log('operation: complete\t', symbol);

                return this;
            };


            return new StockController();
        }
    ];
});
