import React, {useContext, useEffect} from 'react'
import {Form} from '../components/Form'
import {Notes} from '../components/Notes'
import {FirebaseContext} from '../context/firebase/firebaseContext'
import {Loader} from '../components/Loader'
import {NavLink} from 'react-router-dom'

export const Home = () => {
    const {loading, user, notes, fetchNotes, removeNote, toggleNote} = useContext(FirebaseContext)

    useEffect(() => {
        if (user) {
            fetchNotes(user)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="jumbotron">
            <div className="container">
            {user ?
                <>
                    <h1 class="display-4">Мои заметки</h1>

                    <Form />

                    <hr/>

                    {loading
                        ? <Loader />
                        : <Notes notes={notes} onToggle={toggleNote} onRemove={removeNote} />
                    }
                </>
                : <>
                    <p className="lead text-center">Что начать, нужно                     <NavLink
                        className="btn btn-primary home__login"
                        to="/auth"
                    >Войти</NavLink></p>

                </>

            }
            </div>
        </div>
    )
}