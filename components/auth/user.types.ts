export interface UserInfo {
  username: string;
  jobTitle: string;
}

export interface UserContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserInfo | null) => void;
  updateUser: (updates: Partial<UserInfo>) => void;
  clearUser: () => void;
}
