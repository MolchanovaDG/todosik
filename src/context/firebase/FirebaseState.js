import React, {useReducer, useContext} from 'react'
import axios from 'axios'
import {FirebaseContext} from './firebaseContext'
import {firebaseReducer} from './firebaseReducer'
import {AlertContext} from '../alert/alertContext'

import {ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER, LOG_IN, TOGGLE_NOTE} from '../types'


const url = process.env.REACT_APP_DB_URL
const authKey = 'AIzaSyBHeykYOTkjk1Yaai8Gnx2XT6RVa0bdoGc'
const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${authKey}`
const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${authKey}`


export const FirebaseState = ({children}) => {
  const alert = useContext(AlertContext)

  const initialState = {
    notes: [],
    loading: false,
    user: null,
  }
  const [state, dispatch] = useReducer(firebaseReducer, initialState)


  const showLoader = () => dispatch({type: SHOW_LOADER})

  const signUp = async ({email, password}) => {

    try {
      const res = await axios.post(authUrl, {
        email, password,
        returnSecureToken: true,
      })

      const {email: resEmail, idToken, localId} = res.data


      const payload = {
        email: resEmail,
        idToken,
        localId,
      }
      dispatch({type: LOG_IN, payload})
    } catch (e) {
      alert.show(e.response.data.error.message)
      throw e
    }
  }
  const signIn = async ({email, password}) => {

    try {
      const res = await axios.post(signInUrl, {
        email, password,
        returnSecureToken: true,
      })

      const {email: resEmail, idToken, localId} = res.data
      const payload = {
        email: resEmail,
        idToken,
        localId,
      }
      dispatch({type: LOG_IN, payload})
    } catch (e) {
      alert.show(e.response.data.error.message)
      throw e
    }
  }

  const fetchNotes = async () => {
    showLoader()


    const res = await axios.get(`${url}/notes/${state.user.localId}.json?auth=${state.user ? state.user.idToken : ''}`)

    const payload = Object.keys(res.data || {}).map(key => {
      return {
        ...res.data[key],
        id: key
      }
    })

    dispatch({type: FETCH_NOTES, payload})
  }

  const addNote = async title => {
    const note = {
      title, date: new Date().toJSON(), done: false
    }

    try {
      const res = await axios.post(`${url}/notes/${state.user.localId}.json?auth=${state.user ? state.user.idToken : ''}`, note)
      const payload = {
        ...note,
        id: res.data.name
      }

      dispatch({type: ADD_NOTE, payload})

    } catch (e) {
      throw new Error(e.message)
    }
  }

  const removeNote = async id => {
    await axios.delete(`${url}/notes/${state.user.localId}/${id}.json?auth=${state.user ? state.user.idToken : ''}`)

    dispatch({
      type: REMOVE_NOTE,
      payload: id
    })
  }
  const toggleNote = async (id, status) => {
    await axios.patch(`${url}/notes/${state.user.localId}/${id}.json?auth=${state.user ? state.user.idToken : ''}`, {
      done: status
    })

    dispatch({
      type: TOGGLE_NOTE,
      payload: {id, status}
    })
  }

  return (
    <FirebaseContext.Provider value={{
      showLoader, addNote, removeNote, fetchNotes, signUp, signIn, toggleNote,
      loading: state.loading,
      notes: state.notes,
      user: state.user
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}
