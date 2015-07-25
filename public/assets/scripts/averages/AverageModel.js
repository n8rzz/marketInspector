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

        this.five = -1;
        this.ten = -1;
        this.twenty = -1;
        this.thirty = -1;
        this.fifty = -1;
        this.oneHundred = -1;
        this.twoHundred = -1;
    }

    /**
     *
     * @param period
     * @param value
     * @returns
     */
    AverageModel.prototype.setAverage = function setAverage(period, value) {
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

        return CONSTANTS.STATUS_CODES.SUCCESS;
    };


    return AverageModel;
});
