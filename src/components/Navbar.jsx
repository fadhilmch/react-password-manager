import React, { Component } from 'react'
import { Navbar, NavItem, Nav, NavbarBrand, NavLink, Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logoutUser } from '../store/users/actions/users.actions.logout'

class NavigationBar extends Component {

  logout = () => {
    this.props.logoutUser()
  }

  render() {
    return (
    <div>
        <Navbar className='navbar' color="dark" light expand="md">
          <Container>
            <Nav className="ml-auto" navbar>
            {this.props.isLogin ?
              <NavItem>
                <Link to='/'>
                  <span className='nav-item'>Home</span>
                </Link>
              </NavItem>
            :null}
              {!this.props.isLogin ? 
                <NavItem>
                  <Link to='/login'>
                    <span className='nav-item'>Login</span>
                  </Link>
                </NavItem>
              : null }
              {!this.props.isLogin ? 
                <NavItem>
                  <Link to='/signup'>
                    <span className='nav-item'>Signup</span>
                  </Link>
                </NavItem>
              : null }
              {this.props.isLogin ?
                <NavItem>
                    <span onClick={this.logout} className='nav-item'>Logout</span>
                </NavItem>
              : null}
            </Nav>
          </Container>
        </Navbar>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  logoutUser
}, dispatch)

const mapsStateToProps = state => ({
  isLogin: state.users.isLogin
})

export default connect (mapsStateToProps, mapDispatchToProps) (NavigationBar)
