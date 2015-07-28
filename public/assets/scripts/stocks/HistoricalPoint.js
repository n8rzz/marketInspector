define([
    '../lib/util/assert',
    '../lib/util/constants',
    './BaseStockModel',
    '../averages/AverageModel',
    '../averages/MacdModel'
], function(
    assert,
    CONSTANTS,
    BaseStockModel,
    AverageModel,
    MacdModel
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
        this.macd = new MacdModel();

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
                status = this.sma.setAverageByPeriod(period, average);
                break;
            case CONSTANTS.MOVING_AVERAGE_TYPE.EMA :
                status = this.ema.setAverageByPeriod(period, average);
                break;
            default :
                break;
        }

        if (status !== CONSTANTS.STATUS_CODES.SUCCESS.VALUE) {
            console.log('uh oh:', CONSTANTS.STATUS_CODES.SUCCESS.VALUE);
        }

        return status;
    };

    /**
     * @for HistoricalPoint
     * @param macd {number}
     * @returns {number|CONSTANTS}
     */
    HistoricalPoint.prototype.requestToAddMacdToPoint = function requestToAddMacdToPoint(macd) {
        assert(assert.isNumber(macd), 'Expected MACD value to be a number');

        var status = this.macd.setMacd(macd);

        return status;
    };

    /**
     * @method requestToAddMacdSignalLineToPoint
     * @for HistoricalPoint
     * @param signalLine {number}
     */
    HistoricalPoint.prototype.requestToAddMacdSignalLineToPoint = function requestToAddMacdSignalLineToPoint(signalLine) {
        assert(assert.isNumber(signalLine), 'Expected MACD Signal line to be a number');

        var status = this.macd.setSignalLine(signalLine);

        return status;
    };

    HistoricalPoint.prototype.requestToAddHistogramToPoint = function requestToAddHistogramToPoint(histogram) {
        var status = this.macd.setHistogram(histogram);

        return status;
    };

    HistoricalPoint.prototype.hasMacdForPoint = function hasMacdForPoint() {
        return this.macd.hasMacd();
    };

    // TODO: historicalPoint - add toJSON method
    // TODO: historicalPoint - add fromJSON method

    return HistoricalPoint;
});
