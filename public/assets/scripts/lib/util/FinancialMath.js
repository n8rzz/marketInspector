define([
    './assert'
], function(
    assert
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
            assert(assert.isNumber(period), 'Expected Period to be a number');
            assert(assert.isNumber(previousAverage), 'Expected Previous Average to be a number');
            assert(assert.isNumber(previousClose), 'Expected Previous Close to be a number');

            var multiplier = 2 / (period + 1);

            return (previousClose - previousAverage) * multiplier + previousAverage;
        },
        /**
         *
         * @param currentClose
         * @param lowestLow
         * @param highestHigh
         */
        stochasticPercentK: function stochasticPercentK(currentClose, lowestLow, highestHigh) {
            assert(assert.isNumber(currentClose), 'Expected Current Close to be a number');
            assert(assert.isNumber(lowestLow), 'Expected Lowest Low to be a number');
            assert(assert.isNumber(highestHigh), 'Expected Highest High to be a number');

            return ((currentClose - lowestLow) / (highestHigh / lowestLow)) * 100;
        }
    };

});
