import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginUser } from '../store/users/actions/users.actions.login'
import { Redirect } from 'react-router-dom'
class LoginPage extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChageForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      updatedAt: Date.now()
    })
  }

  // componentWillMount () {
  //   if(this.props.isLogin) {
  //     console.log('pindah ke home')
  //     this.props.history.push('/')
  //   }
  // }

  handleSubmit = () => {
    console.log('masuk')
    this.props.loginUser(this.state.email, this.state.password)
    this.props.history.push('/')
  }

  render() {
    if(this.props.isLogin)
      return <Redirect to="/"/>
    else
    return (
      <div>
        <div className='container'>
          <div className="row vertical-offset-100">
            <div className="col-md-4 offset-md-4 my-auto">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Please Login</h3><br />
                </div>
                <div className="panel-body">
                  <div className="form-group">
                    <input className="form-control" placeholder="E-mail" name="email" type="text" value={this.state.email} onChange={this.handleChageForm} />
                  </div>
                  <div className="form-group">
                    <input className="form-control" placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.handleChageForm} />
                  </div>
                  <input className="btn btn-lg btn-success btn-block" type="submit" value="Login" onClick={this.handleSubmit}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loginUser
}, dispatch)

const mapStateToProps = state => ({
  isLogin: state.users.isLogin
})

export default connect (mapStateToProps, mapDispatchToProps) (LoginPage)