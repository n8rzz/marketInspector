define([], function() {
    'use strict';

    var _id = 0;

    /**
     * @class StochasticModel
     * @constructor
     **/
    function StochasticModel() {
        this.id = (_id++);
        this.period = null;
        this.highestHigh = null;
        this.lowestLow = null;
        this.percentK = null;
        this.percentD = null;
    }

    /**
     * @method getPeriod
     * @for StochasticModel
     * @returns {number}
     */
    StochasticModel.prototype.getPeriod = function getPeriod() {
        return this.period;
    };

    /**
     * @method getHighestHigh
     * @for StochasticModel
     * @returns {number}
     */
    StochasticModel.prototype.getHighestHigh = function getHighestHigh() {
        return this.highestHigh;
    };

    /**
     * @method getLowestLow
     * @for StochasticModel
     * @returns {number}
     */
    StochasticModel.prototype.getLowestLow = function getLowestLow() {
        return this.lowestLow;
    };

    /**
     * @method getPercentK
     * @for StochasticModel
     * @returns {number}
     */
    StochasticModel.prototype.getPercentK = function getPercentK() {
        return this.percentK;
    };

    /**
     * @method getPercentD
     * @for StochasticModel
     * @returns {number}
     */
    StochasticModel.prototype.getPercentD = function getPercentD() {
        return this.percentD;
    };

    /**
     * @method setPeriod
     * @for StochasticModel
     * @param period {number}
     */
    StochasticModel.prototype.setPeriod = function setPeriod(period) {
        this.period = period;
    };

    /**
     * @method setHighestHigh
     * @for StochasticModel
     * @param highestHigh {number}
     */
    StochasticModel.prototype.setHighestHigh = function setHighestHigh(highestHigh) {
        this.highestHigh = highestHigh;
    };

    /**
     * @method setLowestLow
     * @for StochasticModel
     * @param lowestLow {number}
     */
    StochasticModel.prototype.setLowestLow = function setLowestLow(lowestLow) {
        this.lowestLow = lowestLow;
    };

    /**
     * @method setPercentK
     * @for StochasticModel
     * @param percentK {number}
     */
    StochasticModel.prototype.setPercentK = function setPercentK(percentK) {
        this.percentK = percentK;
    };

    /**
     * @method setPercentD
     * @for StochasticModel
     * @param percentD {number}
     */
    StochasticModel.prototype.setPercentD = function setPercentD(percentD) {
        this.percentD = percentD;
    };

    /**
     * @method fromJSON
     * @for StochasticModel
     * @param json {Object|JSON}
     */
    StochasticModel.prototype.fromJSON = function fromJSON(json) {
        this.id = (_id++);

        this.period = json.period;
        this.highestHigh = json.highestHigh;
        this.lowestLow = json.lowestLow;
        this.percentK = json.percentK;
        this.percentD = json.percentD;
    };

    return StochasticModel;
});
