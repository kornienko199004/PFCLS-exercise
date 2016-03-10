import 'suitcss';
import './styles/app';
import Utils from './utils';
import './sockets';

import R from 'ramda';
import React from 'react';
import ReactDOM from 'react-dom';
import ReduxProvider from './components/ReduxProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// expose variables globally in the app scope
window.Utils = Utils;
window.R = R;

ReactDOM.render(<ReduxProvider />, document.body);
injectTapEventPlugin();
