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
         *
         * @param period {number}
         * @param points {Array}
         * @returns {number}
         */
        simpleMovingAverage: function simpleMovingAverage(period, points) {
            assert(period === points.length, 'Period length and Points length must be equal');
            assert(assert.isArray(points), 'Points must be an Array of values');

            var i;
            var length = points.length;
            var sum = 0;

            for (i = 0; i < length; i++) {
                sum += length[i];
            }

            return sum / period;
        },

        exponentialMovingAverage: function exponentialMovingAverage(period, points) {},

        // stochastic
        // macd

    };

});
