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
