define([
    './BaseStockModel'
], function(
    BaseStockModel
) {
    'use strict';

    /**
     * @class HistoricalPoint
     * @constructor
     */
    function HistoricalPoint() {
        BaseStockModel.call(this);

        this.high = '';
        this.low = '';

        this.sma5 = -1;
        this.sma10 = -1;
        this.sma20 = -1;
        this.sma30 = -1;
        this.sma50 = -1;
        this.sma100 = -1;
        this.sma200 = -1;
        this.ema10 = -1;
        this.ema20 = -1;
        this.ema30 = -1;
        this.ema50 = -1;
        this.ema100 = -1;
        this.ema200 = -1;

    }

    HistoricalPoint.prototype = new BaseStockModel();
    HistoricalPoint.prototype.constructor = HistoricalPoint;

    /**
     * @method hydrate
     * @for HistoricalPoint
     * @param historicalPoint
     */
    HistoricalPoint.prototype.hydrate = function hydrate(historicalPoint) {
        this.symbol = historicalPoint.Symbol;
        this.date = historicalPoint.Date;
        this.open = parseFloat(historicalPoint.Open);
        this.high = parseFloat(historicalPoint.High);
        this.low = parseFloat(historicalPoint.Low);
        this.close = parseFloat(historicalPoint.Close);
        this.volume = parseInt(historicalPoint.Volume, 10);
    };

    HistoricalPoint.prototype.setMovingAverage = function() {};


    // TODO: historicalPoint - add toJSON method
    // TODO: historicalPoint - add fromJSON method

    return HistoricalPoint;
});
