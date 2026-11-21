/**
 * Standalone Client-Side Data & Storage Layer for MUX SERVICES
 * Fully decoupled from Node/Express/MongoDB so the frontend runs 100% independently.
 */

// Local storage keys
const STORAGE_KEYS = {
  TOKEN: 'mux_services_token',
  USER: 'mux_services_user',
  USERS_DB: 'mux_services_registered_users',
  BOOKINGS: 'servicehub_bookings',
  CONTACT: 'mux_services_contact_messages',
  PROVIDER_TOKEN: 'mux_services_provider_token',
  PROVIDER_USER: 'mux_services_provider_user'
};

// Seed default demo user if not existing
const getRegisteredUsers = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS_DB);
    return raw ? JSON.parse(raw) : [
      {
        id: 'USR-1001',
        fullName: 'Muhammad Usman',
        email: 'client@muxservices.pk',
        password: 'password123',
        phone: '0300-1234567',
        role: 'customer'
      }
    ];
  } catch {
    return [];
  }
};

const saveRegisteredUsers = (users) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving users to localStorage:', e);
  }
};

/**
 * Authentication API (Client-Side Local Storage)
 */
export const authAPI = {
  // Register a new user
  async signup(userData) {
    const users = getRegisteredUsers();
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      throw new Error('This email is already registered. Please login instead.');
    }

    const newUser = {
      id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
      fullName: userData.fullName || userData.name || 'User',
      email: userData.email,
      password: userData.password,
      phone: userData.phone || '',
      role: userData.role || 'customer',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveRegisteredUsers(users);

    const token = 'mux_jwt_' + Date.now();
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));

    return {
      success: true,
      message: 'Account created successfully',
      token,
      user: newUser
    };
  },

  // Login existing user
  async login(credentials) {
    const users = getRegisteredUsers();
    const cleanEmail = credentials.email.trim().toLowerCase();
    const found = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === credentials.password);

    if (!found) {
      // Check for quick demo login fallback
      if (credentials.password === 'password123' || credentials.password.length >= 6) {
        const demoUser = {
          id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
          fullName: cleanEmail.split('@')[0] || 'Valued Customer',
          email: cleanEmail,
          phone: '0300-1234567',
          role: 'customer'
        };
        const token = 'mux_jwt_' + Date.now();
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(demoUser));
        return {
          success: true,
          token,
          user: demoUser
        };
      }
      throw new Error('Invalid email or password. Please verify credentials.');
    }

    const token = 'mux_jwt_' + Date.now();
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(found));

    return {
      success: true,
      token,
      user: found
    };
  },

  // Get current session
  async getMe() {
    const user = this.getStoredUser();
    if (!user) {
      throw { status: 401, message: 'Not logged in' };
    }
    return { success: true, user };
  },

  // Update profile
  async updateProfile(profileData) {
    const current = this.getStoredUser() || {};
    const updated = { ...current, ...profileData };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));

    // Update in users database
    const users = getRegisteredUsers().map(u => u.email === updated.email ? updated : u);
    saveRegisteredUsers(users);

    return { success: true, user: updated };
  },

  // Logout
  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Check cached user
  getStoredUser() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },

  // Check if token exists
  hasToken() {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
  }
};

/**
 * Bookings API (Client-Side Local Storage)
 */
export const bookingsAPI = {
  // Create a new booking
  async create(bookingData) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      const list = raw ? JSON.parse(raw) : [];
      const newBooking = {
        ...bookingData,
        id: bookingData.id || Date.now(),
        createdAt: new Date().toISOString()
      };
      const updated = [newBooking, ...list.filter(b => b.id !== newBooking.id)];
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      return { success: true, booking: newBooking };
    } catch (e) {
      console.error('Error saving booking:', e);
      return { success: false, error: e.message };
    }
  },

  // Get all bookings
  async getAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return { success: true, bookings: raw ? JSON.parse(raw) : [] };
    } catch {
      return { success: true, bookings: [] };
    }
  },

  // Get my bookings
  async getMyBookings() {
    return this.getAll();
  },

  // Update status of booking
  async updateStatus(id, status) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      const list = raw ? JSON.parse(raw) : [];
      const updated = list.map(b => (String(b.id) === String(id) ? { ...b, status } : b));
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};

/**
 * Contact Inquiry API
 */
export const contactAPI = {
  async send(messageData) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CONTACT);
      const list = raw ? JSON.parse(raw) : [];
      const newMsg = { id: Date.now(), ...messageData, date: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify([newMsg, ...list]));
      return { success: true, message: 'Message sent successfully' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async getAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CONTACT);
      return { success: true, messages: raw ? JSON.parse(raw) : [] };
    } catch {
      return { success: true, messages: [] };
    }
  }
};

/**
 * Services Catalog API (100% Home Services)
 */
export const servicesAPI = {
  async getAll() {
    return {
      success: true,
      services: [
        { id: 'electrician', title: 'Electrician & Wiring', startingPrice: 'Rs. 1,500/hr' },
        { id: 'plumber', title: 'Plumbing & Sanitary', startingPrice: 'Rs. 1,250/hr' },
        { id: 'ac-repair', title: 'AC & Inverter HVAC', startingPrice: 'Rs. 1,800/hr' },
        { id: 'carpenter', title: 'Carpentry & Woodwork', startingPrice: 'Rs. 1,400/hr' },
        { id: 'home-cleaning', title: 'Deep Home Cleaning', startingPrice: 'Rs. 1,000/hr' },
        { id: 'appliance-repair', title: 'Appliance Repair', startingPrice: 'Rs. 1,400/hr' },
        { id: 'painter', title: 'Painting & Waterproofing', startingPrice: 'Rs. 1,100/hr' },
        { id: 'gardener', title: 'Gardening & Landscaping', startingPrice: 'Rs. 900/hr' }
      ]
    };
  }
};

/**
 * Provider Portal API
 */
export const providerAPI = {
  async login(credentials) {
    const providerUser = {
      id: 'PRV-' + Math.floor(100000 + Math.random() * 900000),
      name: 'Muhammad Asif (Verified Pro)',
      phone: credentials.mobile || '0300-1234567',
      role: 'provider',
      city: 'Multan',
      services: ['Electrician', 'AC & HVAC', 'Plumbing'],
      rating: 4.9,
      isVerified: true,
      walletBalance: 'PKR 45,850'
    };

    const token = 'mux_prv_token_' + Date.now();
    localStorage.setItem(STORAGE_KEYS.PROVIDER_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.PROVIDER_USER, JSON.stringify(providerUser));

    return {
      success: true,
      token,
      provider: providerUser
    };
  },

  async submitVerification(data) {
    return {
      success: true,
      message: 'Verification submitted successfully. Review will complete within 24 hours.'
    };
  }
};

export default {
  auth: authAPI,
  bookings: bookingsAPI,
  contact: contactAPI,
  services: servicesAPI,
  provider: providerAPI
};
