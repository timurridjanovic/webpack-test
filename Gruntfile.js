
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['public/js/main.js', 'public/js/router/*.js', 'public/js/component_manager/*.js'],
                dest: 'temp/temp_build.js'
            }
        },

        webpack: {

            thinkacademy: {
                entry: './temp/temp_build.js',

                output: {
                    path: "./build/js/",
                    filename: "bundle.[hash].js"
                },

                stats: {
                    colors: false,
                    modules: false,
                    reasons: false
                },

                storeStatsTo: "bundle_hash",
                plugins: [new HtmlWebpackPlugin({
                    title: 'webpack test',
                    filename: '../index.html',
                    template: './views/index.html'
                })]
            }
        },

        clean: {
            bundles: ["build/js/**/*", "temp/**", "!build/js/bundle.<%= bundle_hash.hash %>.js"],
        },

        watch: {
            scripts: {
                files: ['public/**/*', 'views/index.html'],
                tasks: ['concat', 'webpack', 'clean']
            }
        },
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['concat', 'webpack', 'clean']);

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ": " + filepath + " has " + action);
    });

    grunt.event.on('clean', function(action, filepath, target) {
        grunt.log.writeln("CLEAN");
    });
};
