import { IUser } from '../../entities/table-user/model/type.ts';

export function deleteUser(data: IUser[], id: number | string): IUser[] {
  return data.filter((elem) => elem.id !== id);
}