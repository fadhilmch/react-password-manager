import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { Link, Redirect } from 'react-router-dom'
import { Button, Container, Row, Col, Table } from 'reactstrap'
import logo from '../logo.svg'
import SearchBar from './SearchBar'
import swal from 'sweetalert'

import { fetchPasswordList } from '../store/passwords/actions/passwords.actions.fetch_passwords_list'
import { fetchFilteredList } from '../store/passwords/actions/passwords.actions.fetch_filtered_list'
import { deletePassword, deletePasswordFulfilled, deletePasswordRejected } from '../store/passwords/actions/passwords.actions.delete_password'

import './ListPage.css'

class ListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      editMode: false,
    }
  }

  componentWillMount () {
    if(!this.props.isLogin) {
      this.props.history.push('/login')
    }
  }

  toggle (pass, id) {
    let bullet = String.fromCharCode(0x2022)
    let text = document.getElementById('pass'+id)
    console.log(id)
    console.log('test',text)
    if (text.innerText.indexOf(bullet) !== -1) {
      swal("Input your passwords", {
        content: {
          element: "input",
          attributes: {
            placeholder: "Type your password",
            type: "password",
          },
        },
      })
      .then((value) => {
        ReactDOM.render(pass, document.getElementById('pass'+id))
        ReactDOM.render('Hide', document.getElementById('button'+id))
      });
    } else {
      ReactDOM.render(this.hidePassword(pass), document.getElementById('pass'+id))
      ReactDOM.render('Show', document.getElementById('button'+id))
    }
  }

  componentDidMount () {
    console.log(this.props.history)
    console.log(this.props)
    if(this.props.isLogin)
      this.props.fetchPasswordList()
  }

  hidePassword = (password) => {
      return password.split('').map(val => {return '\u2022'}).join('')
  }


  changePasswordShow = (i) => {
    // if (this.state.showPassword === null)
      this.setState({showPassword: i})
  //   else 
  //     this.setState({showPassword: null})
  }

  printDate = (date) => {
    let d = new Date(date)
    return moment(d).format('MMMM Do YYYY, h:mm:ss a');
    // return d.toString()
  }

  handleSearch = (e) => {
    this.setState({
      search: e.target.value 
    }, () => {
      console.log('state search', this.state.search)
      this.props.fetchFilteredList(this.state.search)
    })
  }

  deletePassword = (payload) => {
    this.props.deletePassword(payload)
      .then(() => {
        console.log('success')
        this.props.deletePasswordFulfilled()
        this.props.fetchPasswordList()
      })
      .catch((err) => {
        console.log('error ' + err)
        this.props.deletePasswordRejected()
      })
  }


  render() {
    if(!this.props.isLogin)
      return <Redirect to="/login"/>
    else {
        return (
          <div>
            <Container>
              <Container>
              <SearchBar />
              </ Container>
              <Row>
                <Col s='auto'>
                  <Button className='add' color='info'>
                  <Link to='/new_password'>
                    <span className='add'>Add New</span>
                  </Link>
                  </Button> 
                </Col>
              </Row>
              {!this.props.loading ?
              <Table striped>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Username</th> 
                    <th>URL</th>
                    <th>Password</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
              {
                this.props.passwords_list.map((password,i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{password.title}</td> 
                      <td>{password.username}</td>
                      <td>{password.url}</td>
                      <td id={'pass'+i}>{this.hidePassword(password.password)}</td>
                      <td>{this.printDate(password.createdAt)}</td>
                      <td>{this.printDate(password.updatedAt)}</td>
                      <td><Button id={'button'+i} color='primary' onClick={() => this.toggle(password.password, i)}>Show</Button><Button color='info' onClick={() => this.props.history.push(`/edit/${password.id}`)}>Edit</Button><Button color='danger' onClick={() => this.deletePassword(password.id)}>Delete</Button></td>
                    </tr>
                    )
                })
              }
              </tbody>
              </Table>
              : 
              <div>
              <img className='loading-logo' src={logo} alt=""/> 
              <h2 className='loading'>Loading<span>.</span><span>.</span><span>.</span></h2>
            </div> }
            </Container>
          </div>
        )

    }
    
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPasswordList,
  fetchFilteredList,
  deletePassword,
  deletePasswordFulfilled,
  deletePasswordRejected,
}, dispatch)

const mapStateToProps = state => ({
  passwords_list: state.passwords.filteredList,
  search: state.passwords.search,
  isLogin: state.users.isLogin,
  id: state.users.id,
  email: state.users.email,
  loading: state.passwords.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(ListPage)
