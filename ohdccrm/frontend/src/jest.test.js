import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './components/App';

it('renders without crashing', () => {
    const component = renderer.create(<App />);
});
