import './index.css'

const LanguageFilterItem = props => {
  const {option, selectLanguage, isSelected} = props
  const {id, language} = option

  const onClickLanguage = () => {
    selectLanguage(id)
  }

  const selectedButton = isSelected ? 'selected' : ''

  return (
    <li className="each-language">
      <button
        type="button"
        onClick={onClickLanguage}
        className={`language-button ${selectedButton}`}
      >
        <p className="language">{language}</p>
      </button>
    </li>
  )
}

export default LanguageFilterItem
