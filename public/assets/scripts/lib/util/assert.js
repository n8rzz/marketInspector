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

    Assert.isNumber = function isNumber(property) {
        return typeof property === 'number';
    };

    Assert.isArray = function isArray(object) {
        return object instanceof Array;
    };


    return Assert;
});
