# redux-form-create-structured-form-selector

[![Build Status](https://travis-ci.org/jcoreio/redux-form-create-structured-form-selector.svg?branch=master)](https://travis-ci.org/jcoreio/redux-form-create-structured-form-selector)
[![Coverage Status](https://codecov.io/gh/jcoreio/redux-form-create-structured-form-selector/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/redux-form-create-structured-form-selector)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

create a structured selector that selects various state from a redux-form

## Setup

```sh
npm install --save redux-form-create-structured-form-selector
```

## Webpack Note

The `package.json` of this module includes a `module` field linking to untranspiled modern JS code, so if you are building for
legacy browsers you will need to include this package in a `babel-loader` rule to transpile it.

