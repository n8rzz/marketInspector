define([], function() {
    'use strict';

    /**
     * @class  FastMath
     * #constructor
     */
    function FastMath() {}

    /**
     * @method  abs
     * @for  FastMath
     * @param  a {number}
     * @return {number} absoulte value of a
     */
    FastMath.prototype.abs = function abs(a) {
        if (a < 0) {
            return -a;
        }

        return a;
    };


    return FastMath;
});