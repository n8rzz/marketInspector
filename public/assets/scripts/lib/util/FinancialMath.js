define([
    './assert',
    './FastMath',
    './constants'
], function(
    assert,
    FastMath,
    CONSTANTS
) {
    'use strict';

    /**
     * @class FinancialMath
     * @constructor
     **/
    return {
        /**
         * Calculates the simple moving average (SMA) for a given period
         * Calculated as sum(values) / period
         *
         * @param period {number} number to divide sum of values by
         * @param values {Array|number} array of values to calculate average from
         * @returns sum {number} average of values over a given period
         */
        simpleMovingAverage: function simpleMovingAverage(period, values) {
            assert(assert.isNumber(period), 'Period must be a number');
            assert(period === values.length, 'Period length and Points length must be equal');
            assert(assert.isArray(values), 'Points must be an Array of values');

            var i;
            var length = values.length;
            var sum = 0;

            for (i = 0; i < length; i++) {
                sum += values[i];
            }

            return sum / period;
        },

        exponentialMovingAverage: function exponentialMovingAverage(period, values) {},

        // stochastic
        // macd

    };

});
