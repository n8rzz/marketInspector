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

    /**
     *
     */
    HistoricalPointSet.prototype.findHighestHigh = function findHighestHigh() {};

    /**
     *
     */
    HistoricalPointSet.prototype.findLowestLow = function findLowestLow() {};

    /**
     *
     */
    HistoricalPointSet.prototype.calculateAverage = function calculateAverage(type, period, startDate, endDate) {
        console.log('calculateSimpleMovingAverage', 'type:', type, '\tperiod:', period);
        var i;
        var item;
        var index;
        var prices = [];
        var length = this.length - 1;

        for (i = 0; i < period; i++) {
            index = length - i;
            item = this.items[index];
            prices.push(item.close);
        }

        switch (type) {
            case CONSTANTS.MOVING_AVERAGE_TYPE.SMA :
                var smaLabel = 'sma' + period;
                var smaValue = FinancialMath.simpleMovingAverage(period, prices);

                console.log('smaLabel:', smaLabel, '\tsmaValue:', smaValue);

                //this.items[index - 1].requestToAddAverageToPoint()

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
