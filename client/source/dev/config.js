var isDebugMode = document.body.getAttribute("debug") === "true";
var deps = isDebugMode ? [] : ['source/0.1.0/all.built.min'];
require.config({

    baseUrl: '/',

    packages: [{
        name: 'less',
        location: 'package/require-less/0.1.5',
        main: 'less'
    }],

    waitSeconds: 0,

    paths: {
        'React': 'package/react/0.13.3/react',
        'JSXTransformer': 'package/react/0.13.3/jsx-transformer',
        'jsx': 'package/require-react/0.13.1/jsx',
        'text': 'package/requirejs/2.1.17/text',
        'widget': 'source/dev/widget',
        'page': 'source/dev/page',
        'global': 'source/dev/global',
        'underscore': 'package/underscore/underscore-min',
        'jQuery': 'package/jquery/jquery-2.1.4.min',
        'when': 'package/when/3.4.6/when-bundle.min',
        'svg': 'source/dev/global/require-svg/svg',
        'text':'package/require-text/2.0.14/text'
    },

    deps: deps,

    shim: {
        'React': {
            'exports': 'React'
        },
        'JSXTransformer': 'JSXTransformer',
        'jQuery': {
            'exports': 'jQuery'
        }
    },

    jsx: {
        fileExtension: '.jsx',
        transformOptions: {
            harmony: true,
            stripTypes: false,
            inlineSourceMap: true
        },
        usePragma: false
    }

});




require(['require', 'React', 'jsx!' + document.body.getAttribute("data-main"),'jsx!widget/svg/main'], function(require, React, Main) {
    React.render(
        React.createElement(Main, null),
        document.body
    );
});
