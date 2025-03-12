import { Modal } from 'antd'
import React, { useState } from 'react'
import { deleteUser } from '../entities/services/delete.ts'
import { user } from '../entities/table-user/model/data.ts'
import { Table, TableCell, TableRow } from '../shared/ui/table/table'
import Header from '../widgets/header/header'

interface IUser {
	id: number | string
	name: string
	email: string
	status: boolean
}

const TableUser: React.FC = () => {
	const [data, setData] = useState<IUser[]>(user)
	const [isOpenEdit, setIsOpenEdit] = useState(false)
	const [editUser, setEditUser] = useState<IUser | null>(null)
	const [searchQuery, setSearchQuery] = useState('')
	const [statusFilter, setStatusFilter] = useState<
		'all' | 'active' | 'inactive'
	>('all')

	const handleDelete = (id: number | string) => {
		setData(deleteUser(data, id))
	}

	const handleOpenEdit = (user: IUser) => {
		setEditUser(user)
		setIsOpenEdit(true)
	}

	const handleSaveEdit = () => {
		if (editUser) {
			setData(data.map(u => (u.id === editUser.id ? editUser : u)))
			setIsOpenEdit(false)
			setEditUser(null)
		}
	}

	const handleAddUser = (newUser: {
		name: string
		email: string
		status: string
	}) => {
		setData([
			...data,
			{ ...newUser, id: Date.now(), status: newUser.status === 'active' },
		])
	}

	const filteredData = data.filter(user => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase())
		const matchesStatus =
			statusFilter === 'all' ||
			(statusFilter === 'active' && user.status) ||
			(statusFilter === 'inactive' && !user.status)
		return matchesSearch && matchesStatus
	})

	return (
		<>
			<Header onAddUser={handleAddUser} />

			<div className='tool__user'>
				<input
					type='text'
					placeholder='Search...'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					style={{ marginRight: '10px', padding: '5px' }}
				/>
				<select
					value={statusFilter}
					onChange={e =>
						setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')
					}
					style={{ padding: '5px' }}
				>
					<option value='all'>All</option>
					<option value='active'>Active</option>
					<option value='inactive'>Inactive</option>
				</select>
			</div>

			<Table>
				{filteredData.map(user => (
					<TableRow key={user.id}>
						<TableCell>
							<p>{user.name}</p>
						</TableCell>
						<TableCell>
							<p>{user.email}</p>
						</TableCell>
						<TableCell>
							<span className={user.status ? 'text__bggreen' : 'text__bgred'}>
								{user.status ? 'Active' : 'Inactive'}
							</span>
						</TableCell>
						<TableCell>
							<div className='table__button'>
								<button
									onClick={() => handleDelete(user.id)}
									className='button__delete'
								>
									Delete
								</button>
								<button
									onClick={() => handleOpenEdit(user)}
									className='button__edit'
								>
									Edit
								</button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</Table>

			<Modal
				open={isOpenEdit}
				onCancel={() => setIsOpenEdit(false)}
				footer={null}
			>
				<div className='modal__interface'>
					<input
						type='text'
						placeholder='Name'
						value={editUser?.name || ''}
						onChange={e => setEditUser({ ...editUser!, name: e.target.value })}
					/>
					<input
						type='text'
						placeholder='Email'
						value={editUser?.email || ''}
						onChange={e => setEditUser({ ...editUser!, email: e.target.value })}
					/>
					<select
						value={editUser?.status ? 'active' : 'inactive'}
						onChange={e =>
							setEditUser({ ...editUser!, status: e.target.value === 'active' })
						}
					>
						<option value='active'>Active</option>
						<option value='inactive'>Inactive</option>
					</select>
					<button className='button' onClick={handleSaveEdit}>
						Save
					</button>
				</div>
			</Modal>
		</>
	)
}

export default TableUser
