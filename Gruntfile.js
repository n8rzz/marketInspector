'use strict';

module.exports = function(grunt) {
    require('time-grunt')(grunt);
    // require('jit-grunt')(grunt)({ customTasksDir: 'tools/tasks' });

    var CONFIG = {
        SRC: 'public/src',
        WEB: 'public/web'
    };

    grunt.initConfig({
        pkg: require('./package.json'),
        config: CONFIG,

        clean: {
            build: {
                src: '/public/src'
            }
        },
        copy: {
            assets: {
                expand: true,
                cwd: 'public/src/',
                src: [
                    '**',
                    '!assets/scss/base',
                    '!assets/scss/helpers',
                    '!assets/scss/landmarks',
                    '!assets/scss/modules'
                ],
                dest: 'public/web/'
            }
        }
    });

    grunt.registerTask('default', []);

    grunt.registerTask('build', [
        'clean:build',
        'copy:assets'
    ]);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};