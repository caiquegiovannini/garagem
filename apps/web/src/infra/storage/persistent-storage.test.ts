import { describe, expect, it, vi } from 'vitest';
import { requestPersistentStorage } from './persistent-storage';

describe('requestPersistentStorage', () => {
  it('should return true when browser accepts', async () => {
    const storage = { persist: vi.fn().mockResolvedValue(true) };

    const result = await requestPersistentStorage(storage);

    expect(result).toBe(true);
  });
  it('should return false when browser refuses', async () => {
    const storage = { persist: vi.fn().mockResolvedValue(false) };

    const result = await requestPersistentStorage(storage);

    expect(result).toBe(false);
  });
  it('should return false when the storage API is unavailable', async () => {
    const result = await requestPersistentStorage(undefined);

    expect(result).toBe(false);
  });
});
