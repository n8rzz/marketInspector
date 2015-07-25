define([
    '../lib/util/assert',
    '../lib/util/FastMath',
    '../lib/util/FinancialMath',
    '../lib/util/constants',
    './HistoricalPoint',
    '../averages/AverageCalculationController'
], function(
    assert,
    FastMath,
    FinancialMath,
    CONSTANTS,
    HistoricalPoint,
    AverageCalculationController
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
        this._averageCalculationController = new AverageCalculationController();

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
     *
     */
    HistoricalPointSet.prototype.buildHistoricalAverageData = function buildHistoricalAverageData() {
        console.log('buildHistoricalAverageData');

        var i;
        var index = 0;
        var calculationType = 'close';

        for (i = 0; i < this.length; i++) {
            var items = this._setupFirstAverageCalulationSet(index);
            var status = this._averageCalculationController.calculateSet(items, calculationType);
            console.log('top success_code', status, '\tindex:', index);
            // success

            // shift items; drop first, add (CONSTANTS.MOVING_AVERAGE_META.MAXIMUM_PERIOD_LENGTH + index)

            index++;
        }



    };

    /**
     * @method _setupFirstAverageCalculationSet
     * @for HistoricalPointSet
     * @param index {number}
     * @private
     */
    HistoricalPointSet.prototype._setupFirstAverageCalulationSet = function _setupFirstAverageCalculationSet(index) {
        var length = CONSTANTS.MOVING_AVERAGE_META.MAXIMUM_PERIOD_LENGTH;

        return this.items.slice(index, length);
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////


    return HistoricalPointSet;
});
