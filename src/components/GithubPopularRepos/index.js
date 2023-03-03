import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const responseStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguage: 'ALL',
    reposData: [],
    apiStatus: responseStatus.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: responseStatus.inProgress})

    const {activeLanguage} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`

    const response = await fetch(githubReposApiUrl)

    if (response.ok === true) {
      const responseData = await response.json()

      const updatedReposData = responseData.popular_repos.map(data => {
        const updatedData = {
          name: data.name,
          id: data.id,
          issuesCount: data.issues_count,
          forksCount: data.forks_count,
          starsCount: data.stars_count,
          avatarUrl: data.avatar_url,
        }
        return updatedData
      })

      this.setState({
        reposData: updatedReposData,
        apiStatus: responseStatus.success,
      })
    }
    if (response.ok === false) {
      this.setState({apiStatus: responseStatus.failure})
    }
  }

  selectLanguage = id => {
    this.setState({activeLanguage: id}, this.getData)
  }

  renderData = () => {
    const {reposData} = this.state
    return (
      <ul className="repos-container">
        {reposData.map(eachRepo => (
          <RepositoryItem repo={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderedData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case responseStatus.failure:
        return this.renderFailureView()
      case responseStatus.inProgress:
        return this.renderLoadingView()
      case responseStatus.success:
        return this.renderData()
      default:
        return null
    }
  }

  render() {
    const {activeLanguage} = this.state
    return (
      <div className="repos-main-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="filter-item-list">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              option={eachItem}
              key={eachItem.id}
              selectLanguage={this.selectLanguage}
              isSelected={eachItem.id === activeLanguage}
            />
          ))}
        </ul>
        {this.renderedData()}
      </div>
    )
  }
}

export default GithubPopularRepos
