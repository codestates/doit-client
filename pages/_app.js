import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import withReduxSaga from 'next-redux-saga';
import axios from 'axios';
import Helmet from 'react-helmet';

import { getCookie } from '../utils/cookieHelper';
import AppLayout from '../components/AppLayout';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';

const DoIt = ({ Component, store, pageProps }) => {
  return (
    <Provider store={store}>
      <Helmet
        title="DoIt!"
        htmlAttributes={{ lang: 'ko' }}
        meta={[
          { charset: 'UTF-8' },
          {
            name: 'description',
            content:
              '집중해서 쓴 시간과 그렇지 않은 시간의 차이는 큽니다. DoIt!은 집중력과 시간관리를 위한 작지만 강력한 툴입니다.',
          },
          { name: 'og:title', content: 'DoIt!' },
          {
            name: 'og:description',
            content:
              '집중해서 쓴 시간과 그렇지 않은 시간의 차이는 큽니다. DoIt!은 집중력과 시간관리를 위한 작지만 강력한 툴입니다.',
          },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: 'https://doitreviews.com' },
        ]}
        link={[
          {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
          },
        ]}
      />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
};

DoIt.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  // console.log('_app - getInitialProps - ctx: ', ctx);

  if (ctx.isServer && ctx.req.headers.cookie) {
    const token = getCookie('token', ctx.req);
    // console.log('CTX - isServer: ', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common['Authorization'] = '';
  }

  const state = ctx.store.getState();
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = (await Component.getInitialProps(ctx)) || {};
  }
  return { pageProps };
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f,
        );
  const store = createStore(rootReducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(DoIt));
