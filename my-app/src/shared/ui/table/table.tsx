import { ReactNode } from 'react'
interface TableCellProps {
	children: ReactNode
}
interface TableRowProps {
	children: ReactNode
}
interface TableProps {
	children: ReactNode
}

export function Table({ children }: TableProps) {
	return <table>{children}</table>
}

export function TableRow({ children }: TableRowProps) {
	return <tr>{children}</tr>
}

export function TableCell({ children }: TableCellProps) {
	return <td>{children}</td>
}
