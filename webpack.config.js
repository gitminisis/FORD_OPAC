module.exports = {
    entry: './assets/js/index.js',
    mode: 'development',
    output: {
        path: `${__dirname}/dist/js`,
        filename: 'bundle.js',
    }, optimization: {
        moduleIds: 'natural',
    },
};