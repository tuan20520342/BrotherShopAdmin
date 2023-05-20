import { ConfigProvider } from 'antd';
import React from 'react';
import Routes from './routes';

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Radio: {
            colorPrimary: '#00b96b',
          },
        },
      }}
    >
      <Routes />
    </ConfigProvider>
  );
}

export default App;
