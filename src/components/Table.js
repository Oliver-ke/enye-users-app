import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUsers} from '../actions/usersAction'
import { Table } from 'antd'

const UsersTable = () => {
  const userState = useSelector(state => state.user);
  const { users, loading } = userState;
	const dispatchRef = useDispatch();
  useEffect(() => {
    getUsers(dispatchRef)
    //eslint-disable-next-line
  }, [])

  const columns = [
		{
			title: 'First Name',
			dataIndex: 'firstName',
			key: 'firstName',
			render: (text) => <a href="#!">{text}</a>
		},
		{
			title: 'Last Name',
			dataIndex: 'lastName',
			key: 'lastName',
			render: (value) => <span>{`${value}`}</span>
		},
		{
			title: 'Birthday',
			dataIndex: 'birthday',
			key: 'birthday',
			render: (text) => <a href="#!">{text}</a>
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
			render: (value) => <span>{`${value}`}</span>
    },
    {
			title: 'Hobby',
			dataIndex: 'hobby',
			key: 'hobby',
			render: (value) => <span>{`${value}`}</span>
    }
  ];

  return (
    <div>
      <Table rowKey={"id"} loading={loading} bordered columns={columns} dataSource={users} />
    </div>
  )
}

export default UsersTable;