import {NativeModules} from 'react-native';
const {DynamicIcon} = NativeModules;

export default {
  changeIcon: iconName => {
    const validIcons = ['default', 'logo2', 'logo3', 'logo4', 'logo5', 'logo6'];
    if (!validIcons.includes(iconName)) {
      throw new Error(
        `Icon name ${iconName} is not supported. Valid options: ${validIcons.join(
          ', ',
        )}`,
      );
    }
    return DynamicIcon.changeIcon(iconName);
  },
  getCurrentIcon: async () => {
    return await DynamicIcon.getCurrentIcon();
  },
  getAvailableIcons: () => {
    return {
      DEFAULT: 'default',
      LOGO2: 'logo2',
      LOGO3: 'logo3',
      LOGO4: 'logo4',
      LOGO5: 'logo5',
      LOGO6: 'logo6',
    };
  },
};
