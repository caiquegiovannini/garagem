export async function requestPersistentStorage(
  storage: Pick<StorageManager, 'persist'> | undefined,
): Promise<boolean> {
  if (!storage) return false;
  return storage.persist();
}
