// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import {createStore, combineReducers} from 'redux'
import {
  reducer,
  initialize,
  startSubmit,
  stopSubmit,
  setSubmitFailed,
  isSubmitting,
  hasSubmitSucceeded,
  hasSubmitFailed,
  getFormError,
} from 'redux-form'
import {createStructuredFormSelector, value} from '../src'

describe('createStructuredFormSelector', () => {
  it('works', () => {
    const store = createStore(combineReducers({form: reducer}))
    const {dispatch, getState} = store

    const form1 = 'form1'
    // $FlowFixMe
    dispatch(initialize(form1, {firstName: 'Andy', lastName: 'Edwards'}))
    const form2 = 'form2'
    // $FlowFixMe
    dispatch(initialize(form2, {firstName: 'Jim', lastName: 'Bob'}))

    const selectStatus = createStructuredFormSelector({
      submitting: isSubmitting,
      submitSucceeded: hasSubmitSucceeded,
      submitFailed: hasSubmitFailed,
      error: getFormError,
      firstName: value('firstName'),
      lastName: value('lastName'),
    })
    expect(selectStatus(getState(), {form: form1})).to.deep.equal({
      submitting: false,
      submitSucceeded: false,
      submitFailed: false,
      error: undefined,
      firstName: 'Andy',
      lastName: 'Edwards',
    })
    expect(selectStatus(getState(), {form: form2})).to.deep.equal({
      submitting: false,
      submitSucceeded: false,
      submitFailed: false,
      error: undefined,
      firstName: 'Jim',
      lastName: 'Bob',
    })

    dispatch(startSubmit(form1))
    expect(selectStatus(getState(), {form: form1})).to.deep.equal({
      submitting: true,
      submitSucceeded: false,
      submitFailed: false,
      error: undefined,
      firstName: 'Andy',
      lastName: 'Edwards',
    })
    dispatch(stopSubmit(form1, {_error: 'TEST'}))
    dispatch(setSubmitFailed(form1))
    expect(selectStatus(getState(), {form: form1})).to.deep.equal({
      submitting: false,
      submitSucceeded: false,
      submitFailed: true,
      error: 'TEST',
      firstName: 'Andy',
      lastName: 'Edwards',
    })
  })
  it('treats string values in selectorMap as field names', () => {
    const store = createStore(combineReducers({form: reducer}))
    const {dispatch, getState} = store

    const form1 = 'form1'
    // $FlowFixMe
    dispatch(initialize(form1, {firstName: 'Andy', lastName: 'Edwards'}))
    const form2 = 'form2'
    // $FlowFixMe
    dispatch(initialize(form2, {firstName: 'Jim', lastName: 'Bob'}))

    const selectStatus = createStructuredFormSelector({
      submitting: isSubmitting,
      submitSucceeded: hasSubmitSucceeded,
      submitFailed: hasSubmitFailed,
      error: getFormError,
      firstName: 'firstName',
      lastName: 'lastName',
    })
    expect(selectStatus(getState(), {form: form1})).to.deep.equal({
      submitting: false,
      submitSucceeded: false,
      submitFailed: false,
      error: undefined,
      firstName: 'Andy',
      lastName: 'Edwards',
    })
    expect(selectStatus(getState(), {form: form2})).to.deep.equal({
      submitting: false,
      submitSucceeded: false,
      submitFailed: false,
      error: undefined,
      firstName: 'Jim',
      lastName: 'Bob',
    })
  })
  it('supports getFormState option', () => {
    const store = createStore(combineReducers({formaggio: reducer}))
    const {dispatch, getState} = store

    const form1 = 'form1'
    // $FlowFixMe
    dispatch(initialize(form1, {firstName: 'Andy', lastName: 'Edwards'}))
    const form2 = 'form2'
    // $FlowFixMe
    dispatch(initialize(form2, {firstName: 'Jim', lastName: 'Bob'}))

    const selectStatus = createStructuredFormSelector({
      submitting: isSubmitting,
      submitSucceeded: hasSubmitSucceeded,
      submitFailed: hasSubmitFailed,
      error: getFormError,
      firstName: value('firstName'),
      lastName: value('lastName'),
    }, {
      getFormState: state => state.formaggio,
    })
    expect(selectStatus(getState(), {form: form1})).to.deep.equal({
      submitting: false,
      submitSucceeded: false,
      submitFailed: false,
      error: undefined,
      firstName: 'Andy',
      lastName: 'Edwards',
    })
  })
  it('supports selectFormName option', () => {
    const store = createStore(combineReducers({form: reducer}))
    const {dispatch, getState} = store

    const form1 = 'form1'
    // $FlowFixMe
    dispatch(initialize(form1, {firstName: 'Andy', lastName: 'Edwards'}))
    const form2 = 'form2'
    // $FlowFixMe
    dispatch(initialize(form2, {firstName: 'Jim', lastName: 'Bob'}))

    const selectStatus = createStructuredFormSelector({
      submitting: isSubmitting,
      submitSucceeded: hasSubmitSucceeded,
      submitFailed: hasSubmitFailed,
      error: getFormError,
      firstName: value('firstName'),
      lastName: value('lastName'),
    }, {
      selectFormName: (state, {form}) => form.toLowerCase(),
    })
    expect(selectStatus(getState(), {form: form1.toUpperCase()})).to.deep.equal({
      submitting: false,
      submitSucceeded: false,
      submitFailed: false,
      error: undefined,
      firstName: 'Andy',
      lastName: 'Edwards',
    })
  })
  it('supports additionalSelectors option', () => {
    const store = createStore(combineReducers({form: reducer}))
    const {dispatch, getState} = store

    const form1 = 'form1'
    // $FlowFixMe
    dispatch(initialize(form1, {firstName: 'Andy', lastName: 'Edwards'}))
    const form2 = 'form2'
    // $FlowFixMe
    dispatch(initialize(form2, {firstName: 'Jim', lastName: 'Bob'}))

    const selectStatus = createStructuredFormSelector({
      firstName: value('firstName'),
      lastName: value('lastName'),
    }, {
      additionalSelectors: {
        forms: state => Object.keys(state.form),
      },
    })

    expect(selectStatus(getState(), {form: form1})).to.deep.equal({
      firstName: 'Andy',
      lastName: 'Edwards',
      forms: ['form1', 'form2'],
    })
  })
})
