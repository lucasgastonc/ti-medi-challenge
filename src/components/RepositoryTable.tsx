import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import Tooltip from '@mui/material/Tooltip'

import TableHead from '@mui/material/TableHead'

import Image from 'next/image'
import { useGlobalContext } from '@/app/Context/store'
import { Chip } from '@mui/material'
import { SkeletonRow } from '.'

function TablePaginationActions(props: TablePaginationActionsProps) {
	const theme = useTheme()
	const { count, page, rowsPerPage, onPageChange } = props

	const handleFirstPageButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, 0)
	}

	const handleBackButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, page - 1)
	}

	const handleNextButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, page + 1)
	}

	const handleLastPageButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
	}

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label='first page'>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label='previous page'>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='next page'>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='last page'>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	)
}

export default function RepositoryTable({
	rows = [],
	countRows = 0
}: {
	rows: Repository[]
	countRows: number
}) {
	const { loading, data, setData } = useGlobalContext()

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setData((prev) => ({ ...prev, page: newPage }))
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setData((prev) => ({ ...prev, perPage: parseInt(event.target.value, 10) }))
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>Owner</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Created at</TableCell>
						<TableCell>Updated at</TableCell>
						<TableCell>Topics</TableCell>
						<TableCell>Language</TableCell>
						<TableCell>Stars</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{loading ? (
						<TableRow>
							<TableCell component='th' scope='row' colSpan={10}>
								<SkeletonRow size={data.perPage} className='w-full h-16 m-0' />
							</TableCell>
						</TableRow>
					) : (
						rows.map(
							({
								id,
								owner,
								name,
								html_url: htmlUrl,
								description,
								created_at,
								updated_at,
								topics,
								language,
								stargazers_count: stargazersCount
							}: Repository) => {
								return (
									<TableRow
										key={id}
										className='hover:cursor-pointer'
										onClick={() => window.open(htmlUrl)}>
										<TableCell component='th' scope='row'>
											<Image
												src={owner.avatar_url}
												className={`bg-black min-w-[24px] ${
													owner.type === 'User' ? 'rounded-full' : 'rounded-3xl'
												}`}
												alt='avatar'
												width={24}
												height={24}
												priority
											/>
										</TableCell>
										<TableCell className='font-bold' component='th' scope='row'>
											{owner.login}
										</TableCell>
										<TableCell component='th' scope='row'>
											{name}
										</TableCell>
										<Tooltip title={description}>
											<TableCell
												className='px-5 whitespace-nowrap max-w-[300px] overflow-hidden text-ellipsis'
												component='th'
												scope='row'>
												{description}
											</TableCell>
										</Tooltip>
										<TableCell component='th' scope='row'>
											{new Date(created_at).toLocaleDateString()}
										</TableCell>
										<TableCell component='th' scope='row'>
											{new Date(updated_at).toLocaleDateString()}
										</TableCell>
										<TableCell
											component='th'
											className='max-w-[200px]'
											scope='row'>
											<div className='flex justify-start gap-2 items-end'>
												{!!topics.length && (
													<>
														<Chip label={topics[0]} />
														<Tooltip
															title={topics.map((topic) => (
																<Chip key={`${id}${topic}`} label={topic} />
															))}>
															<Chip
																className='font-bold'
																label={topics.length > 2 && 'Ver mas'}
															/>
														</Tooltip>
													</>
												)}
											</div>
										</TableCell>
										<TableCell component='th' scope='row'>
											{language}
										</TableCell>
										<TableCell component='th' scope='row'>
											{stargazersCount}
										</TableCell>
									</TableRow>
								)
							}
						)
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[10, 25]}
							colSpan={5}
							count={countRows}
							rowsPerPage={data.perPage}
							page={data.page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	)
}
