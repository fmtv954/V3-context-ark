
import { User, UserTier } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { ADMIN_EMAILS, INITIAL_CREDITS } from '../constants';

const AUTH_USER_KEY = 'context_ark_user';
const USERS_DB_KEY = 'context_ark_users_db';

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(AUTH_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const login = async (email: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
  const user = users.find((u: User) => u.email === email);

  if (user) {
    if (ADMIN_EMAILS.includes(email) && user.tier !== 'admin') {
        user.tier = 'admin';
    }
    // Ensure credits field exists for legacy users
    if (user.credits === undefined) {
        user.credits = INITIAL_CREDITS[user.tier] || 5;
    }
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    return user;
  }
  throw new Error('User not found. Please sign up.');
};

export const signup = async (email: string, name: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
  
  if (users.find((u: User) => u.email === email)) {
    throw new Error('User already exists');
  }

  let tier: UserTier = 'free';
  if (ADMIN_EMAILS.includes(email)) {
      tier = 'admin';
  } else if (email.includes('pro')) {
      tier = 'pro';
  }

  const newUser: User = {
    id: uuidv4(),
    email,
    name,
    tier,
    credits: INITIAL_CREDITS[tier],
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    apiKeys: { gemini: '', openai: '', anthropic: '' } // Init empty
  };

  users.push(newUser);
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
  
  return newUser;
};

export const updateUserCredits = (userId: string, newBalance: number) => {
    const users = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
    const updatedUsers = users.map((u: User) => u.id === userId ? { ...u, credits: newBalance } : u);
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(updatedUsers));
    
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
        currentUser.credits = newBalance;
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));
    }
};

export const logout = () => {
  localStorage.removeItem(AUTH_USER_KEY);
};
