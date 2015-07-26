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

    var STATUS_CODES = CONSTANTS.STATUS_CODES;

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

    // TODO historical - add averageType switch
    /**
     * @method requestToAddAverageToPoint
     * @for HistoricalPoint
     * @param period {string|CONSTANTS}
     * @param average {number}
     * @param averageType {string} expects either sma or ema
     * @returns {number}
     */
    HistoricalPoint.prototype.requestToAddAverageToPoint = function requestToAddAverageToPoint(period, average, averageType) {
        assert(assert.isNumber(period), 'Period must be a number');
        assert(assert.isNumber(average), 'Average must be a number');
        assert((averageType === CONSTANTS.MOVING_AVERAGE_TYPE.SMA) || (averageType === CONSTANTS.MOVING_AVERAGE_TYPE.EMA), 'Unknown moving average type');

        var status;

        switch (averageType) {
            case CONSTANTS.MOVING_AVERAGE_TYPE.SMA :
                status = this.sma.setAverage(period, average);
                break;
            case CONSTANTS.MOVING_AVERAGE_TYPE.EMA :
                status = this.ema.setAverage(period, average);
                break;
            default :
                break;
        }

        if (status !== CONSTANTS.STATUS_CODES.SUCCESS.VALUE) {
            console.log('uh oh:', CONSTANTS.STATUS_CODES.SUCCESS.VALUE);
        }

        return status;
    };

    // TODO: historicalPoint - add toJSON method
    // TODO: historicalPoint - add fromJSON method

    return HistoricalPoint;
});
