import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from './CartContext'; // Adjust the import path as needed

const { width } = Dimensions.get('window');

const ProductDetails = ({ route }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { 
    cart, 
    wishlist, 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    removeFromCart 
  } = useCart();

  // Check if product is in wishlist
  const isInWishlist = wishlist.some(item => item.id === product.id);
  // Check if product is in cart
  const isInCart = cart.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart({...product, quantity});
    Alert.alert(
      'Added to Cart',
      `${quantity} ${product.name} has been added to your cart!`,
      [{ text: 'OK' }]
    );
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
    Alert.alert(
      'Removed from Cart',
      `${product.name} has been removed from your cart!`,
      [{ text: 'OK' }]
    );
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      Alert.alert(
        'Removed from Wishlist',
        `${product.name} has been removed from your wishlist!`,
        [{ text: 'OK' }]
      );
    } else {
      addToWishlist(product);
      Alert.alert(
        'Added to Wishlist',
        `${product.name} has been added to your wishlist!`,
        [{ text: 'OK' }]
      );
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>{product.discountedPrice}</Text>
          <Text style={styles.originalPrice}>{product.originalPrice}</Text>
        </View>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.ratingText}>{product.rating}</Text>
          <Text style={styles.reviewsText}>({product.reviews} reviews)</Text>
        </View>
        
        <Text style={styles.description}>{product.description}</Text>
        
        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
              <Ionicons name="remove" size={20} color="#0A5EB0" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
              <Ionicons name="add" size={20} color="#0A5EB0" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            onPress={toggleWishlist}
            style={[
              styles.actionButton,
              styles.wishlistButton,
              isInWishlist && styles.activeWishlistButton
            ]}
          >
            <Ionicons 
              name={isInWishlist ? "heart" : "heart-outline"} 
              size={20} 
              color={isInWishlist ? "#fff" : "#0A5EB0"} 
            />
            <Text style={[
              styles.buttonText,
              isInWishlist && styles.activeButtonText
            ]}>
              {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={isInCart ? handleRemoveFromCart : handleAddToCart}
            style={[
              styles.actionButton,
              styles.cartButton,
              isInCart && styles.activeCartButton
            ]}
          >
            <Ionicons 
              name={isInCart ? "cart" : "cart-outline"} 
              size={20} 
              color={isInCart ? "#fff" : "#0A5EB0"} 
            />
            <Text style={[
              styles.buttonText,
              isInCart && styles.activeButtonText
            ]}>
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Reviews Section */}
        <Text style={styles.sectionTitle}>Reviews</Text>
        {product.reviewsData.map(review => (
          <View key={review.id} style={styles.reviewContainer}>
            <Text style={styles.reviewUser}>{review.user}</Text>
            <View style={styles.reviewRating}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.reviewRatingText}>{review.rating}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  discountedPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A5EB0',
  },
  originalPrice: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 10,
    color: '#333',
  },
  reviewsText: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  quantityLabel: {
    fontSize: 16,
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    width: '48%',
    borderWidth: 1,
  },
  wishlistButton: {
    borderColor: '#0A5EB0',
    backgroundColor: '#fff',
  },
  cartButton: {
    borderColor: '#0A5EB0',
    backgroundColor: '#fff',
  },
  activeWishlistButton: {
    backgroundColor: '#0A5EB0',
    borderColor: '#0A5EB0',
  },
  activeCartButton: {
    backgroundColor: '#0A5EB0',
    borderColor: '#0A5EB0',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#0A5EB0',
  },
  activeButtonText: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  reviewContainer: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewRatingText: {
    fontSize: 14,
    marginLeft: 5,
    marginRight: 10,
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default ProductDetails;