define(function(require) {
    'use strict';

    /**
     * @class Assert
     * @constructor
     * @param condition
     * @param msg
     */
    function Assert(condition, msg) {
        if (!condition) {
            throw new Error(msg);
        }
    }

    Assert.prototype.isNumber = function isNumber(property) {
        return typeof property === 'number';
    };

    Assert.prototype.isArray = function isArray(object) {
        return object instanceof Array;
    };


    return Assert;
});
