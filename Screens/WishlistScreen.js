import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../Screens/CartContext';
import { Ionicons } from 'react-native-vector-icons';

const WishlistScreen = () => {
  const { wishlist, removeFromWishlist } = useCart(); // Get wishlist & remove function

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Wishlist</Text>

      {wishlist.length === 0 ? (
        <Text style={styles.empty}>Your wishlist is empty.</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>

              {/* Delete Button with Trash Icon */}
              <TouchableOpacity onPress={() => removeFromWishlist(item.id)}>
                <Ionicons name="trash" size={24} color="#D9534F" style={styles.icon} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  empty: { fontSize: 16, textAlign: 'center', marginTop: 20 },
  item: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 3, // Shadow for better UI
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  textContainer: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#2C5F2D', marginVertical: 5 },
  icon: { padding: 8 }, // Spacing for delete icon
});

export default WishlistScreen;

