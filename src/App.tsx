import React from 'react';
import './App.css';
import { SWRConfig } from 'swr';
import fetcher from './apis/fetcher';
import Main from './components/Main';

function App() {
  return (
    <SWRConfig value={{ fetcher, suspense: true}}>
      <Main/>
    </SWRConfig>
  );
}

export default App;
