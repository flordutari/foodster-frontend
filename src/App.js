import React, { Component } from 'react';
import {Switch} from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import CoverPage from './pages/CoverPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Categories from './pages/Categories';
import TuppersList from './pages/TuppersList';
import NewTupper from './pages/NewTupper';
import TupperDetail from './pages/TupperDetail';
import MyProfile from './pages/MyProfile';
import UserProfile from './pages/UserProfile';
import AuthProvider from './providers/AuthProvider';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Switch>
            <AnonRoute exact path="/" component={CoverPage} />
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/categories" component={Categories} />
            <PrivateRoute exact path="/tuppers" component={TuppersList} />
            <PrivateRoute exact path="/tuppers/new" component={NewTupper} />
            <PrivateRoute path="/tuppers/:id" component={TupperDetail} />
            <PrivateRoute path="/profile/me" component={MyProfile} />
            <PrivateRoute path="/profile/:id" component={UserProfile} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
