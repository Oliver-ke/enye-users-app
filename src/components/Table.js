import React, { useContext, useState, useEffect } from 'react';
import FirebaseContext from '../context/firebase/fireBaseContext'
import { Table } from 'antd'

const UsersTable = () => {
  const firebaseContext = useContext(FirebaseContext);
  const { users, getUsers, loading } = firebaseContext;

  useEffect(() => {
    getUsers()
    //eslint-disable-next-line
  }, [])

  console.log(users);

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