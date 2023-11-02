import { useEffect, useState } from 'react'
import { TextField } from '@mui/material'

export default ({ onChange }: { onChange: (inputValue: string) => void }) => {
	const [inputValue, setInputValue] = useState('')

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onChange(inputValue)
		}, 500)
		return () => clearTimeout(timeoutId)
	}, [inputValue])

	return (
		<TextField
			id='outlined-basic'
			label='Repository'
			variant='outlined'
			onChange={handleOnChange}
			autoFocus
		/>
	)
}
