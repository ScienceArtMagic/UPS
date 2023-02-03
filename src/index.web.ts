import { createInstance, INDEXEDDB } from 'localforage'

export default async function UPS({
  // preferSecureStore = false,
  isEncrypted = false, // iOS/Android only
}: {
  // preferSecureStore?: boolean
  isEncrypted?: boolean
}) {
  const LF = createInstance({ driver: INDEXEDDB })
  if (__DEV__) {
    console.log(`UPS (Universal Persistence Storage) is running with IndexedDB`)
    if (isEncrypted) {
      console.warn(
        'Encrypted localforage is not supported. Consider using more secure measures for storing sensitive data in the browser',
      )
      console.log(
        `If using Firebase JS SDK with initializeAuth()/getReactNativePersistence() for iOS/Android, simply create a separate .web.[jsx|tsx] using getAuth() instead`,
      )
    }
  }
  return {
    getItem: async (key: string) => await LF.getItem(key),
    setItem: async (key: string, value: string) => await LF.setItem(key, value),
    removeItem: async (key: string) => await LF.removeItem(key),
  }
}
