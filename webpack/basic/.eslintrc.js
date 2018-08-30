module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint-config-airbnb-base",
    "parserOptions": {
        "sourceType": "module"
    },
    "globals": {
        "$": true,
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        'max-len': ['error', {
            code: 120,
            ignoreComments: true,
        }],
        'no-alert': 'off',
        'no-console': 'off',
    }
}
