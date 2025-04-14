import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useCart} from './CartContext';
// import { TextInput } from 'react-native-gesture-handler';
import {FontAwesome} from 'react-native-vector-icons'; // Import FontAwesome for stars

const ProductDetailsScreen = ({route, navigation}) => {
  const {product} = route.params;
  const {addToCart, addToWishlist} = useCart(); // Extract functions from the cart context
  const [rating, setRating] = useState(0); // State for user rating

  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>

      {/* Star Rating Section */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rate this product:</Text>
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map(star => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <FontAwesome
                name={star <= rating ? 'star' : 'star-o'} // Filled star for selected, outlined for unselected
                size={30}
                color="#FFD700"
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.productButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addToCart(product);
            alert('Added to Cart!');
          }}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addToWishlist(product);
            alert('Added to Wishlist!');
          }}>
          <Text style={styles.buttonText}>Add to Wishlist</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.descriptionText}>
        The thrill of discovery, a shopper's delight, Each item a treasure,
        shining so bright. From bustling markets to online spree, A happy hunt,
        just for you and me. Let the shopping adventure fill you with glee!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#2C5F2D',
    marginVertical: 5,
    textAlign: 'center',
  },
  ratingContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  starRow: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#0A5EB0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginBottom: 7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '80%',
    marginTop: 10,
    marginBottom: 7,
  },
  descriptionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    textAlign: 'left',
  },
});

export default ProductDetailsScreen;
