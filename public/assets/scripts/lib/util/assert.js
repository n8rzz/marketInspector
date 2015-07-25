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
            throw new TypeError(msg);
        }
    }

    Assert.isNumber = function assertIsNumber(property) {
        return typeof property === 'number';
    };

    Assert.isString = function assertIsString(property) {
        return typeof property === 'string';
    };

    Assert.isObject = function assertIsObject(property) {
        return typeof property === 'object';
    };

    Assert.isArray = function assertIsArray(object) {
        return object instanceof Array;
    };


    return Assert;
});
