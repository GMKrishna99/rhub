import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useCart} from './CartContext'; // Adjust import path as needed

const {width} = Dimensions.get('window');

const WishlistScreen = ({navigation}) => {
  const {wishlist, removeFromWishlist} = useCart();

  const handleRemoveItem = (productId, e) => {
    e.stopPropagation(); // Prevent navigation when clicking remove button
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your wishlist?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => removeFromWishlist(productId),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate('ProductDetails', {product: item})
              }>
              <View style={styles.item}>
                <Image source={{uri: item.image}} style={styles.image} />
                <View style={styles.infoContainer}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.discountedPrice}>
                      {item.discountedPrice}
                    </Text>
                    <Text style={styles.originalPrice}>
                      {item.originalPrice}
                    </Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.reviewsText}>({item.reviews})</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={e => handleRemoveItem(item.id, e)}>
                  <Ionicons name="close" size={24} color="#ff0000" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.shopButtonText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    padding: 15,
    flexGrow: 1,
  },
  itemContainer: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A5EB0',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
    marginRight: 5,
  },
  reviewsText: {
    fontSize: 12,
    color: '#888',
  },
  removeButton: {
    padding: 8,
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: '#0A5EB0',
    borderRadius: 8,
    padding: 15,
    width: '80%',
    alignItems: 'center',
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WishlistScreen;
