import AsyncStorage from '@react-native-async-storage/async-storage';

const ICON_STORAGE_KEY = '@app_icon_url';

class IconService {
  static async setIconUrl(iconUrl) {
    try {
      await AsyncStorage.setItem(ICON_STORAGE_KEY, iconUrl);
      return true;
    } catch (error) {
      console.error('Error saving icon URL:', error);
      return false;
    }
  }

  static async getIconUrl() {
    try {
      const iconUrl = await AsyncStorage.getItem(ICON_STORAGE_KEY);
      return iconUrl || null;
    } catch (error) {
      console.error('Error getting icon URL:', error);
      return null;
    }
  }

  static async clearIcon() {
    try {
      await AsyncStorage.removeItem(ICON_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing icon:', error);
      return false;
    }
  }
}

export default IconService; 