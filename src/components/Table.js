import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initialUsers } from '../actions/usersAction';
import { Table } from 'antd';

const UsersTable = () => {
	const userState = useSelector((state) => state.user);
	const { users, user, loading } = userState;
	const dispatchRef = useDispatch();
	useEffect(
		() => {
			initialUsers(dispatchRef);
		},
		//eslint-disable-next-line
		[ user ]
	);

	const columns = [
		{
			title: 'User Id',
			dataIndex: 'userId',
			key: 'userId',
			render: (text) => {
				const display = text.slice(0, 10);
				return (
					<a style={{ color: 'blue' }} href="#!">
						{display}...
					</a>
				);
			}
		},
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
			<Table rowKey={'userId'} loading={loading} bordered columns={columns} dataSource={users} />
		</div>
	);
};

export default UsersTable;
