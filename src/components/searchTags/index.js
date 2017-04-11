import { h, Component } from 'preact'
import cx from 'classnames'

import style from './style'

export default class SearchTags extends Component {
  state = {
    recents: [],
  }

  componentDidMount() {
    console.log('search tags mount')
    fetch(`/recent?limit=4`)
      .then(result => {
        console.log('got result', result)
        if (result.ok) {
          result.json()
            .then(json => {
              console.log('got json', json)

              this.setState({ recents: Object.keys(json) })
            })
            .catch(err => {
              console.error(err)
            })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const { recents } = this.state
    const { onSelect } = this.props

    return (
      <div className={ cx(style.searchTagsWrap, { [style.searchTagsWrapVisible]: !!recents.length})  }>
          <h4> Recent searches: </h4>
        <ul className={ style.searchTagsContainer }>
          {
            recents.map(recent => (
              <li
                tabIndex="0"
                className={ style.searchTag }
                onClick={ () => onSelect(recent) }
              >
                { recent }
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
