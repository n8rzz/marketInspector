define([], function() {
    'use strict';

    /**
     *
     * @final
     * @type {object}
     * @namespace CONSTANTS
     */
    var CONSTANTS = {
        /**
         * @final
         * @type {object}
         * @memberof CONSTANTS
         * @property UNITS
         */
        UNITS: {
            /**
             * @final
             * @type {string}
             * @memberof UNITS
             * @property
             */
            DOLLARS: 'DOLLARS',
            /**
             * @final
             * @type {string}
             * @memberof
             * @property
             */
            PERCENTAGE: 'PERCENTAGE',
            /**
             * @final
             * @type
             * @memberof
             * @property
             */
            FINANCIAL: 'FINANCIAL',
            /**
             * @final
             * @type
             * @memberof
             * @property
             */
            STANDARD: 'STANDARD',
            /**
             * @final
             * @type
             * @memberof
             * @property
             */
            STANDARD_COMMA: 'STANDARD_COMMA'
        },
        /**
         * @final
         * @type {object}
         * @memberof CONSTANTS
         * @property MOVING_AVERAGE_TYPE
         */
        MOVING_AVERAGE_TYPE: {
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_TYPE
             * @property
             */
            SMA: 'SMA',
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_TYPE
             * @property
             */
            EMA: 'EMA'
        },
        /**
         * @final
         * @type {object}
         * @memberof CONSTANTS
         * @property MOVING_AVERAGE_PERIOD
         */
        MOVING_AVERAGE_PERIOD: {
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_PERIOD
             * @property FIVE
             */
            FIVE: {
                KEY: 'FIVE',
                VALUE: 5
            },
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_PERIOD
             * @property TEN
             */
            TEN: {
                KEY: 'TEN',
                VALUE: 10
            },
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_PERIOD
             * @property TEN
             */
            TWENTY: {
                KEY: 'TWENTY',
                VALUE: 20
            },
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_PERIOD
             * @property THIRTY
             */
            THIRTY: {
                KEY: 'THIRTY',
                VALUE: 30
            },
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_PERIOD
             * @property FIFTY
             */
            FIFTY: {
                KEY: 'FIFTY',
                VALUE: 50
            },
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_PERIOD
             * @property ONE_HUNDRED
             */
            ONE_HUNDRED: {
                KEY: 'ONE_HUNDRED',
                VALUE: 100
            },
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_PERIOD
             * @property TWO_HUNDRED
             */
            TWO_HUNDRED: {
                KEY: 'TWO_HUNDRED',
                VALUE: 200
            },
        },
        /**
         * @final
         * @type {object}
         * @memberof CONSTANTS
         * @property MOVING_AVERAGE_META
         */
        MOVING_AVERAGE_META: {
            ITEMS: 7,
            MINIMUM_PERIOD_LENGTH: 5,
            MAXIMUM_PERIOD_LENGTH: 200
        }
    };


    return CONSTANTS;
});
