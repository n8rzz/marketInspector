define([], function() {
    'use strict';

    var _id = 0;

    /**
     * @class Stock
     * @constructor
     */
    function Stock() {

        return this.init();
    }

    /**
     * @method init
     * @for Stock
     */
    Stock.prototype.init = function init() {
        return this;
    };

    /**
     * @method init
     * @for Stock
     */
    Stock.prototype.fromJSON = function fromJSON(json) {

        return this;
    };

    /**
     * @method init
     * @for Stock
     */
    Stock.prototype.toJSON = function toJSON() {

    };


    return Stock;
});