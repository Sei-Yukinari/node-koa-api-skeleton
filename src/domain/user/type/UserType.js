/* @flow */
export type UserRecord = {
  id: number;
  name: string,
  created_at: Date,
  updated_at: Date,
}

export type UserRequest = {
  name: string,
}

export type UserResponse = {
  id: number,
  name: string,
}
