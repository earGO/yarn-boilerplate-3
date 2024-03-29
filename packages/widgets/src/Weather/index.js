import WeatherComponent from './WeatherComponent';
import {getWeatherModule} from './weather-duck';
import {DynamicModuleLoader} from 'redux-dynamic-modules-react';
import * as React from 'react';

const Weather = () => {
	return (
		<DynamicModuleLoader modules={[getWeatherModule()]}>
			<WeatherComponent />
		</DynamicModuleLoader>
	);
};

export default Weather;
