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


    return Assert;
});