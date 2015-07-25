define([
    '../lib/util/assert',
    '../lib/util/constants',
    './BaseStockModel',
    '../averages/AverageModel'
], function(
    assert,
    CONSTANTS,
    BaseStockModel,
    AverageModel
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
        this.sma = new AverageModel(CONSTANTS.MOVING_AVERAGE_TYPE.SMA);
        this.ema = new AverageModel(CONSTANTS.MOVING_AVERAGE_TYPE.EMA);

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

    /**
     * @method requestToAddAverageToPoint
     * @for HistoricalPoint
     * @param period {string|CONSTANTS}
     * @param average {number}
     */
    HistoricalPoint.prototype.requestToAddAverageToPoint = function requestToAddAverageToPoint(period, average) {
        assert(assert.isNumber(period), 'Period must be a number');
        assert(assert.isNumber(average), 'Average must be a number');

        console.log('requestToAddAverageToPoint', '\tperiod:', period);

        //if (averageType === CONSTANTS.MOVING_AVERAGE_TYPE.SMA) {
        if ('SMA' === CONSTANTS.MOVING_AVERAGE_TYPE.SMA) {
            return this._setSimpleMovingAverage(period, average);
        }

    };

    /**
     * Sets the simple moving average
     *
     * @method setSimpleMovingAverage
     * @for HistoricalPoint
     * @private
     */
    HistoricalPoint.prototype._setSimpleMovingAverage = function _setSimpleMovingAverage(period, average) {
        var status = this.sma.setAverage(period, average);

        // TODO: success_codes - need to add
        if (status !== 0) {
            new Error('There was a problem adding the SMA to this HistoricalPoint.  STATUS_CODE: ' + 0 );
        }

        return this;
    };



    // TODO: historicalPoint - add toJSON method
    // TODO: historicalPoint - add fromJSON method

    return HistoricalPoint;
});
