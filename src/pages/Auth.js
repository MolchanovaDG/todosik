import React, {useState, useContext} from "react";
import {FirebaseContext} from '../context/firebase/firebaseContext'
import {useHistory} from "react-router-dom"


export const Auth = () => {
    const {signUp, signIn} = useContext(FirebaseContext)
    const history = useHistory()

    const [input, setInput] = useState({
        email: '',
        password: '',
    })

    const handleInput = e => {
        setInput({...input, [e.target.name]: e.target.value})
    }


    const handleSignUp = async () => {
        try {
            await signUp({...input})
            history.push('/')
        } catch (e) {
            console.log(e)
        }
    }
    const handleSignIn = async () => {
        try {
            await signIn({...input})
            history.push('/')
        } catch (e) {
            console.log(e)
        }
    }




    return (
        <div className="jumbotron">
            <h1 class="display-3">Авторизация</h1>
            <div className="mt-10 container">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input value={input.email} onChange={handleInput} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <small id="emailHelp" className="form-text text-muted">Введите ваш email</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Пароль</label>
                        <input value={input.password} onChange={handleInput} type="password" name="password" className="form-control" id="exampleInputPassword1"/>
                        <small id="emailHelp" className="form-text text-muted">Пароль должен быть не менее 6 символов</small>
                    </div>
                    {/* <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <button type="button" onClick={handleSignUp} className="btn btn-primary">Зарегистрироваться</button>
                    <button type="button" onClick={handleSignIn} className="btn ml-3 btn-primary">Войти</button>
                </form>
            </div>
        </div>
    )
}