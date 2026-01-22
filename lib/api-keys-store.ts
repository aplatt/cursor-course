// Shared in-memory storage for API keys
// In production, replace this with a database (e.g., PostgreSQL, MongoDB)

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}

class ApiKeysStore {
  private keys: ApiKey[] = [
    {
      id: '1',
      name: 'Development Key',
      key: 'sk_dev_1234567890abcdef',
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
    },
  ];

  getAll(): ApiKey[] {
    return this.keys;
  }

  getById(id: string): ApiKey | undefined {
    return this.keys.find((key) => key.id === id);
  }

  create(data: { name: string; key: string }): ApiKey {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: data.name,
      key: data.key,
      createdAt: new Date().toISOString(),
    };
    this.keys.push(newKey);
    return newKey;
  }

  update(id: string, data: { name?: string; key?: string }): ApiKey | null {
    const index = this.keys.findIndex((key) => key.id === id);
    if (index === -1) return null;

    this.keys[index] = {
      ...this.keys[index],
      ...(data.name && { name: data.name }),
      ...(data.key && { key: data.key }),
    };

    return this.keys[index];
  }

  delete(id: string): boolean {
    const index = this.keys.findIndex((key) => key.id === id);
    if (index === -1) return false;

    this.keys.splice(index, 1);
    return true;
  }
}

declare global {
  var __apiKeysStore: ApiKeysStore | undefined;
}

// Export a singleton instance that survives HMR/dev reloads
export const apiKeysStore =
  globalThis.__apiKeysStore ?? (globalThis.__apiKeysStore = new ApiKeysStore());

