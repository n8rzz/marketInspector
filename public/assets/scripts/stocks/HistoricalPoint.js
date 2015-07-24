define([
    '../lib/util/assert',
    '../lib/util/constants',
    './BaseStockModel'
], function(
    assert,
    CONSTANTS,
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

        this.smaFive = -1;
        this.smaTen = -1;
        this.smaTwenty = -1;
        this.smaThirty = -1;
        this.smaFifty = -1;
        this.smaOneHunndred = -1;
        this.smaTwoHundred = -1;
        this.emaFive = -1;
        this.emaTen = -1;
        this.emaTwenty = -1;
        this.emaThiry = -1;
        this.emaFifty = -1;
        this.emaOneHundred = -1;
        this.emaTwoHundred = -1;

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

        return this._setSimpleMovingAverage(period, average);
    };

    /**
     * Sets the simple moving average
     *
     * @method setSimpleMovingAverage
     * @for HistoricalPoint
     * @private
     */
    HistoricalPoint.prototype._setSimpleMovingAverage = function _setSimpleMovingAverage(period, average) {
        var averageLength = CONSTANTS.MOVING_AVERAGE_LENGTH;

        switch (period) {
            case averageLength.FIVE :
                this.smaFive = average;
                break;
            case averageLength.TEN :
                this.smaTen = average;
                break;
            case averageLength.TWENTY :
                this.smaTwenty = average;
                break;
            case averageLength.THIRTY :
                this.smaTHIRTY = average;
                break;
            case averageLength.FIFTY :
                this.smaFifty = average;
                break;
            case averageLength.ONE_HUNDRED :
                this.smaOneHunndred = average;
                break;
            case averageLength.TWO_HUNDRED :
                this.smaTwoHundred = average;
                break;
            default :
                new Error('Period "' + period + '" is not defined in HistoricalPoint');
                break;
        }

        console.log(this);
    };



    // TODO: historicalPoint - add toJSON method
    // TODO: historicalPoint - add fromJSON method

    return HistoricalPoint;
});
