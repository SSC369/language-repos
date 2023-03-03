import './index.css'

const RepositoryItem = props => {
  const {repo} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repo
  return (
    <li className="each-repo">
      <img src={avatarUrl} alt={name} className="repo-img" />
      <h1 className="repo-name">{name}</h1>
      <div className="detail-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="detail-icon"
        />
        <p className="count">{`${starsCount} stars`}</p>
      </div>
      <div className="detail-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="detail-icon"
        />
        <p className="count">{`${forksCount} forks`}</p>
      </div>
      <div className="detail-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="detail-icon"
        />
        <p className="count">{`${issuesCount} issues`}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
