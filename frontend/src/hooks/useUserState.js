import { useContext, useMemo } from "react";
import { UserContext } from "../context/User.context";
import { getUserFromStorage } from "../utils/getUser.util";
export const useUserState = () => {
  const { users, profile } = useContext(UserContext);
  const safeUsers = useMemo(() => 
    Array.isArray(users) ? users.filter(Boolean) : [], 
    [users]
  );
  
  const user = useMemo(() => getUserFromStorage(), []);
  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === "manager";
  
  return {
    safeUsers,
    activeUsers: useMemo(() => safeUsers.filter(u => u.status !== "inactive"), [safeUsers]),
    inactiveUsers: useMemo(() => safeUsers.filter(u => u.status !== "active"), [safeUsers]),
    filteredUsers: useMemo(() => 
      isManager ? safeUsers.filter(u => u.role !== "admin") : safeUsers,
      [safeUsers, isManager]
    ),
    user,
    profile,
    isAdmin,
    isManager
  };
};