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
         * @method simpleMovingAverage
         * @for FinancialMath
         * @param period {number} number to divide sum of values by
         * @param values {Array|number} array of values to calculate average from
         * @returns {number} average of values over a given period
         */
        simpleMovingAverage: function simpleMovingAverage(period, values) {
            assert(assert.isNumber(period), 'Period must be a number');
            assert(period <= values.length, 'Period length and Points length must be equal');
            assert(assert.isArray(values), 'Points must be an Array of values');

            var i;
            var sum = 0;

            for (i = 0; i < period; i++) {
                sum += values[i];
            }

            return sum / period;
        },

        /**
         * @method exponentialMovingAverage
         * @for FinancialMath
         * @param period {number|CONSTANTS}
         * @param previousAverage {number} either ema, or sma of same period if ema doesn't exist for previous point
         * @param previousClose {number}
         * @returns {number}
         */
        exponentialMovingAverage: function exponentialMovingAverage(period, previousAverage, previousClose) {
            var multiplier = 2 / (period + 1);

            return (previousClose - previousAverage) * multiplier + previousAverage;
        },

        macd: function macd() {
            // macd =  12 day EMA - 26 day EMA  (10 and 30)
            // signal = EMA of Difference
            // histogram = macd - signal


        }


        // stochastic
    };

});
