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
import EditTupper from './pages/EditTupper';
import MyProfile from './pages/MyProfile';
import EditProfile from './pages/EditProfile';
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
            <PrivateRoute path="/tuppers/categories" component={Categories} />
            <PrivateRoute exact path="/tuppers/all" component={TuppersList} />
            <PrivateRoute exact path="/tuppers/vegetarian" component={TuppersList} />
            <PrivateRoute exact path="/tuppers/vegan" component={TuppersList} />
            <PrivateRoute exact path="/tuppers/meat" component={TuppersList} />
            <PrivateRoute exact path="/tuppers/pasta" component={TuppersList} />
            <PrivateRoute exact path="/tuppers/gluten-free" component={TuppersList} />
            <PrivateRoute exact path="/tuppers/new" component={NewTupper} />
            <PrivateRoute exact path="/tuppers/:id" component={TupperDetail} />
            <PrivateRoute path="/tuppers/:id/edit" component={EditTupper} />
            <PrivateRoute exact path="/profile" component={MyProfile} />
            <PrivateRoute exact path="/profile/edit" component={EditProfile} />
            <PrivateRoute path="/profile/:id" component={UserProfile} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
