import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'purple',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    passwordDetailsList: [],
    showPasswords: false,
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    if (websiteInput && usernameInput && passwordInput) {
      const initialBackgroundColorClassName = `initial-container ${
        initialContainerBackgroundClassNames[
          Math.ceil(
            Math.random() * initialContainerBackgroundClassNames.length - 1,
          )
        ]
      }`

      const newPassword = {
        id: uuidv4(),
        websiteInput,
        usernameInput,
        passwordInput,
        initialClassName: initialBackgroundColorClassName,
      }

      this.setState(prevState => ({
        passwordDetailsList: [...prevState.passwordDetailsList, newPassword],
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  onDeletePassword = id => {
    this.setState(prevState => ({
      passwordDetailsList: prevState.passwordDetailsList.filter(
        password => password.id !== id,
      ),
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  toggleShowPasswords = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  getFilteredPasswords = () => {
    const {passwordDetailsList, searchInput} = this.state
    return passwordDetailsList.filter(password =>
      password.websiteInput.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      showPasswords,
    } = this.state
    const filteredPasswords = this.getFilteredPasswords()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="add-new-password-container">
            <div className="small-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="sm-password-manager-img"
              />
            </div>
            <form className="form" onSubmit={this.onAddPassword}>
              <h1 className="heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icon"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  value={websiteInput}
                  onChange={this.onChangeWebsiteInput}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icon"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  value={usernameInput}
                  onChange={this.onChangeUsernameInput}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icon"
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  value={passwordInput}
                  onChange={this.onChangePasswordInput}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
            <div className="large-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="lg-password-manager-img"
              />
            </div>
          </div>
          <div className="passwords-container">
            <div className="password-search-container">
              <h1 className="passwords-count">
                Your Passwords{' '}
                <span className="count">
                  <p>{filteredPasswords.length}</p>
                </span>
              </h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="icon"
                />
                <input
                  type="search"
                  className="input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="placeholder"
                checked={showPasswords}
                onChange={this.toggleShowPasswords}
              />
              <label htmlFor="placeholder" className="show-password">
                Show passwords
              </label>
            </div>
            <div className="passwords-list">
              {filteredPasswords.length === 0 ? (
                <div className="no-password-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-password-image"
                  />
                  <p className="no-password">No Passwords</p>
                </div>
              ) : (
                <ul className="passwords-list">
                  {filteredPasswords.map(eachPassword => (
                    <PasswordItem
                      key={eachPassword.id}
                      passwordDetails={eachPassword}
                      onDeletePassword={this.onDeletePassword}
                      showPasswords={showPasswords}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
