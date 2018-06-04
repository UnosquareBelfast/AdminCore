module.exports = {
    "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "node": true,
      "jest": true
    },
    "globals": {
      "__DEV__": true,
      "shallow": true,
      "render": true,
      "mount":true,
    },
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "parserOptions": {
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
        "jsx": true
      },
      "sourceType": "module"
    },
    "plugins": [
      "react",
      "react-native"
    ],
    "rules": {
      "no-unused-vars":
        [
          "error",
          {
            "vars": "all",
            "args": "after-used",
            "ignoreRestSiblings": false,
            "varsIgnorePattern": "^_"
          }
        ],
      "indent": [2, 2, { "SwitchCase": 1 }],
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
      "keyword-spacing": 1,
      "block-spacing": 1,
      "no-console": 2,
      "space-before-blocks": [1, "always"],
      "comma-dangle": [1, "always-multiline"],
      "space-infix-ops": ["error", { "int32Hint": false }],
      // React
      "jsx-quotes": [2, "prefer-double"],
      "react/display-name": 0,
      "react/jsx-boolean-value": 1,
      "react/jsx-no-undef": 2,
      "react/jsx-sort-prop-types": 0,
      "react/jsx-sort-props": 0,
      "react/jsx-uses-react": 1,
      "react/jsx-uses-vars": 1,
      "react/no-did-update-set-state": 2,
      "react/no-multi-comp": 0,
      "react/no-unknown-property": 2,
      "react/prop-types": 2,
      "react/react-in-jsx-scope": 2,
      "react/self-closing-comp": 2,
      "react/sort-comp": 2,
    }
  };
  