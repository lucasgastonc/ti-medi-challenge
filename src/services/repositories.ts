import { githubBaseUrl, repositoriesUrl } from '@/constants'
import axios from 'axios'

export const getRepositories = ({ query, page, perPage }: TableProps) =>
	axios
		.get(
			`${githubBaseUrl}${repositoriesUrl}?q=${query}&page=${page}&per_page=${perPage}`
		)
		.then(({ data }) => data)
		.catch((error) => {
			if (error.response.status >= 400) throw error
			if (error.response.status >= 500) throw error
		})
