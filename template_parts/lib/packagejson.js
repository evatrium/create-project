export default (options)=>{

    let pkg = {
        name: options.npm_namespace + "/" + (options.npm_library_name || ''),
        version: "0.0.1",
        description: options.npm_library_description || '',
        "main": "index.js",
        "module": "index.js",
        publishConfig: {
            "access": "public"
        },
        license: "MIT",
        files: [],
        keywords: [],
        "PROJECTS": {
            "demo": {
                "src": "demo",
                "outputDir": "demoBuild"
            },
            "lib": {
                "src": [
                    "src/index.js",
                ],
                "outputDir": "./"
            }
        },
        "scripts": {
            "start": "rollup -c --environment SERVE,PROJECT:demo --watch demo/**",
            "build": "rollup -c --environment BUILD_LIB,PROJECT:lib",
            "build:demo": "rollup --c --environment BUILD_APP,PROJECT:demo",
            "test": "cross-env NODE_ENV=test karma start --single-run --browsers ChromeHeadless karma.config.js"
        },
        peerDependenciesMeta: {},
        dependencies: {},
        devDependencies: {
            "@babel/core": "^7.5.5",
            "@babel/plugin-proposal-class-properties": "^7.5.5",
            "@babel/plugin-proposal-object-rest-spread": "^7.5.5",
            "@babel/plugin-syntax-dynamic-import": "^7.2.0",
            "@babel/plugin-syntax-import-meta": "^7.2.0",
            "@babel/plugin-transform-react-jsx": "^7.3.0",
            "@babel/plugin-transform-template-literals": "^7.4.4",
            "@iosio/babel-plugin-jcss": "0.0.4",
            "@open-wc/building-utils": "^2.7.0",
            "babel-plugin-bundled-import-meta": "^0.3.1",
            "babel-plugin-file-loader": "^1.1.1",
            "babel-plugin-transform-inline-environment-variables": "^0.4.3",
            "cross-env": "^6.0.3",
            "intersection-observer": "^0.7.0",
            "jasmine-core": "^3.4.0",
            "karma": "^4.2.0",
            "karma-chrome-launcher": "^3.1.0",
            "karma-jasmine": "^2.0.1",
            "karma-rollup-preprocessor": "^7.0.2",
            "karma-spec-reporter": "0.0.32",
            "puppeteer": "^1.19.0",
            "rimraf": "^2.6.3",
            "rollup": "^1.15.4",
            "rollup-plugin-alias": "^2.1.0",
            "rollup-plugin-babel": "^4.3.3",
            "rollup-plugin-filesize": "^6.2.1",
            "rollup-plugin-index-html": "^1.5.5",
            "rollup-plugin-livereload": "^1.0.4",
            "rollup-plugin-multi-input": "^1.0.2",
            "rollup-plugin-node-resolve": "^5.2.0",
            "rollup-plugin-serve": "^1.0.1",
            "rollup-plugin-terser": "^5.1.1",
            "rollup-plugin-url": "^3.0.0"
        },

    };

    return JSON.stringify(pkg, null, '\t');
};