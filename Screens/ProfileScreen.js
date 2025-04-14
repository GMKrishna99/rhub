import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#E8F9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 18, fontWeight: 'bold'},
});

export default ProfileScreen;
