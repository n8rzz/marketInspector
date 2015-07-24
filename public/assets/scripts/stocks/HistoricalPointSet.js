define([
    '../lib/util/assert',
    '../lib/util/FastMath',
    '../lib/util/FinancialMath',
    '../lib/util/constants',
    './HistoricalPoint'
], function(
    assert,
    FastMath,
    FinancialMath,
    CONSTANTS,
    HistoricalPoint
) {
    'use strict';

    /**
     * @class HistoricalPointSet
     * @constructor
     **/
    function HistoricalPointSet() {
        return this._init();
    }

    /**
     *
     */
    HistoricalPointSet.prototype._init = function _init() {
        this.length = 0;
        this.items = [];

        return this;
    };

    /**
     *
     */
    HistoricalPointSet.prototype.addPoint = function addPoint(point) {
        var index = this.length;
        this.items.push(point);
        this.length = this.items.length;
    };

    /**
     *
     */
    HistoricalPointSet.prototype.addGroup = function addGroup(group) {
        var i;
        var length = group.length;

        for (i = 0; i < length; i++) {
            this.addPoint(group[i]);
        }
    };

    /**
     *
     */
    HistoricalPointSet.prototype.removePoint = function removePoint() {};

    /**
     *
     */
    HistoricalPointSet.prototype.removeGroup = function removeGroup() {};


    /////////////////////////////////////////////////////////////////////
    ///
    /////////////////////////////////////////////////////////////////////


    HistoricalPointSet.prototype.isFirstPoint = function isFirstPoint() {};
    HistoricalPointSet.prototype.isLastPoint = function isLastPoint() {};
    HistoricalPointSet.prototype.findHighestHigh = function findHighestHigh() {};
    HistoricalPointSet.prototype.findLowestLow = function findLowestLow() {};

    /**
     * @method calculateAverage
     * @for HistoricalPointSet
     * @param type
     * @param period
     */
    HistoricalPointSet.prototype.calculateAverage = function calculateAverage(type, period) {
        console.log('calculateSimpleMovingAverage', 'type:', type, '\tperiod:', period);

        // TODO: historical - new method, assembleValuesToAverage
        var i;
        var item;
        var index;
        var valuesToAverage = [];
        var length = this.length - 1;

        for (i = 0; i < period; i++) {
            item = this.items[i];
            valuesToAverage.push(item.close);

            index = i;
        }
debugger;
        switch (type) {
            case CONSTANTS.MOVING_AVERAGE_TYPE.SMA :
                // TODO: historical - new method, calculateSimpleMovingAverageForPeriod
                var smaLabel = 'sma' + period;

                // TODO: historical - new method, averageCalculationTest
                // are there enough values to calculate the avg?
                var smaValue = FinancialMath.simpleMovingAverage(period, valuesToAverage);

                console.log('smaLabel:', smaLabel, '\tsmaValue:', smaValue);

                // TODO: historical - new method, addAverageToHistoricalPoint
                this.items[0].requestToAddAverageToPoint(period, smaValue);

                break;
            case CONSTANTS.MOVING_AVERAGE_TYPE.EMA :
                console.log('ema', index);
                break;
            default:
                break;
        }
    };

    /**
     *
     * @param startDate
     * @param endDate
     * @param period
     */
    HistoricalPointSet.prototype.calculateSimpleMovingAverage = function calculateSimpleMovingAverage(startDate, endDate, period) {};

    /**
     *
     * @param startDate
     * @param endDate
     * @param period
     */
    HistoricalPointSet.prototype.calculateExponentialMovingAverage = function calculateExponentialMovingAverage(startDate, endDate, period) {};


    return HistoricalPointSet;
});
