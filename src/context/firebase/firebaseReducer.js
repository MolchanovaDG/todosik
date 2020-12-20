import {ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER, LOG_IN, LOG_OUT, TOGGLE_NOTE} from '../types'

const handlers = {
  [LOG_OUT]: state => ({...state, user: null}),
  [LOG_IN]: (state, {payload}) => ({...state, user: payload}),
  [SHOW_LOADER]: state => ({...state, loading: true}),
  [ADD_NOTE]: (state, {payload}) => ({
    ...state,
    notes: [...state.notes, payload]
  }),
  [FETCH_NOTES]: (state, {payload}) => ({...state, notes: payload, loading: false}),
  [REMOVE_NOTE]: (state, {payload}) => ({
    ...state,
    notes: state.notes.filter(note => note.id !== payload)
  }),
  [TOGGLE_NOTE]: (state, {payload: {id, status}}) => {
    console.log('STATE', state);
    console.log('ID', id);

    const index = state.notes.findIndex(el => el.id === id)
    console.log(index)

    return {
      ...state,
      notes: [...state.notes.slice(0, index),
        {...state.notes[index], done: status},
        ...state.notes.slice(index+1)
      ]
    }
  },
  DEFAULT: state => state
}

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
