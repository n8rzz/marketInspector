define([
    '../lib/util/assert',
    '../lib/util/constants'
], function(
    assert,
    CONSTANTS
) {
    'use strict';

    var _id = 0;

    /**
     * @class AverageModel
     * @constructor
     **/
    function AverageModel(type) {
        assert(assert.isString(type), 'AverageModel type should be a String');

        this.id = (_id++);
        this.type = type;

        //TODO: historical avg - this should be dynamic so that if avgs are ever added or removed this object can be created on the fly
        this.five = -1;
        this.ten = -1;
        this.twenty = -1;
        this.thirty = -1;
        this.fifty = -1;
        this.oneHundred = -1;
        this.twoHundred = -1;
    }

    /**
     * Returns the object property value for the requested period
     *
     * @method getAverageByPeriod
     * @for AverageModel
     * @param period {number}
     * @returns {number|AverageModel}
     */
    AverageModel.prototype.getAverageByPeriod = function getAverageByPeriod(period) {
        assert(assert.isNumber(period), 'Period should be a number');

        switch (period) {
            case CONSTANTS.MOVING_AVERAGE_PERIOD.FIVE.VALUE :
                return this.five;
                break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.TEN.VALUE :
                return this.ten;
                break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.TWENTY.VALUE :
                return this.twenty;
                break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.THIRTY.VALUE :
                return this.thirty;
                break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.FIFTY.VALUE :
                return this.fifty;
                break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.ONE_HUNDRED.VALUE :
                return this.oneHundred;
                break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.TWO_HUNDRED.VALUE :
                return this.twoHundred;
                break;
            default :
                return null;
                break;
        }
    };

    /**
     * @method setAverageByPeriod
     * @param period {number|CONSTANTS}
     * @param value {number}
     * @returns
     */
    AverageModel.prototype.setAverageByPeriod = function setAverageByPeriod(period, value) {
        assert(assert.isNumber(period), 'Period should be a number');
        assert(assert.isNumber(value), 'Value should be a number');

        switch (period) {
            case CONSTANTS.MOVING_AVERAGE_PERIOD.FIVE.VALUE :
                this.five = value;
                break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.TEN.VALUE :
                this.ten = value;
                break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.TWENTY.VALUE :
                this.twenty = value;
                break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.THIRTY.VALUE :
                this.thirty = value;
                break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.FIFTY.VALUE :
                this.fifty = value;
                break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.ONE_HUNDRED.VALUE :
                this.oneHundred = value;
                break;
            case CONSTANTS.MOVING_AVERAGE_PERIOD.TWO_HUNDRED.VALUE :
                this.twoHundred = value;
                break;
            default :
                new Error('Period "' + period + '" is not defined in HistoricalPoint. STATUS_CODE: ' + CONSTANTS.STATUS_CODES.UNDEFINED.VALUE);

                return CONSTANTS.STATUS_CODES.UNDEFINED.VALUE;
                break;
        }

        return CONSTANTS.STATUS_CODES.SUCCESS.VALUE;
    };


    return AverageModel;
});
