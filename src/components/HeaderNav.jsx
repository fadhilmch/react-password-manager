import React, { Component } from 'react' 
import logo from '../logo.png'
import './HeaderNav.css'
import { Row } from 'reactstrap'
import SearchBar from './SearchBar'
import './SearchBar.css'

class HeaderNav extends Component { 
  render() { 
    return (
      <div>
        <header className="masthead">
          <div className="overlay"></div>
          <div className="container">
            <div className="row ">
              <div className="col-lg-8 col-md-10 mx-auto header-wrapper">
              <img className='header-logo-static' src={logo} alt="" />
                <div className="site-heading">
                  <h1>Password Manager</h1>
                  <span className="subheading">Keep all your passwords</span>
                  {/* <SearchBar /> */}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    ) 
  } 
}


export default (HeaderNav)