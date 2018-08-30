const autoprefixer = require('autoprefixer');
module.exports = {
    plugins: [
        require('autoprefixer')({
            // Options see: https://www.npmjs.com/package/autoprefixer#options
            browsers: [
                'last 3 version',
                'ie >= 8',
            ],
            //  should Autoprefixer [remove outdated] prefixes. Default is true.
            remove: false,
        }),
        // require('postcss-opacity'),
        // require('postcss-pseudoelements'),
        // require('postcss-color-rgba-fallback')({
        //     // Set to true to enable the option and to get fallback for ie8.
        //     // see https://www.npmjs.com/package/postcss-color-rgba-fallback
        //     oldie: true,
        // }),
    ],
}