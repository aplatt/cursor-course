export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}

export type CopyNotice = {
  type: 'success' | 'error';
  message: string;
} | null;
