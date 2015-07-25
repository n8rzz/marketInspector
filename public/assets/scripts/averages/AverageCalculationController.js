define([
    '../lib/util/assert',
    '../lib/util/FinancialMath',
    '../lib/util/constants'
], function(
    assert,
    FinancialMath,
    CONSTANTS
) {
    'use strict';

    var TYPES = [
        CONSTANTS.MOVING_AVERAGE_TYPE.SMA,
        CONSTANTS.MOVING_AVERAGE_TYPE.EMA
    ];

    var PERIODS = [
        CONSTANTS.MOVING_AVERAGE_PERIOD.TWO_HUNDRED.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.ONE_HUNDRED.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.FIFTY.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.THIRTY.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.TWENTY.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.TEN.VALUE,
        CONSTANTS.MOVING_AVERAGE_PERIOD.FIVE.VALUE
    ];

    /**
     * @class AverageCalculationController
     * @constructor
     **/
    function AverageCalculationController() {
        return this._init();
    }

    /**
     *
     * @param items
     * @returns
     * @private
     */
    AverageCalculationController.prototype._init = function _init() {
        this.valuesToAverage = [];
        this._validValuesToAverage = [];
        this.length = 0;
        this.index = 0;

        return this;
    };

    AverageCalculationController.prototype.calculateSet = function calculateSet(items, calculationMode) {
        assert(assert.isArray(items), 'Items should be type Array');
        assert(assert.isString(calculationMode), 'CalculationMode should be type String');

        this.pullCalculationValuesFromModels(items, calculationMode);

        var i;
        var p;
        var period;
        var item;
        var status;

        for (p = 0; p < PERIODS.length; p++) {
            period = PERIODS[p];
            if (!this._isAverageSolvable(this.index, period)) {
                continue;
            }

            for (i = 0; i < items.length; i++) {
                item = items[i];
                if (!this._isAverageSolvable(i, period) || !this._propertyNeedsCalculation(period, CONSTANTS.MOVING_AVERAGE_TYPE.SMA, item)) {
                    continue;
                }

                var smaValue = this._calculateAveragesForPoint(period, item);
                status = item.requestToAddAverageToPoint(period, smaValue)


            }

            this.index = 0;
        }
    };

    /**
     *
     * @param period
     */
    AverageCalculationController.prototype._calculateAveragesForPoint = function _calculateAveragesForPoint(period, point) {
        var smaValue = FinancialMath.simpleMovingAverage(period, this._validValuesToAverage);
        //var emaValue = FinancialMath.exponentialMovingAverage(period, this._validValuesToAverage)

        this._updateCalculationPosition();

        return smaValue;
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

    /**
     *
     * @param period {number}
     * @param calculationMode {sting}
     * @param item {object}
     * @returns {boolean}
     * @private
     */
    AverageCalculationController.prototype._propertyNeedsCalculation = function _propertyNeedsCalculation(period, calculationMode, item) {
        var mode = calculationMode.toLowerCase();
        var average = item[mode];

        switch (period) {
            case CONSTANTS.MOVING_AVERAGE_PERIOD.TWO_HUNDRED.VALUE :
                return average.twoHundred === -1;

            break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.ONE_HUNDRED.VALUE :
                return average.oneHundred === -1;

            break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.FIFTY.VALUE :
                return average.fifty === -1;

            break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.THIRTY.VALUE :

                return average.thirty === -1;
            break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.TWENTY.VALUE :

                return average.twenty === -1;
            break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.TEN :

                return average.ten === -1;
            break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.FIVE.VALUE :

                return average.five === -1;
            break;

            default :
                return true;
                break;
        }
    };

    /**
     * Increments the index by 1
     * Progressively steps through the valuesToAverage array by creating a copy
     * Starting at the index value
     *
     * @method _updateCalculationPosition
     * @for AverageCalculationController
     * @private
     */
    AverageCalculationController.prototype._updateCalculationPosition = function _updateCalculationPosition() {
        this.index++;
        this._validValuesToAverage = this.valuesToAverage.slice(this.index, this.length);
    };



    /**
     *
     * @param items {object|HistoricalPoint}
     * @param calculationMode {string}
     */
    AverageCalculationController.prototype.pullCalculationValuesFromModels = function pullCalculationValuesFromModels(items, calculationMode) {
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


    return AverageCalculationController;
});
