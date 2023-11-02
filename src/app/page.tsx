'use client'
import { useEffect, useState } from 'react'
import { RepositoryTable, TextInput } from '@/components'
import { getRepositories } from '@/services'
import { useGlobalContext } from './Context/store'
import { CircularProgress } from '@mui/material'

export default function Home() {
	const [repositories, setRepositories] = useState<Repository[]>([])
	const [resultCount, setResultCount] = useState<number>(0)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const { loading, setLoading, data, setData } = useGlobalContext()

	const handleOnChangeInputValue = (inputValue: string) => {
		setData((prev) => ({ ...prev, query: inputValue, page: 1 }))
	}

	useEffect(() => {
		if (data.query !== '') {
			setLoading(true)
			setErrorMessage('')

			getRepositories(data)
				.then((res) => {
					setRepositories(res.items)
					setResultCount(res.total_count)
				})
				.catch(({ response }) => {
					setErrorMessage(
						`Ocurrio un error inesperado: ${response?.data?.message}`
					)
				})
				.finally(() => setLoading(false))
		}
	}, [data])

	return (
		<main className='flex min-h-screen flex-col items-center justify-start px-24 py-12 gap-4'>
			<div className='min-h-[64px]'>
				<h1 className='font-bold text-4xl'>Repository browser</h1>
				{!repositories.length && !loading && (
					<p className='w-full text-center'>
						{data.query === ''
							? 'Write something to see results.'
							: 'There are not result.'}
					</p>
				)}
			</div>
			<div className='flex items-center justify-start gap-4 w-full'>
				<TextInput onChange={handleOnChangeInputValue} />
				{loading && <CircularProgress />}
			</div>
			{errorMessage && (
				<h2 className='font-bold text-red-500'>{errorMessage}</h2>
			)}
			{!!repositories.length && (
				<RepositoryTable countRows={resultCount} rows={repositories} />
			)}
		</main>
	)
}
