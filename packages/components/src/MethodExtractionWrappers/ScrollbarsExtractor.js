import React from 'react'
import Scrollbars from '../../import'

class Parent extends React.Class {
	constructor(props) {
		super(props)
		this._child = React.createRef()
	}

	componentDidMount() {
		console.log(this._child.current.someMethod()) // Prints 'bar'
	}

	render() {
		return (
			<div>
				<Scrollbars ref={this._child}>
					<div height=""></div>
				</Scrollbars>
			</div>
		)
	}
}
