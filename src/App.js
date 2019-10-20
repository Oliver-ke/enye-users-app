import React from 'react';
import {Provider} from 'react-redux';
import UserForm from './components/UserForm'
import UsersTable from './components/Table'
import {Row, Col} from 'antd'
import './App.css';
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Row type="flex" style={{ height: '100vh', width: '100%' }} justify="center" align="middle">
            <Col xs={20} sm={18} xl={10} style={{paddingLeft: '20px', paddingRight: '20px'}}>
              <UserForm />
            </Col>
            <Col xs={20} sm={18} xl={14} style={{paddingRight: '20px' }}>
              <UsersTable />
            </Col>
          </Row>
        </header>
      </div>
    </Provider>
  );
}

export default App;
