import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class SignUp extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  componentWillMount () {
    if(this.props.isLogin) {
      this.props.history.push('/')
    }
  }

  handleChageForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      updatedAt: Date.now()
    })
  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className="row vertical-offset-100">
            <div className="col-md-4 offset-md-4 my-auto">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Please Signup</h3><br />
                </div>
                <div className="panel-body">
                  <div className="form-group">
                    <input className="form-control" placeholder="Name" name="name" type="text" value={this.state.name} onChange={this.handleChageForm} />
                  </div>
                  <div className="form-group">
                    <input className="form-control" placeholder="E-mail" name="email" type="text" value={this.state.email} onChange={this.handleChageForm} />
                  </div>
                  <div className="form-group">
                    <input className="form-control" placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.handleChageForm} />
                  </div>
                  <input className="btn btn-lg btn-success btn-block" type="submit" value="Submit" />
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

}, dispatch)

export default connect (null, mapDispatchToProps) (SignUp)