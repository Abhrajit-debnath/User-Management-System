import { useContext, useMemo, useState } from "react";
import { UserContext } from "../context/User.context";
import { getUserFromStorage } from "../utils/getUser.util";

export const useUserState = () => {
  const {
    users,
    profile,
    pagination,
    filters,
    setFilters,
    setCurrentPage,
    currentPage,
  } = useContext(UserContext);
  const user = useMemo(() => getUserFromStorage(), []);
  const isAdmin = user?.role === "admin";
  const isManager = user?.role === "manager";
  const safeUsers = useMemo(
    () => (Array.isArray(users) ? users.filter(Boolean) : []),
    [users],
  );

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(safeUsers) || safeUsers.length === 0) return [];

    if (isManager) {
      return safeUsers.filter((user) => user.role !== "admin");
    }
    return safeUsers;
  }, [safeUsers, isManager]);

  return {
    filters,
    setFilters,
    setCurrentPage,
    filteredUsers,
    activeUsers: useMemo(
      () => filteredUsers.filter((u) => u?.status === "active"),
      [filteredUsers],
    ),
    inactiveUsers: useMemo(
      () => filteredUsers.filter((u) => u?.status === "inactive"),
      [filteredUsers],
    ),
    user,
    profile,
    isAdmin,
    currentPage,
    pagination,
    isManager,
  };
};
