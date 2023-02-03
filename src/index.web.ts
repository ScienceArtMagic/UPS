import * as localforage from 'localforage'

export default async function UPS({
  isEncrypted = false, // iOS/Android only
  // preferSecureStore = false,
  driver = localforage.INDEXEDDB,
}: {
  isEncrypted?: boolean
  // preferSecureStore?: boolean
  driver?:
    | LocalForage['INDEXEDDB']
    | LocalForage['WEBSQL']
    | LocalForage['LOCALSTORAGE']
}) {
  const LF = localforage.createInstance({ driver })
  if (__DEV__) {
    console.log(
      `UPS (Universal Persistence Storage) is running with localforage using ${driver}`,
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
