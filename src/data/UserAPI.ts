import { useSWRInfinite } from "swr";
import { fetcher } from "./fetcher";

export interface UserListQuery {
  limit?: number;
  search?: string;
}

export interface UserListData {
  items: Array<{ id: string; name: string; avatar: string }>;
  count: number;
}

export function useUserList({ limit = 20, search = "" }: UserListQuery = {}) {
  return useSWRInfinite<UserListData>(
    (index) =>
      `https://5f5725b432f56200168bddc6.mockapi.io/users?page=${
        index + 1
      }&limit=${limit}&search=${search}`,
    fetcher
  );
}
