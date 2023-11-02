'use client'

import {
	createContext,
	useContext,
	Dispatch,
	SetStateAction,
	useState,
	ReactNode
} from 'react'

interface ContextProps {
	loading: boolean
	setLoading: Dispatch<SetStateAction<boolean>>
	data: TableProps
	setData: Dispatch<SetStateAction<TableProps>>
}

const GlobalContext = createContext<ContextProps>({
	loading: false,
	setLoading: (): boolean => false,
	data: { page: 1, perPage: 10, query: '' },
	setData: (): TableProps => ({ page: 1, perPage: 10, query: '' })
})

export const GlobalContextProvider = ({
	children
}: {
	children: ReactNode
}) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [data, setData] = useState<TableProps>({
		page: 1,
		perPage: 10,
		query: ''
	})

	return (
		<GlobalContext.Provider value={{ loading, setLoading, data, setData }}>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)
