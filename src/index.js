import 'suitcss';
import './styles/app';
import Utils from './utils';
import './sockets';

import R from 'ramda';
import React from 'react';
import ReactDOM from 'react-dom';
import ReduxProvider from './components/ReduxProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// attach variables to browser scope on http://localhost:8080/
window.Utils = Utils;
window.R = R;

ReactDOM.render(<ReduxProvider />, document.body);
injectTapEventPlugin();
