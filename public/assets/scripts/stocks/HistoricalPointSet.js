define([
    '../lib/util/assert',
    '../lib/util/FastMath',
    './HistoricalPoint'
], function(
    assert,
    FastMath,
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
     * @param startDate
     * @param endDate
     * @param period
     */
    HistoricalPointSet.prototype.calculateSimpleMovingAverage = function calculateSimpleMovingAverage(startDate, endDate, period) {

    };

    /**
     *
     * @param startDate
     * @param endDate
     * @param period
     */
    HistoricalPointSet.prototype.calculateExponentialMovingAverage = function calculateExponentialMovingAverage(startDate, endDate, period) {

    };


    return HistoricalPointSet;
});
