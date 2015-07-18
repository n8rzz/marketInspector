define([], function() {
    'use strict';

    return {
        /**
         * @method abs
         * @for FastMath
         * @param a {number}
         * @return {number} absoulte value of a
         */
        abs: function abs(a) {
            if (a < 0) {
                return -a;
            }

            return a;
        },
        /**
         * @method difference
         * @for  FastMath
         * @param  {number} a
         * @param  {number} b
         * @return {number} difference between a and b
         */
        difference: function (a, b) {
            return a - b;
        },


    };
});