export function deleteUser(data, id:number | string){
	return data.filter((elem)=> elem.id != id)
}