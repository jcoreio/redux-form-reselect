// @flow

import mapValues from 'lodash.mapvalues'
import {formValueSelector} from 'redux-form'
import {createSelector, createStructuredSelector} from 'reselect'

export default function createStructuredFormSelector<State, InputProps: Object, ReduxFormProps: Object, AdditionalSelectorProps: Object>(
  selectors: $ObjMap<ReduxFormProps, <V>(V) => ((form: string) => (state: State) => V)>,
  options: {
    +selectFormName?: ?(state: State, props: InputProps) => string,
    +getFormState?: ?(state: State) => any,
    +additionalSelectors?: ?$ObjMap<AdditionalSelectorProps, <V>(V) => ((state: State, props: InputProps) => V)>,
  } = {}
): (state: State, props: InputProps) => ReduxFormProps & AdditionalSelectorProps {
  const {getFormState, additionalSelectors} = options
  const selectFormName = options.selectFormName || ((state: State, {form}: any) => form)
  const selectSelector = createSelector(
    selectFormName,
    (form: string) => createStructuredSelector({
      ...mapValues(selectors, selector => selector(form, getFormState)),
      ...additionalSelectors || {},
    })
  )
  return (state: State, props: InputProps) => selectSelector(state, props)(state, props)
}

export function value<State>(field: string): (form: string, getFormState?: ?(state: State) => any) => (state: State) => any {
  return (form: string, getFormState?: ?(state: State) => any) => {
    const selector = formValueSelector(form, getFormState)
    return (state: State) => selector(state, field)
  }
}
