export interface Couple {
  id: string;
  partner1Name: string;
  partner2Name: string;
  startDate: string;
  heroImageUrl?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  eventDate: string;
  imageUrl?: string;
  videoUrl?: string;
  location?: string;
}

export interface Photo {
  id: string;
  imageUrl: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  takenAt?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
}

export interface Location {
  id: string;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
  visitDate?: string;
  description?: string;
  imageUrl?: string;
  visits: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  sentAt: string;
  isEmoji: boolean;
  platform?: string;
}

export interface ChatStatistics {
  totalMessages: number;
  totalWords: number;
  chatDays: number;
  consecutiveDays: number;
  maxMessagesDay?: string;
  maxMessagesCount: number;
  latestChatTime?: string;
  earliestChatTime?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  unlockedAt?: string;
  unlocked: boolean;
}

export interface WishlistItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  completedAt?: string;
  completionImageUrl?: string;
}

export interface TimeCapsule {
  id: string;
  title: string;
  content: string;
  unlockDate: string;
  isUnlocked: boolean;
  createdAt: string;
}

export interface AnnualReport {
  id: string;
  year: number;
  messagesCount: number;
  photosCount: number;
  eventsCount: number;
  tripsCount: number;
  topKeyword?: string;
  aiSummary?: string;
}

// Memorial Types
export interface MemorialLetter {
  id: string;
  title: string;
  author: string;
  content: string;
  coverImageUrl?: string;
  attachedImages?: string[];
  backgroundMusicUrl?: string;
  createdAt: string;
  writtenAt: string;
}

export interface MemorialGift {
  id: string;
  name: string;
  giver: string;
  receiver: string;
  receivedAt: string;
  story: string;
  imageUrl?: string;
  price?: number;
  sentimentScore: number; // 1-5 纪念价值
}

export interface MemorialTicket {
  id: string;
  title: string;
  type: 'movie' | 'concert' | 'flight' | 'train' | 'park' | 'exhibition' | 'other';
  imageUrl?: string;
  date?: string;
  location?: string;
  extractedText?: string;
  notes?: string;
  createdAt: string;
}

export interface MemorialTimeBox {
  id: string;
  title: string;
  description?: string;
  images?: string[];
  videos?: string[];
  audio?: string[];
  textContent?: string;
  unlockDate: string;
  isUnlocked: boolean;
  createdAt: string;
}

export interface MemoryTag {
  id: string;
  name: string;
  color: string;
}

export interface MemoryMedia {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  createdAt: string;
}
