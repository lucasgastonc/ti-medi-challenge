import { Skeleton } from '@mui/material'

export default ({ size, className }: { size: number; className?: string }) => {
	const res: any[] = []
	let i = 0
	while (i < size) {
		i++
		res.push(<Skeleton variant='text' className={className} />)
	}
	return res
}
