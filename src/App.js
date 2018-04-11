import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Router} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PasswordForm from './components/PasswordForm'
import Navbar from './components/Navbar'
import ListPage from './components/ListPage'
import HeaderNav from './components/HeaderNav'
import LoginPage from './components/LoginPage'
import SignUp from './components/SignUp'
import EditPage from './components/EditPage'
import { onChangeState } from './store/users/actions/users.actions.login'


class App extends Component {
  componentWillMount () {
    this.props.onChangeState()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <HeaderNav />
          <Switch>
            <Route exact path = '/' component = {ListPage} />
            <Route path = '/new_password' component = {PasswordForm} />
            <Route path = '/login' component = {LoginPage} />
            <Route path = '/signup' component = {SignUp} />
            <Route path = '/edit/:id' component = {EditPage} />
          </Switch>
        </div>
       </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.users.isLogin
})

const mapDispatchToProps = dispatch => bindActionCreators({
  onChangeState
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (App);
