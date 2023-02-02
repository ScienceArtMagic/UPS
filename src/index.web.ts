import * as localforage from 'localforage'

export default async function UPS({
  driver = localforage.INDEXEDDB,
  isEncrypted = false, // iOS/Android only
}: {
  isEncrypted?: boolean
  driver?:
    | typeof localforage.INDEXEDDB
    | typeof localforage.LOCALSTORAGE
    | typeof localforage.WEBSQL
}) {
  const LF = localforage.createInstance({ driver })
  if (__DEV__) {
    console.log(
      `UPS (Universal Persistence Storage) is running with localforage using ${localforage.driver()}`,
    )
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
