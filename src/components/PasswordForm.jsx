import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNewPassword } from '../store/passwords/actions/passwords.actions.add_new_password'
import { Button, Label, Input, Row, Col, Container } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import './PasswordForm.css'

class PasswordForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      username: '',
      url: '',
      password: '',
      createdAt: Date.now(),
      updatedAt: new Date(),
      validation: {
        lowercase: false,
        uppercase: false,
        numeric: false,
        special: false,
        long: false
      },
      showPassword: []
    }
  }


  handleChageForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      updatedAt: Date.now()
    }, () => {
      this.validatePassword()
    })
  }

  validatePassword = () => {
    console.log('validate')
    let password = this.state.password
    let lowercase = /[a-z]/.test(password)
    let uppercase = /[A-Z]/.test(password)
    let numeric = /[0-9]/.test(password)
    let special = /[!@#$%^&]/.test(password)
    let long = password.length > 8
    this.setState({
      validation: {
        lowercase,
        uppercase,
        numeric,
        special,
        long
      }
    })
  }
  
  handleSubmit = () => {
    const { title, username, url, password, createdAt, updatedAt } = this.state
    let newPassword = {
      title,
      username,
      url,
      password,
      createdAt,
      updatedAt
    }
    console.log('new', newPassword)
    this.props.addNewPassword(newPassword)
    this.props.history.push('/')
  }

  // componentWillMount () {
  //   if(!this.props.isLogin) {
  //     this.props.history.push('/login')
  //   }
  // }

  printDate = (date) => {
    let d = new Date(date)
    return moment(d).format('MMMM Do YYYY, h:mm:ss a');
    // return d.toString()
  }


  render() {
    if (!this.props.isLogin)
      return <Redirect to="/"/>
    else
    return (
      <div>
        <Container>
          {/* <Row> */}
            <Label>Title</Label>
            <Input type="text" name="title" id="title" placeholder="title" value={this.state.title} onChange={this.handleChageForm}/>
            <Label>Username</Label>
            <Input type="text" name="username" id="username" placeholder="username" value={this.state.username} onChange={this.handleChageForm}/>
            <Label>URL</Label>
            <Input type="text" name="url" id="url" placeholder="url" value={this.state.url} onChange={this.handleChageForm}/>
            <Label>Password</Label>
            <Input type="password" name="password" id="password" placeholder="password" value={this.state.password} onChange={this.handleChageForm}/>
            <Button className='submit' color='info' onClick={this.handleSubmit}>Submit</Button>

            <h3>Password Checker</h3>
            <p>{this.state.validation.uppercase ? <strong>(OK) </strong> : null}Uppercase</p>
            <p>{this.state.validation.lowercase ? <strong>(OK) </strong> : null}Lowercase</p>
            <p>{this.state.validation.numeric ? <strong>(OK) </strong> : null}Numeric Character</p>
            <p>{this.state.validation.special ? <strong>(OK) </strong> : null}Special Character</p>
            <p>{this.state.validation.long ? <strong>(OK) </strong> : null}More than 8 characters</p>

          {/* </Row>  */}
       </Container>
      </div>
    )
  }
}



const mapDispatchToProps = dispatch => bindActionCreators({
  addNewPassword,
}, dispatch)

const mapStateToProps = state => ({
  isLogin: state.users.isLogin
})

export default connect (mapStateToProps, mapDispatchToProps)(PasswordForm)