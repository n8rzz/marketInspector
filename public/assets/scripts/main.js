require.config({
    baseUrl: '/assets/scripts',
    waitSeconds: 30,
    paths: {
        'requirejs': '../vendor/requirejs/require',
        'jquery': '../vendor/jquery/dist/jquery',
        'angular': '../vendor/angular/angular',
        'text': '../vendor/requirejs-text/text',
        'moment': '../vendor/moment/moment'
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    },
    deps: [
        './bootstrap'
    ]
});
