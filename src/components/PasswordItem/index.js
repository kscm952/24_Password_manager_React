import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onDeletePassword, showPasswords} = props
  const {
    id,
    websiteInput,
    usernameInput,
    passwordInput,
    initialClassName,
  } = passwordDetails
  const initial = websiteInput[0].toUpperCase()

  const onClickDelete = () => {
    onDeletePassword(id)
  }

  return (
    <li className="password-item">
      <div className={initialClassName}>
        <h1 className="initial">{initial}</h1>
      </div>
      <div className="details-container">
        <p className="website">{websiteInput}</p>
        <p className="username">{usernameInput}</p>
        {showPasswords ? (
          <p className="password">{passwordInput}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-image"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default PasswordItem
