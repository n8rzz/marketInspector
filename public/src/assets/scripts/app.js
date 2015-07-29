define([
    'angular',
    'controllers',
    // 'filters',
    'services',
    'directives',
], function (
    ng
) {
    'use strict';

    return ng.module('mi', [
        'mi.controllers',
        // 'mi.filters',
        'mi.services',
         'mi.directives'
    ]);
});