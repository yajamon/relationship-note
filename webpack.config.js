var webpack = require('webpack');
module.exports = {
    entry: {
        bundle: "./src/index.tsx",
        vendor: ["react", "react-dom"]
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // Specify the common bundle's name.
        })
    ],

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-maps",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    }
}
