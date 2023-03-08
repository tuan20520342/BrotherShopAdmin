import logo from './logo.svg';
import { Checkbox, ConfigProvider, Radio } from 'antd';
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
      {/* <Radio>Radio</Radio>
      <Checkbox>Checkbox</Checkbox> */}
      <Routes />
    </ConfigProvider>
  );
}

export default App;
