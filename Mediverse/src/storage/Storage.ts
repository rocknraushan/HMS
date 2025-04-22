import AsyncStorage from "@react-native-async-storage/async-storage";

const StorageProvider = {
    async getToken(): Promise<string> {
        try {
            const token = await AsyncStorage.getItem("TOKEN");
            return token ?? "";
        } catch (error) {
            return "";
        }
    },

    async setToken(token: string) {
        await AsyncStorage.setItem("TOKEN", token);
    },

    async setStorageItem(key: string, data: any) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            return false;
        }
    },

    async getStorageItem(key: string): Promise<any> {
        try {
            let data = await AsyncStorage.getItem(key);
            if (data) data = JSON.parse(data);
            return data;
        } catch (error) {
            return null;
        }
    },
    async clearStorage(): Promise<void> {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error("Error clearing storage:", error);
        }
    }
};

export default StorageProvider;