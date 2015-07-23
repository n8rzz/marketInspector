define([
    'angular',
    'jquery'
], function(
    angular,
    $
) {
    'use strict';

    return [
        '$http',
        function(
            $http
        ) {

            // var QUERY_VARS = {
            //     SYMBOL: 'AAPL',
            //     START_DATE: '2014-07-22',
            //     END_DATE: '2015-07-22'
            // };
// http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where symbol = "AMZN" and startDate = "2015-05-23" and endDate = "2015-07-22"&format=json&env=store://datatables.org/alltableswithkeys&callback=


            var QUERY_HEAD = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22';
            var YQL_START_DATE = '%22%20and%20startDate%20%3D%20%22';
            var YQL_END_DATE = '%22%20and%20endDate%20%3D%20%22';
            var QUERY_END = '%22&format=json&env=store://datatables.org/alltableswithkeys&callback=';

            /**
             * @class HistoricalStockDataService
             * @constructor
             */
            var HistoricalStockDataService = function() {};

            /**
             *
             * @param  {[type]} symbol    [description]
             * @param  {[type]} startDate [description]
             * @param  {[type]} endDate   [description]
             * @return {[type]}           [description]
             */
            HistoricalStockDataService.prototype.fetchDataPayload = function fetchDataPayload(symbol, startDate, endDate) {
                var response;
                var targetUrl = QUERY_HEAD + symbol + YQL_START_DATE + startDate + YQL_END_DATE + endDate + QUERY_END;

                console.log(targetUrl);

                 $.ajax({
                    method: 'GET',
                    url: targetUrl
                }).success(function(data) {
                    console.log(data);
                    response = data;
                });

                return response;
            };


            return new HistoricalStockDataService();
        }
    ];
});