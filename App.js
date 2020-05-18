import React from 'react';

import RouteNavigator from './src/routes/routes';

import {setNavigator} from './src/routes/navigationRef';

import {Provider as BlogProvider} from './src/context/BlogContext';
import {Provider as BookProvider} from './src/context/BookContext';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as AccidentProvider} from './src/context/AccidentContext';

const App: () => React$Node = () => {
  return (
    <>
      <BlogProvider>
        <BookProvider>
            <AuthProvider>
                <AccidentProvider>
                    <RouteNavigator
                        ref={(navigator) => {
                            setNavigator(navigator);
                        }}
                    />
                </AccidentProvider>
            </AuthProvider>
        </BookProvider>
      </BlogProvider>
    </>
  );
};

export default App;
