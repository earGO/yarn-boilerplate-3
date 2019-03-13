import React from 'react'
import PropTypes from 'prop-types'
import store from '../store'
import MenuRow from './MenuRow'
import MenuItem from './MenuItem'

const KEY_DIVIDER = '-'

function getData({ row, items, keys }) {
  // sorry for this ;D
  switch (true) {
    case row === 0:
      return items
    case row === 1:
      return items[keys[0]].children || []
    case row === 2:
      return items[keys[0]].children[keys[1]].children || []
    case row === 3:
      return items[keys[0]].children[keys[1]].children[keys[2]] || []
    default:
      return items
  }
}

class Menu extends React.PureComponent {
  state = {
    selected: '0-0',
  }

  handleClick = item => () => {
    this.setState(
      {
        selected: item.key,
      },
      () => {
        store.history.push(item.url)
        window.scrollTo(0, 0)
      },
    )
  }

  renderMenuRow = row => {
    const { items, width } = this.props
    const { selected } = this.state
    const keys = selected.split(KEY_DIVIDER)
    const data = getData({ row, items, keys })

    return (
      Boolean(data.length) && (
        <MenuRow key={String(row)} bg={row % 2 ? '#f5f5f5' : 'white'} width={width}>
          {data.map((item, index) => {
            return (
              <MenuItem
                key={item.key}
                active={selected === item.key || keys[row] === item.key}
                name={item.name}
                url={item.url}
                qs={item.qs}
                ml={index === 0 ? 0 : 3}
                onClick={this.handleClick(item)}
              />
            )
          })}
        </MenuRow>
      )
    )
  }

  render() {
    const { selected } = this.state
    const keys = selected.split(KEY_DIVIDER)
    const rows = [...new Array(((selected && keys.length) || 0) + 1).keys()]

    return rows.map(this.renderMenuRow)
  }
}

Menu.propTypes = {
  items: PropTypes.array,
  width: PropTypes.number,
  onClick: PropTypes.func,
}

Menu.defaultProps = {
  items: [],
  selectedKey: null,
}

export default Menu
