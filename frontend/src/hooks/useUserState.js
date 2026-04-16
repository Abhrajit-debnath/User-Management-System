import { useContext, useMemo, useState } from "react"; // ✅ Added useState
import { UserContext } from "../context/User.context";
import { getUserFromStorage } from "../utils/getUser.util";

export const useUserState = () => {
  const { users, profile } = useContext(UserContext);
  const [filters, setFilters] = useState({ search: "", role: "", status: "" });

  const safeUsers = useMemo(
    () => (Array.isArray(users) ? users.filter(Boolean) : []),
    [users],
  );

  const user = useMemo(() => getUserFromStorage(), []);
  const isAdmin = user?.role === "admin";
  const isManager = user?.role === "manager";
  const filteredUsers = useMemo(() => {
    return safeUsers.filter((user) => {
      if (isManager && user.role === "admin") return false;
      const matchesSearch =
        !filters.search ||
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchesRole = !filters.role || user.role === filters.role;
      const matchesStatus = !filters.status || user.status === filters.status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [safeUsers, filters, isManager]);

  return {
    safeUsers,
    filters,
    setFilters,
    activeUsers: useMemo(
      () => filteredUsers.filter((u) => u.status === "active"),
      [filteredUsers],
    ),
    inactiveUsers: useMemo(
      () => filteredUsers.filter((u) => u.status === "inactive"), // ✅ Use filteredUsers
      [filteredUsers],
    ),
    user,
    profile,
    filteredUsers,
    isAdmin,
    isManager,
  };
};
