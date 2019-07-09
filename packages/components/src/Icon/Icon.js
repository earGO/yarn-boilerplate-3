import React from 'react';
import PropTypes from 'prop-types';
import './icon-font/icon.css';

const sizes = {
	0: ' md-14',
	1: ' md-18',
	2: ' md-24',
	3: ' md-36',
	4: ' md-48'
};

const colors = {
	primary: ' blue',
	hover: ' lightBlue',
	success: ' green',
	warning: ' orange',
	error: ' red',
	border: ' semiLightGrey',
	disabled: ' grey',
	highlight: ' lightGrey',
	onclick: ' darkBlue',
	scrollbar: ' grey',
	black: ' black',
	white: ' white',
	text: ' black'
};

const Icon = ({name, size, color, ...props}) => {
	let nameForClass = 'material-icons ';
	if (sizes[size] !== undefined) {
		nameForClass += sizes[size];
	} else {
		nameForClass += 'md-18 ';
	}
	if (colors[color] !== undefined) {
		nameForClass += colors[color];
	} else {
		nameForClass += 'black ';
	}
	if (props.hasOwnProperty('spin')) {
		nameForClass += ' spin';
	}
	if (props.hasOwnProperty('hidden')) {
		nameForClass += ' hidden';
	}
	return <i className={`${nameForClass}`}>{name}</i>;
};

Icon.displayName = 'Icon';

Icon.propTypes = {
	name: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.number
};
// Rotate,

Icon.defaultProps = {
	name: 'live_help',
	size: 2,
	color: 'text'
};

/** @component */
export default Icon;
