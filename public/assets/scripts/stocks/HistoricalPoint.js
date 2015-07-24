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
        this.date = new Date(historicalPoint.Date);
        this.open = parseFloat(historicalPoint.Open);
        this.high = parseFloat(historicalPoint.High);
        this.low = parseFloat(historicalPoint.Low);
        this.close = parseFloat(historicalPoint.Close);
        this.volume = parseInt(historicalPoint.Volume, 10);
    };

    // TODO: historicalPoint - add toJSON method
    // TODO: historicalPoint - add fromJSON method

    return HistoricalPoint;
});
