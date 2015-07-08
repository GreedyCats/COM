{
    appDir: '../client',
    dir: '../client-built',
    baseUrl: '.',
    preserveLicenseComments: false,
    stubModules: ['jsx'],
    paths: {
        'React': 'package/react/0.13.3/react',
        'JSXTransformer': 'package/react/0.13.3/jsx-transformer',
        'jsx': 'package/require-react/0.13.1/jsx',
        'jQuery': 'package/jquery/jquery-2.1.4.min'
    },
    packages: [{
        name: 'less',
        location: 'package/require-less/0.1.5',
        main: 'less'
    }],
    shim: {
        'React': {
            'exports': 'React'
        },
        'JSXTransformer': 'JSXTransformer',
        'jQuery': {
            'exports': 'jQuery'
        }
    },
    modules: [{
        name: 'source/dev/config',
        exclude: ['less','jsx']
    }]
}
