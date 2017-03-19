module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "browser": true
    },
    "extends": "eslint:recommended",
    "globals": {
      "before": true,
      "describe": true,
      "it": true,
      "process": true,
      "__base": true,
      "__dirname": true,
      "__testBase": true

    },
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "windows"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off",
        "no-var": "warn",
        "prefer-const": "warn",
        "arrow-body-style": ["error", "always",{ "requireReturnForObjectLiteral": true }]
    }
};
