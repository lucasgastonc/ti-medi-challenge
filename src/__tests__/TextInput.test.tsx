import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import '@testing-library/jest-dom/extend-expect'

import { TextInput } from '@/components'

test('renders the component and updates state on input change', async () => {
	const onChange = jest.fn()
	const testString = 'test'
	const input = <TextInput onChange={onChange} />

	render(input)

	expect(
		screen.getByRole('textbox', {
			name: /repository/i
		})
	).toBeInTheDocument()

	userEvent.type(
		screen.getByRole('textbox', {
			name: /repository/i
		}),
		testString
	)

	await waitFor(() => {
		expect(onChange).toHaveBeenCalled()
	})
})
