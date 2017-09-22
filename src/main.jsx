import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import DestinationPicker from './components/DestinationPicker';
import './main.css';
import { name, version } from '../package.json';

render(
  <DestinationPicker name={name} version={version} />,
  document.getElementById('destination-picker-root')
);
