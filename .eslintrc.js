module.exports = {
    "extends" : "rallycoding",
    "parserOptions": {
        "ecmaVersion": 9,
        "ecmaFeatures": {
          "jsx": true
        },
        "sourceType": "module"
      },
    
      "plugins": [
        "react"
      ],
    
      "rules": {
        "jsx-quotes": ["error", "prefer-single"],
        "react/jsx-boolean-value": "error",
        "react/jsx-curly-spacing": ["error", "never"],
        "react/jsx-equals-spacing": ["error", "never"],
        "react/jsx-indent": ["error", 2, {props: 4}],
        "react/jsx-indent-props": ["error", 2],
        "react/jsx-no-duplicate-props": "error",
        "react/jsx-no-undef": "error",
        "react/jsx-tag-spacing": ["error", { "beforeSelfClosing": "always" }],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/self-closing-comp": "error"
      }
};