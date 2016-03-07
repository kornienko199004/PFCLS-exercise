import 'suitcss';
import './styles/app';
import './utils'; // expose Utils into global application scope
import './sockets';

import React from 'react';
import ReactDOM from 'react-dom';
import ReduxProvider from './components/ReduxProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

ReactDOM.render(<ReduxProvider />, document.body);
injectTapEventPlugin();
