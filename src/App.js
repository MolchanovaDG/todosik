import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Home} from './pages/Home'
import {Auth} from './pages/Auth'
import {About} from './pages/About'
import {Navbar} from './components/Navbar'
import {Alert} from './components/Alert'
import {AlertState} from './context/alert/AlertState'
import {FirebaseState} from './context/firebase/FirebaseState'

function App() {
    return (
        <AlertState>
            <FirebaseState>
                <BrowserRouter>
                    <Navbar/>
                    <div className="container pt-4">
                        <Alert/>
                        <Switch>
                            <Route path={'/'} exact component={Home}/>
                            <Route path={'/about'} component={About}/>
                            <Route path={'/auth'} component={Auth}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </FirebaseState>
        </AlertState>
    );
}

export default App;
