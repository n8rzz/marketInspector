define([
    '../lib/util/FastMath'
], function(
    FastMath
) {
    'use strict';

    var _id = 0;

    /**
     * @class Stock
     * @constructor
     * @param
     */
    function Stock(stock) {
        this.id = _id++;
        this.symbol = stock.symbol;
        this.name = stock.Name;
        this.volume = stock.Volume;
        this.open = stock.Open;
        this.close = stock.PreviousClose;
    }

    /**
     * @method fromJSON
     * @for Stock
     */
    Stock.prototype.fromJSON = function fromJSON(json) {
        this.symbol = json.symbol;
        this.name = json.Name;
        this.volume = json.Volume;
        this.open = json.Open;
        this.close = json.PreviousClose;

        return this;
    };

    /**
     * @method toJSON
     * @for Stock
     */
    Stock.prototype.toJSON = function toJSON() {};


    return Stock;
});