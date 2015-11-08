// Karma configuration
module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            
            './bower_components/angular/angular.js',
            './bower_components/angular-mocks/angular-mocks.js',
            './bower_components/angular-route/angular-route.min.js',
            './public/js/libs/ui-bootstrap-tpls-0.11.0.js',
            './public/js/libs/**/*jquery-1.11.2.min.js',
            './public/js/libs/**/*line-chart.min.js',
            './public/js/libs/**/*Math.js',
//                        './public/js/libs/**/*GLmol.js',
//                        './public/js/libs/**/*Three49custom.js',
//                        './public/js/libs/**/*d3.min.js',
//                        './public/js/libs/**/*materialize.min.js',
            './public/js/**/app.js',
            './public/js/controllers/**/*.js',
            './public/js/services/**/*.js',
            './public/tests/**/*test.js'
        ],
        // list of files to exclude
        exclude: [
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './public/js/app.js': ['coverage'],
            './public/js/services/**/*.js': ['coverage'],
            './public/js/controllers/calculations.js': ['coverage'],
            './public/js/controllers/chart.js': ['coverage'],
            './public/js/controllers/data-ctrl.js': ['coverage']
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'junit', 'html'],
        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,
        coverageReporter: {
            reporters: [{
                    type: 'html',
                    dir: 'shippable/codecoverage/'
                }, {
                    type: 'cobertura',
                    dir: 'shippable/codecoverage/',
                    file: 'coverage.xml'
                }]
        },
        junitReporter: {
            outputFile: 'shippable/testresults/unit.xml',
            suite: ''
        },
        htmlReporter: {
            outputFile: 'shippable/testresults/unit.html',
            // Optional
            pageTitle: 'Unit Tests',
            subPageTitle: 'SuperCap'
        }
    });
};