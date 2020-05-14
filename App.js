import React from 'react';

import RouteNavigator from './src/routes/routes';

import {setNavigator} from './src/routes/navigationRef';

import {Provider as BlogProvider} from './src/context/BlogContext';
import {Provider as BookProvider} from './src/context/BookContext';
import {Provider as AuthProvider} from './src/context/AuthContext';

const App: () => React$Node = () => {
  return (
    <>
      <BlogProvider>
        <BookProvider>
          <AuthProvider>
            <RouteNavigator
              ref={(navigator) => {
                setNavigator(navigator);
              }}
            />
          </AuthProvider>
        </BookProvider>
      </BlogProvider>
    </>
  );
};

export default App;
