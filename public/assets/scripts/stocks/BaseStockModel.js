define([], function() {
    'use strict';

    var _id = 0;

    /**
     * @class BaseStockModel
     * @constructor
     **/
    function BaseStockModel() {
        this.id = (_id++);
        this.symbol = '';
        this.date = '';
        this.open = '';
        this.close = '';
        this.volume = '';
    }

    BaseStockModel.prototype.toJSON = function toJSON() {};
    BaseStockModel.prototype.fromJSON = function fromJSON() {};


    return BaseStockModel;
});
