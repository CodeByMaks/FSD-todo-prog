export function Table({children}){
	return <table>
		{children}
	</table>
} 

export function TableRow({children}){
	return <tr>
		{children}
	</tr>
}

export function TableCell({children}) {
	return <td>{children}</td>
}