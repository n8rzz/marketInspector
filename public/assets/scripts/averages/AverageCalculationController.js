define([
    '../lib/util/assert',
    '../lib/util/FinancialMath',
    '../lib/util/FastMath',
    '../lib/util/constants'
], function(
    assert,
    FinancialMath,
    FastMath,
    CONSTANTS
) {
    'use strict';

    var TYPES = [
        CONSTANTS.MOVING_AVERAGE_TYPE.SMA,
        CONSTANTS.MOVING_AVERAGE_TYPE.EMA
    ];

    var PERIODS = [
        CONSTANTS.MOVING_AVERAGE_PERIOD.THREE.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.FIVE.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.TEN.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.TWELVE.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.TWENTY.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.TWENTY_SIX.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.THIRTY.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.FIFTY.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.ONE_HUNDRED.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.TWO_HUNDRED.VALUE
    ];

    /**
     * @class AverageCalculationController
     * @constructor
     **/
    function AverageCalculationController() {
        return this._init();
    }

    /**
     * @method _init
     * @for AverageCalculationController
     * @private
     */
    AverageCalculationController.prototype._init = function _init() {
        this.index = 0;
        this.length = 0;
        this.valuesToAverage = [];
        this._validValuesToAverage = [];
        this._prevPoint = null;

        return this;
    };

    /**
     * @method calculate
     * @for AverageCalculationController
     * @param items {Array}
     * @param macdSignalLines {Array}
     * @param calculationMode {string|CONSTANTS}
     */
    AverageCalculationController.prototype.calculate = function calculate(items, macdSignalLines, calculationMode) {
        assert(assert.isArray(items), 'Items should be type Array');
        assert(assert.isString(calculationMode), 'CalculationMode should be type String');

        var status;

        status = this._calculateAverages(items, calculationMode);
        status += this._calculateMacdValuesForPoint(items, macdSignalLines);

        return status;
    };

    /**
     * @method calculateSet
     * @for AverageCalculationController
     * @param items {Array}
     */
    AverageCalculationController.prototype._calculateAverages = function _calculateAverages(items, calculationMode) {
        this.pullCalculationValuesFromModels(items, calculationMode);

        var i;
        var p;
        var period;
        var item;
        var status;
        this._prevPoint = items[0];

        for (i = 0; i < items.length; i++) {
            item = items[i];

            for (p = 0; p < PERIODS.length; p++) {
                period = PERIODS[p];

                if (!this._propertyNeedsCalculation(period, CONSTANTS.MOVING_AVERAGE_TYPE.SMA, item) &&
                    !this._propertyNeedsCalculation(period, CONSTANTS.MOVING_AVERAGE_TYPE.EMA, item)) {
                    continue
                }

                if (!this._isAverageSolvable(this.index, period)) {
                    break;
                }

                // If we made it this far, we should be able to add an average to a point without issue
                var smaValue = this._calculateSmaAveragesForPoint(period);
                status = item.requestToAddAverageToPoint(period, smaValue, CONSTANTS.MOVING_AVERAGE_TYPE.SMA);

                var emaValue = this._calculateEmaAveragesForPoint(period);
                status += item.requestToAddAverageToPoint(period, emaValue, CONSTANTS.MOVING_AVERAGE_TYPE.EMA);
            }

            if (status !== CONSTANTS.STATUS_CODES.SUCCESS.VALUE) {
                status = CONSTANTS.STATUS_CODES.NOT_SOLVABLE.VALUE;
            }
        }


        return status;
    };

    /**
     * @method _calculateAveragesForPoint
     * @for AverageCalculationController
     * @param period {string}
     * @returns {number}
     * @private
     */
    AverageCalculationController.prototype._calculateSmaAveragesForPoint = function _calculateSmaAveragesForPoint(period) {
        return FinancialMath.simpleMovingAverage(period, this._validValuesToAverage);
    };

    /**
     * @method _calculateEmaAveragesForPoint
     * @for AverageCalculationController
     * @param period {number}
     * @returns {number} emaValue
     * @private
     */
    AverageCalculationController.prototype._calculateEmaAveragesForPoint = function _calculateEmaAveragesForPoint(period) {
        // TODO: historical avg - this needs to be cleaned up
        var previousAverage;
        var previousEma = this._prevPoint.ema.getAverageByPeriod(period);
        var previousSma = this._prevPoint.sma.getAverageByPeriod(period);
        if (previousEma !== -1) {
            previousAverage = previousEma;
        } else {
            previousAverage = previousSma
        }

        var previousClose = this._prevPoint.close;

        return FinancialMath.exponentialMovingAverage(period, previousAverage, previousClose);
    };

    /**
     * @method _calculateMacdValuesForPoint
     * @for AverageCalculationController
     * @param items {Array}
     * @param macdSignalLines {Array}
     * @returns {number}
     * @private
     */
    AverageCalculationController.prototype._calculateMacdValuesForPoint = function _calculateMacdValuesForPoint(items, macdSignalLines) {
        var status;
        var macd;
        var signalLine;
        var point = items[0];
        var prevPoint = items[1];
        var twelveEma = point.ema.twelve;
        var twentySix = point.ema.twentySix;

        if (twelveEma === -1 || twentySix === -1) {
            return;
        }

        // calculate macd value
        macd = FastMath.difference(twelveEma, twentySix);
        status = point.requestToAddMacdToPoint(macd);

        // if this is the first signal line, populate with an SMA
        if (macdSignalLines.length === CONSTANTS.MOVING_AVERAGE_PERIOD.NINE.VALUE) {
            signalLine = FinancialMath.simpleMovingAverage(CONSTANTS.MOVING_AVERAGE_PERIOD.NINE.VALUE, macdSignalLines);
            status += point.requestToAddMacdSignalLineToPoint(signalLine);

        }
        // all other signal lines are calculated as an EMA
        else if (macdSignalLines.length > CONSTANTS.MOVING_AVERAGE_PERIOD.NINE.VALUE) {
            signalLine = FinancialMath.exponentialMovingAverage(CONSTANTS.MOVING_AVERAGE_PERIOD.NINE.VALUE, prevPoint.macd.signalLine, point.macd.macdLine);
            status += point.requestToAddMacdSignalLineToPoint(signalLine);

        }

        // if the previous point has both a macd and signal line value, calculate the difference for the histogram value
        if (prevPoint.hasMacdForPoint() && prevPoint.macd.hasSignalLine()) {
            var histogram = FastMath.difference(macd, signalLine);
            status += point.requestToAddHistogramToPoint(histogram);
        }

        return status;
    };


    /**
     * @method
     * @for AverageCalculationController
     * @param
     */
    AverageCalculationController.prototype.calculateStochastic = function calculateStochastic() {
        // %K = (Current Close - Lowest Low)/(Highest High - Lowest Low) * 100
        // %D = 3-day SMA of %K
        //
        // Lowest Low = lowest low for the look-back period
        // Highest High = highest high for the look-back period
        // %K is multiplied by 100 to move the decimal point two places
    };

    /**
     * Checks if an average is solvable from the current position in the set
     *
     * @param index {number} current index position in the set
     * @param period {number} length of the current average
     * @returns {boolean}
     * @private
     */
    AverageCalculationController.prototype._isAverageSolvable = function _isAverageSolvable(index, period) {
        return (this.length - index) >= period;
    };

    // TODO: rename fn
    // TODO: historical avg - move to HistoricalPoint or AverageModel
    /**
     * Determines if an average for a particular HistoricalPoint has been calculated already
     *
     * @method _propertyNeedsCalculation
     * @for AverageCalculationController
     * @param period {number} length of average being calculated
     * @param calculationMode {sting}
     * @param item {object|HistoricalPoint}
     * @returns {boolean}
     * @private
     */
    AverageCalculationController.prototype._propertyNeedsCalculation = function _propertyNeedsCalculation(period, calculationMode, item) {
        var mode = calculationMode.toLowerCase();
        var average = item[mode];

        switch (period) {
            case CONSTANTS.MOVING_AVERAGE_PERIOD.THREE.VALUE :
                return average.three === -1;
                break;

            case CONSTANTS.MOVING_AVERAGE_PERIOD.FIVE.VALUE :
                return average.five === -1;
                break;

            case CONSTANTS.MOVING_AVERAGE_PERIOD.TEN.VALUE :
                return average.ten === -1;
                break;

            case CONSTANTS.MOVING_AVERAGE_PERIOD.TWELVE.VALUE :
                return average.twelve === -1;
                break;

            case CONSTANTS.MOVING_AVERAGE_PERIOD.TWENTY.VALUE :
                return average.twenty === -1;
                break;

            case CONSTANTS.MOVING_AVERAGE_PERIOD.TWENTY_SIX.VALUE :
                return average.twentySix === -1;
                break;

            case CONSTANTS.MOVING_AVERAGE_PERIOD.THIRTY.VALUE :
                return average.thirty === -1;
                break;

            case CONSTANTS.MOVING_AVERAGE_PERIOD.FIFTY.VALUE :
                return average.fifty === -1;
                break;

            case CONSTANTS.MOVING_AVERAGE_PERIOD.ONE_HUNDRED.VALUE :
                return average.oneHundred === -1;
                break;

            case CONSTANTS.MOVING_AVERAGE_PERIOD.TWO_HUNDRED.VALUE :
                return average.twoHundred === -1;
                break;

            default :
                return true;
                break;
        }
    };

    /**
     * Loops through each item looking for the value that matches calculationMode and pushes them to an array
     *
     * // TODO: historical avg - if mode is not open, high, low or close, we need a new method to assemble those values.
     * @method pullCalculationValuesFromModels
     * @for AverageCalculationController
     * @param items {object|HistoricalPoint}
     * @param calculationMode {string}
     */
    AverageCalculationController.prototype.pullCalculationValuesFromModels = function pullCalculationValuesFromModels(items, calculationMode) {
        // TODO: historical avg - switch mode to enumeration

        var i;
        var item;

        for (i = 0; i < items.length; i++) {
            item = items[i];
            this.valuesToAverage.push(item[calculationMode]);
        }

        this.length = this.valuesToAverage.length;
        this._validValuesToAverage = this.valuesToAverage.slice(0);

        return this;
    };

    /**
     * Resets controller properties so it can be used again
     *
     * @method recycle
     * @for AverageCalculationController
     */
    AverageCalculationController.prototype.recycle = function recycle() {
        this.index = 0;
        this.length = 0;
        this.valuesToAverage = [];
        this._validValuesToAverage = [];
        this._prevPoint = null;
    };


    return AverageCalculationController;
});
