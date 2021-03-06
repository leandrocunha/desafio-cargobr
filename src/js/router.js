import React from 'react';
import ReactDOM from 'react-dom';
import Page from 'react-page';

import Frontend from './components/Wrapper';
import Main from './components/Main';

var render = RootComponent => ReactDOM.render(<RootComponent />,
  document.getElementById('app'));

Page.base(tasks.baseURL || '/');

Page.set(render)
 .with(Main)
  .on(
    'app',
    '/',
    Frontend
  )
  .run();
