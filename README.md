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

## Example

```js
import * as React from 'react'
import {
  isSubmitting,
  hasSubmitSucceeded,
  hasSubmitFailed,
  getFormError,
} from 'redux-form'
import createStructuredFormSelector from 'redux-form-create-structured-form-selector'
import {connect} from 'react-redux'
import {mount} from 'react-dom'

const mapStateToProps = createStructuredFormSelector({
  submitting: isSubmitting,
  submitSucceeded: hasSubmitSucceeded,
  submitFailed: hasSubmitFailed,
  error: getFormError,
})

const FormStatus = connect(mapStateToProps)(
  ({submitting, submitSucceeded, submitFailed, error}) => {
    if (submitting) return <h3>Submitting...</h3>
    if (submitSucceeded) return <h3>Submitted!</h3>
    if (submitFailed) return <h3>Submit failed: {error}</h3>
    return <h3 />
  }
)

// Now render <FormStatus form="nameOrYourReduxForm" /> somewhere in your app to show the status of that form!
```

## API

### `createStructuredFormSelector(selectorMap, options = {})`

Uses `createStructuredSelector` to create a `mapStateToProps` function based upon the provided `redux-form` selectors
in `selectorMap`.

Returns a selector function: `(state: State, props: InputProps) => OutputProps`

By default the selector uses the `props.form` passed to it to determine which form to select state from, but you can
override this by passing `options.selectFormName`.

#### `selectorMap` (*Required*)

An object, where the key in each entry is the output prop name, and the value is a
[`redux-form` selector](https://redux-form.com/7.3.0/docs/api/selectors.md/) taking arguments
`(formName: String, getFormState?: ?(state: State) => any))` and returning a `(state: State) => any` selector function.

#### `options.getFormState` (*Optional*)

*Default*: `(state) => state.form`
A function that takes the redux state and returns the redux-form state root.

#### `options.selectFormName` (*Optional*)

*Default*: `(state, props) => props.form`
A function that takes the redux state and the component props and returns the name of the form to select state from.

#### `options.additionalSelectors` (*Optional*)

An object containing additional prop selectors to be spread into the `createStructuredSelector` call.
The key in each entry is the output prop name, and the value is a selector function taking `(state, props)` and returning
the desired output value for the prop.
