define([
    '../lib/util/FastMath'
], function(
    FastMath
) {
    'use strict';

    /**
     * @class StockCollection
     * @constructor
     */
    function StockCollection() {
        this.init();
    }

    /**
     * @method init
     * @for StockCollection
     */
    StockCollection.prototype.init = function init() {
        this.length = 0;
        this.items = [];

        return this;
    };

    /**
     * @method addStock
     * @for StockCollection
     */
    StockCollection.prototype.addStock = function addStock(stock) {
        var index = this.length;
        this.items.push(stock);
        this.length = this.items.length;
    };

    /**
     * @method addGroup
     * @for StockCollection
     */
    StockCollection.prototype.addGroup = function addGroup(stockGroup) {
        var i;
        var length = stockGroup.length;

        for (i = 0; i < length; i++) {
            this.addStock(stockGroup[i]);
        }
    };

    /**
     * @method removeStock
     * @for StockCollection
     */
    StockCollection.prototype.removeStock = function removeStock(stock) {};

    /**
     * @method removeGroup
     * @for StockCollection
     */
    StockCollection.prototype.removeGroup = function removeGroup(stockGroup) {};


    return StockCollection;
});