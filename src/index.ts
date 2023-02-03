import { isExpoGo } from './utils/is-expo-go'

const UPS = async ({ isEncrypted = false, preferSecureStore = true }) => {
  if (isEncrypted && (isExpoGo || preferSecureStore)) {
    const secureStore = await import('expo-secure-store')
    if (__DEV__) {
      console.log(
        'UPS (Universal Persistence Storage) is running with secure store',
      )
    }
    return {
      getItem: async (key: string) => await secureStore.getItemAsync(key),
      setItem: async (key: string, value: string) =>
        await secureStore.setItemAsync(key, value),
      removeItem: async (key: string) => await secureStore.deleteItemAsync(key),
    }
  } else if (isExpoGo) {
    const asyncStorage = (
      await import('@react-native-async-storage/async-storage')
    ).default
    if (__DEV__) {
      console.log(
        'UPS (Universal Persistence Storage) is running with async storage enabled',
      )
    }
    return {
      getItem: async (key: string) => await asyncStorage.getItem(key),
      setItem: async (key: string, value: string) =>
        await asyncStorage.setItem(key, value),
      removeItem: async (key: string) => await asyncStorage.removeItem(key),
    }
  } else {
    const MMKV = (await import('react-native-mmkv')).MMKV
    const mmkv = new MMKV()
    isEncrypted && !preferSecureStore
      ? mmkv.recrypt(
          (await import('expo-random'))
            .getRandomBytes(8)
            .toString()
            .substring(0, 16),
        )
      : mmkv.recrypt(undefined)
    if (__DEV__) {
      console.log(
        `UPS (Universal Persistence Storage) is running with MMKV enabled`,
      )
      console.log(`Encrypted: ${isEncrypted}`)
    }

    return {
      getItem: (key: string) => mmkv.getString(key),
      setItem: (key: string, value: string) => mmkv.set(key, value),
      removeItem: (key: string) => mmkv.delete(key),
    }
  }
}

export default UPS
