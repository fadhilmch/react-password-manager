import React, { Component } from 'react'
import { Row } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchFilteredList } from '../store/passwords/actions/passwords.actions.fetch_filtered_list'

class SearchBar extends Component {
  constructor () {
    super()
    this.state = {
      search: ''
    }
  }

  handleSearch = (e) => {
    this.setState({
      search: e.target.value 
    }, () => {
      console.log('state search', this.state.search)
      this.props.fetchFilteredList(this.state.search)
    })
  }

  render() {
    return (
      <div>
        {this.props.isLogin ?
        <Row className='search-bar mx-auto'>
          <input className="flipkart-navbar-input col-11 " type="text" placeholder="Search your password.." value={this.state.search} onChange={this.handleSearch} />
          <button className="flipkart-navbar-button col-1">
              <svg width="15px" height="15px">
                  <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
              </svg>
          </button>
        </Row>
        :null}
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  fetchFilteredList,
}, dispatch)

const mapStateToProps = state => ({
  passwords_list: state.passwords.filteredList,
  search: state.passwords.search,
  isLogin: state.users.isLogin
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
