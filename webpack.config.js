const path = require("path");

const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const CSSLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: true
    }
};

const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        importLoaders: 1,
        sourceMap: true,
        modules: {
            localIdentName: '[path]__[name]__[local]__[hash:base64:5]'
        }
    }
}

const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: true,
        postcssOptions: {
            plugins: () => [autoprefixer()]
        }
    }
}

const getStyleLoaders = withModules => {
    const cssLoader = withModules ? CSSModuleLoader : CSSLoader;
    const loaders = [MiniCssExtractPlugin.loader]

    if (withModules) {
        loaders.push('css-modules-typescript-loader')
    }

    return loaders.concat([
        cssLoader,
        postCSSLoader,
        'sass-loader',
    ])
}

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index-bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".scss"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "awesome-typescript-loader",
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: getStyleLoaders(),
            },
            {
                test: /\.module\.scss$/,
                use: getStyleLoaders(true),
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[name].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
};
