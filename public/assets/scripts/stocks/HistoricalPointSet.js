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
     * @method _init
     * @for HistoricalPointSet
     */
    HistoricalPointSet.prototype._init = function _init() {
        this.length = 0;
        this.items = [];
        this._averageCalculationController = new AverageCalculationController();

        return this;
    };

    /**
     * @method addPoint
     * @for HistoricalPointSet
     * @parm point {object|HistoricalPoint}
     */
    HistoricalPointSet.prototype.addPoint = function addPoint(point) {
        var index = this.length;
        this.items.push(point);
        this.length = this.items.length;
    };

    /**
     * @method addGroup
     * @for HistoricalPointSet
     * @parm group {object|HistoricalPoint}
     */
    HistoricalPointSet.prototype.addGroup = function addGroup(group) {
        var i;
        var length = group.length;

        for (i = 0; i < length; i++) {
            this.addPoint(group[i]);
        }
    };


    HistoricalPointSet.prototype.removePoint = function removePoint() {};
    HistoricalPointSet.prototype.removeGroup = function removeGroup() {};


    /////////////////////////////////////////////////////////////////////
    ///
    /////////////////////////////////////////////////////////////////////


    HistoricalPointSet.prototype.isFirstPoint = function isFirstPoint() {};
    HistoricalPointSet.prototype.isLastPoint = function isLastPoint() {};

    /**
     * Checks for existing historical data
     *
     * @method hasHistoricalData
     * @for HistoricalPointSet
     * @returns {boolean}
     */
    HistoricalPointSet.prototype.hasHistoricalData = function hasHistoricalData() {
        return this.length > 0;
    };

    HistoricalPointSet.prototype.getMostRecentPoint = function getMostRecentPoint() {};
    HistoricalPointSet.prototype.getOldestPoint = function getOldestpoint() {};
    HistoricalPointSet.prototype.findHighestHigh = function findHighestHigh() {};
    HistoricalPointSet.prototype.findLowestLow = function findLowestLow() {};

    /**
     * Loops through each item and sends a subset of his.items to the AveragesController to perform averages calculations
     *
     * @method buildHistoricalAverageData
     * @for HistoricalPointSet
     * @param calculationMode {string} TODO: historical - implement calculation modes for averages
     */
    HistoricalPointSet.prototype.buildHistoricalAverageData = function buildHistoricalAverageData(calculationType) {
        var i = (this.length - CONSTANTS.MOVING_AVERAGE_PERIOD.THREE.VALUE);
        var items;
        var calculationMode = calculationType || 'close';

        for (i; i > 0; i--) {
            items = this._prepareAverageCalculationSet(i);
            this._averageCalculationController.calculateSet(items, calculationMode);
            this._averageCalculationController.recycle();
        }
    };

    /**
     * Returns a subset of this.items offset by the length of the longest average + index
     * This method is used to effectively step through each item while still returning an array of this.items
     *
     * @method _prepareAverageCalculationSet
     * @for HistoricalPointSet
     * @param index {number}
     * @returns {Array}
     * @private
     */
    HistoricalPointSet.prototype._prepareAverageCalculationSet = function _prepareAverageCalculationSet(index) {
        return this.items.slice(index, this.length);
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////


    return HistoricalPointSet;
});
