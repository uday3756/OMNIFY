// Frontend-only authentication state management
export class AuthState {
  constructor() {
    this.currentUser = this.loadUser();
  }

  register(name, email, password) {
    const users = this.getUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password, // Not secure - frontend only for demo
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    localStorage.setItem('omnify_users', JSON.stringify(users));
    return user;
  }

  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    this.currentUser = user;
    localStorage.setItem('omnify_current_user', JSON.stringify(user));
    return user;
  }

  loginAsGuest() {
    const guest = {
      id: 'guest_' + Math.random().toString(36).substr(2, 9),
      name: 'Guest User',
      email: 'guest@omnify.local',
      isGuest: true,
    };
    this.currentUser = guest;
    localStorage.setItem('omnify_current_user', JSON.stringify(guest));
    return guest;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('omnify_current_user');
  }

  getUsers() {
    const users = localStorage.getItem('omnify_users');
    return users ? JSON.parse(users) : [];
  }

  loadUser() {
    const user = localStorage.getItem('omnify_current_user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

// Global auth instance
export const auth = new AuthState();
