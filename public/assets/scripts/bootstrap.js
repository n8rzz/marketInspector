define([
    'app',
    'angular',
    'jquery'
],
    function (
        app,
        angular
    ) {
        'use strict';

        // bootstrap angular
        var $html = angular.element(document.getElementsByTagName('html')[0]);

        angular.element().ready(function () {
            $html.addClass('ng-app').attr('id', 'ng-app');
            angular.bootstrap($html, [app.name]);
        });

    }
);