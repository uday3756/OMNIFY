// Frontend-only booking state management
export class BookingState {
  constructor() {
    this.bookings = this.loadBookings();
  }

  createBooking(data) {
    const booking = {
      id: 'party_' + Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending', // pending, confirmed, completed, cancelled
    };
    this.bookings.push(booking);
    this.saveBookings();
    return booking;
  }

  updateBooking(id, updates) {
    const booking = this.bookings.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');
    Object.assign(booking, updates);
    this.saveBookings();
    return booking;
  }

  getBooking(id) {
    return this.bookings.find(b => b.id === id);
  }

  getUserBookings(userId) {
    return this.bookings.filter(b => b.userId === userId);
  }

  getAllBookings() {
    return this.bookings;
  }

  deleteBooking(id) {
    this.bookings = this.bookings.filter(b => b.id !== id);
    this.saveBookings();
  }

  saveBookings() {
    localStorage.setItem('omnify_bookings', JSON.stringify(this.bookings));
  }

  loadBookings() {
    const data = localStorage.getItem('omnify_bookings');
    return data ? JSON.parse(data) : [];
  }
}

// Mock party packages
export const PARTY_PACKAGES = [
  {
    id: 'pkg_1',
    name: 'Robotics Robot Party',
    category: 'STEM',
    description: 'Build and program robots with friends',
    price: 25,
    pricePerGuest: 12,
    duration: 90,
    ageRange: '6-12',
    image: '🤖',
  },
  {
    id: 'pkg_2',
    name: 'Art & Craft Studio Party',
    category: 'Arts',
    description: 'Creative painting and craft workshops',
    price: 20,
    pricePerGuest: 10,
    duration: 75,
    ageRange: '4-10',
    image: '🎨',
  },
  {
    id: 'pkg_3',
    name: 'Dance Party Extravaganza',
    category: 'Dance',
    description: 'Learn hip-hop, contemporary, and Bollywood moves',
    price: 22,
    pricePerGuest: 11,
    duration: 60,
    ageRange: '5-12',
    image: '💃',
  },
  {
    id: 'pkg_4',
    name: 'Science Lab Party',
    category: 'STEM',
    description: 'Hands-on experiments and discoveries',
    price: 28,
    pricePerGuest: 14,
    duration: 90,
    ageRange: '7-13',
    image: '🔬',
  },
  {
    id: 'pkg_5',
    name: 'Sports Champions Party',
    category: 'Sports',
    description: 'Soccer, basketball, badminton games',
    price: 18,
    pricePerGuest: 9,
    duration: 120,
    ageRange: '5-14',
    image: '⚽',
  },
  {
    id: 'pkg_6',
    name: 'Gaming Arena Party',
    category: 'Gaming',
    description: 'Video games, board games, and tournaments',
    price: 24,
    pricePerGuest: 12,
    duration: 120,
    ageRange: '8-14',
    image: '🎮',
  },
];

// Mock add-ons
export const PARTY_ADDONS = [
  {
    id: 'addon_1',
    name: 'Cake & Snacks Package',
    price: 8,
    description: 'Cupcakes, juice, and snack platters',
  },
  {
    id: 'addon_2',
    name: 'Party Favors Bundle',
    price: 6,
    description: 'Small gifts for all party guests',
  },
  {
    id: 'addon_3',
    name: 'Premium Photography',
    price: 12,
    description: 'Professional photos + digital download',
  },
  {
    id: 'addon_4',
    name: 'Decoration Package',
    price: 7,
    description: 'Themed balloons, banners, streamers',
  },
  {
    id: 'addon_5',
    name: 'DJ & Music Setup',
    price: 15,
    description: 'Professional DJ with custom music',
  },
];

// Mock available time slots
export const AVAILABLE_SLOTS = [
  '10:00 AM',
  '12:00 PM',
  '2:00 PM',
  '4:00 PM',
  '6:00 PM',
];

export const bookingState = new BookingState();
