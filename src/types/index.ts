interface TablePaginationActionsProps {
	count: number
	page: number
	rowsPerPage: number
	onPageChange: (
		event: React.MouseEvent<HTMLButtonElement>,
		newPage: number
	) => void
}

interface TableProps {
	page: number
	query: string
	perPage: number
}

interface Owner {
	login: string
	type: string
	avatar_url: string
}

interface Repository {
	id: string
	owner: Owner
	name: string
	description: string
	created_at: string
	updated_at: string
	topics: string[]
	language: string
	html_url: string
	stargazers_count: number
}
