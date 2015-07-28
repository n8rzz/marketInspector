define([
    '../lib/util/assert',
    '../lib/util/constants'
], function(
    assert,
    CONSTANTS
) {
    'use strict';

    var _id =0;

    /**
     * @class MacdModel
     * @constructor
     **/
    function MacdModel() {
        this.id = (_id++);
        this.macdLine = null;
        this.signalLine = null;
        this.histogram = null;
    }

    /**
     * @method setMacd
     * @for MacdModel
     * @param macd {number}
     */
    MacdModel.prototype.setMacd = function setMacd(macd) {
        assert(assert.isNumber(macd), 'Expected MACD to be a number');

        this.macdLine = macd;

        return CONSTANTS.STATUS_CODES.SUCCESS.VALUE;
    };

    /**
     * @method setSignalLine
     * @for MacdModel
     * @param signalLine {number}
     */
    MacdModel.prototype.setSignalLine = function setSignalLine(signalLine) {
        assert(assert.isNumber(signalLine), 'Expected SignalLine to be a number');

        this.signalLine = signalLine;

        return CONSTANTS.STATUS_CODES.SUCCESS.VALUE;
    };

    /**
     * @method setHistogram
     * @for MacModel
     * @param histogram {number}
     */
    MacdModel.prototype.setHistogram = function setHistogram(histogram) {
        assert(assert.isNumber(histogram), 'Expected Histogram to be a number');

        this.histogram = histogram;

        return CONSTANTS.STATUS_CODES.SUCCESS.VALUE;
    };

    /**
     * @method getMacd
     * @for MacdModel
     * @returns {number}
     */
    MacdModel.prototype.getMacd = function getMacd() {
        return this.macdLine;
    };

    /**
     * @method getSignalLine
     * @for MacdModel
     * @returns {number}
     */
    MacdModel.prototype.getSignalLine = function getSignalLine() {
        return this.signalLine;
    };

    /**
     * @method getHistogram
     * @for MacdModel
     * @returns {number}
     */
    MacdModel.prototype.getHistogram = function getHistogram() {
        return this.histogram;
    };

    /**
     *
     */
    MacdModel.prototype.hasMacd = function hasMacd() {
        return this._hasMacd();
    };

    /**
     *
     * @private
     */
    MacdModel.prototype._hasMacd = function _hasMacd() {
        return this.macdLine !== null;
    };

    MacdModel.prototype.hasSignalLine = function hasSignalLine() {
        return this._hasSignalLine();
    };

    MacdModel.prototype._hasSignalLine = function _hasSignalLine() {
        return this.signalLine !== null;
    };

    return MacdModel;
});
