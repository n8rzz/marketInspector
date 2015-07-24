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
         * @property MOVING_AVERAGE_LENGTH
         */
        MOVING_AVERAGE_LENGTH: {
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_LENGTH
             * @property
             */
            5: 5,
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_LENGTH
             * @property
             */
            10: 10,
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_LENGTH
             * @property
             */
            20: 20,
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_LENGTH
             * @property
             */
            30: 30,
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_LENGTH
             * @property
             */
            50: 50,
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_LENGTH
             * @property
             */
            100: 100,
            /**
             * @final
             * @type {string}
             * @memberof MOVING_AVERAGE_LENGTH
             * @property
             */
            200: 200
        }
    };


    return CONSTANTS;
});
