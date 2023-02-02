import Constants, { ExecutionEnvironment } from 'expo-constants'

export const isExpoGo: boolean =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient
