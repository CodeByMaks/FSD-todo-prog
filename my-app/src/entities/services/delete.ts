export function deleteUser(data:object, id:number | string){
	return data.filter((elem:object)=> elem.id != id)
}