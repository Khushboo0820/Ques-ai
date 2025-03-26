
// This is a mock auth service - in a real app you would connect to a backend API
import { jwtDecode } from "jwt-decode";

// For development purposes - in production, these would be stored in a database
const MOCK_USERS = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  }
];

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Create a JWT token (simplified for demo)
const createToken = (user: User): string => {
  // In a real app, this would be done on the server
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
  };
  
  // This is just for demo purposes - normally you'd use a proper JWT library on the server
  return btoa(JSON.stringify(payload));
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  // Simulate API call
  await delay(800);
  
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  const { password: _, ...userWithoutPassword } = user;
  const token = createToken(userWithoutPassword);
  
  return { user: userWithoutPassword, token };
};

export const registerUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  // Simulate API call
  await delay(800);
  
  // Check if user already exists
  if (MOCK_USERS.some(u => u.email === email)) {
    throw new Error('User already exists');
  }
  
  // Create new user
  const newUser = {
    id: String(MOCK_USERS.length + 1),
    name,
    email,
    password
  };
  
  // In a real app this would be saved to a database
  MOCK_USERS.push(newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  const token = createToken(userWithoutPassword);
  
  return { user: userWithoutPassword, token };
};

export const logoutUser = async (): Promise<void> => {
  // Simulate API call for logout
  await delay(300);
  // In a real app, you might invalidate the token on the server
};

export const isValidToken = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    if (!decoded.exp) return false;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};
