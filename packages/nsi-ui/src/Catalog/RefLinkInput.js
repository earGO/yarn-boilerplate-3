import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { simpleInject } from '../utils'
import nsi from '@ursip/nsi-service'
import { Select } from '@ursip/design-system'

class RefLinkInput extends React.Component {
  componentDidMount() {
    const { catalogId, attributeId } = this.props
    const payload = {
      payload: {
        catalogId,
        attributeId,
      },
    }
    this.props.getAllByCatalogId(payload)
  }

  render() {
    const { value, options, onChange } = this.props
    const formattedOptions = options.map(item => ({ label: item.title, value: item.key }))
    const selectValue = formattedOptions.find(item => item.value === value)
    const selectOnChange = (valueObject) => onChange(valueObject ? valueObject.value : null)
    return (
      <Select
        options={formattedOptions}
        menuPortalTarget={document.getElementById('catalogWrapper')}
        value={selectValue || null}
        onChange={selectOnChange}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { catalogId, attributeId } = ownProps.attribute.type
  return {
    ...ownProps,
    catalogId,
    attributeId,
    options: nsi.reselectors.elements.getByCatalogAndAttribute(state, catalogId, attributeId),
  }
}

const enhanced = compose(
  simpleInject(nsi),
  connect(
    mapStateToProps,
    { ...nsi.actions.elements },
  ),
)

export default enhanced(RefLinkInput)
