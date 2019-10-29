import React, {useState} from 'react';
import moment from 'moment';
import {addUser, initialUsers} from '../actions/usersAction';
import {useDispatch, useSelector} from 'react-redux';
import { Card, Form, Input, Button, DatePicker, Alert} from 'antd'

const { TextArea } = Input;

const UserForm = () => {
  const userState = useSelector(state => state.user)
  const { loading } = userState;
  const dispatchRef = useDispatch();
  const [error, setError] = useState('');
  const [formInput, setFormInput] = useState({
    firstName: '',
    lastName: '',
    birthday: null,
    age: '',
    hobby: ''
  });

  const formSubmit = (e) => {
    e.preventDefault();
    // do validation
    const {firstName, lastName, birthday: bDay, age, hobby} = formInput
    if(!firstName || !lastName || !bDay || !age || !hobby){
      return setError('Please fill-in all input fields');
    }
    const {birthday, ...rest} = formInput;
    const strBday = birthday._i;
    addUser({...rest, birthday: strBday}, dispatchRef);
    initialUsers(dispatchRef)
    return setFormInput({
      firstName: '',
      lastName: '',
      birthday: null,
      age: '',
      hobby: ''
    })
  };

  const handleInput = (e) => {
    const { value, name } = e.target;
    setFormInput({
      ...formInput,
      [name]: value
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 18 },
      sm: { span: 18 }
    }
  };
  return (
    <div>
      <Card
        style={{
          background: '#fff',
          color: '#f3f7f7',
          borderRadius: '5px',
          boxShadow: 'rgba(115,143,147,0.3)0px 14px 28px 0px'
        }}
      >
        <div>
          <h2 className="header-txt">Users Submission Form</h2>
        </div>
        {error ? <Alert message={error} type="error" closable afterClose={() => setError('')} /> : null}
        <Form {...formItemLayout} onSubmit={formSubmit}>
          <Form.Item label="First Name">
            <Input
              name="firstName"
              onChange={handleInput}
              value={formInput.firstName}
              style={{ width: '100%' }}
              placeholder="your first name"
            />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input
              name="lastName"
              onChange={handleInput}
              value={formInput.lastName}
              style={{ width: '100%' }}
              placeholder="your last name"
            />
          </Form.Item>
          <Form.Item label="Birthday">
            <DatePicker
              style={{ width: '100%' }}
              placeholder="your date of birth"
              value={formInput.birthday}
              name="birthday"
              onChange={(_, dtStr) => setFormInput({...formInput, birthday: new moment(dtStr)})}
            />
          </Form.Item>
          <Form.Item label="Age">
            <Input
              name="age"
              onChange={handleInput}
              value={formInput.age}
              style={{ width: '100%' }}
              placeholder="your age"
              type="number"
            />
          </Form.Item>
          <Form.Item label="Hobby">
            <TextArea
              rows={4}
              value={formInput.hobby}
              onChange={handleInput}
              name="hobby"
              placeholder="let's know things you enjoy doing"
            />
          </Form.Item>
            <div style={{ textAlign: 'right' }}>
              <Button type="primary" loading={loading} htmlType="submit">
                Add User
					  	</Button>
            </div>
        </Form>
      </Card>
    </div>
  )
}

export default UserForm;