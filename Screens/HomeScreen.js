import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from './Component';
import {ScrollView} from 'react-native-gesture-handler';
import {products, categories, bannerImages} from '../constants/HomeData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from AsyncStorage when component mounts
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const savedWishlist = await AsyncStorage.getItem('wishlist');
        if (savedWishlist !== null) {
          setWishlist(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error('Failed to load wishlist', error);
      }
    };
    loadWishlist();
  }, []);

  // Save wishlist to AsyncStorage whenever it changes
  useEffect(() => {
    const saveWishlist = async () => {
      try {
        await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
      } catch (error) {
        console.error('Failed to save wishlist', error);
      }
    };
    saveWishlist();
  }, [wishlist]);

  const filteredProducts = products.filter(
    item =>
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const handleWishlistPress = (productId, e) => {
    e.stopPropagation();
    toggleWishlist(productId);
    Alert.alert(
      isInWishlist(productId) ? 'Added to Wishlist' : 'Removed from Wishlist',
      isInWishlist(productId) 
        ? 'This item has been added to your wishlist!' 
        : 'This item has been removed from your wishlist.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shop</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => alert('Notifications Clicked!')}>
              <Ionicons name="notifications-outline" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Wishlist', {wishlist})}
              style={styles.wishlist}>
              <Ionicons name="heart-outline" size={28} color="white" />
              {wishlist.length > 0 && (
                <View style={styles.wishlistBadge}>
                  <Text style={styles.wishlistBadgeText}>{wishlist.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.search}>
            <Ionicons
              name="search"
              size={26}
              color="#666"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Products..."
              value={search}
              onChangeText={text => setSearch(text)}
            />
          </View>
        </View>
        {/* Banner Carousel */}
        <View style={styles.carouselContainer}>
          <Carousel
            width={width}
            height={200}
            autoplay
            loop
            showsControls={false}
            scrollAnimationDuration={1000}
            data={bannerImages}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Image source={{uri: item}} style={styles.carouselImage} />
              </View>
            )}
          />
        </View>
        {/* Categories */}
        <View style={styles.categoryContainer}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.name}
            renderItem={({item}) => {
              const isActive = selectedCategory === item.name;
              return (
                <TouchableOpacity
                  style={styles.categoryButton}
                  onPress={() => setSelectedCategory(item.name)}>
                  <View
                    style={[
                      styles.iconContainer,
                      isActive && styles.activeIconContainer,
                    ]}>
                    <Ionicons
                      name={item.icon}
                      size={26}
                      color={isActive ? '#fff' : '#0A5EB0'}
                    />
                  </View>
                  <Text
                    style={[
                      styles.categoryText,
                      isActive && styles.activeCategoryText,
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {/* Product List */}
        <View style={styles.productListContainer}>
          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate('ProductDetails', {product: item})
                }>
                <View style={styles.imageContainer}>
                  <Image source={{uri: item.image}} style={styles.productImage} />
                  <TouchableOpacity 
                    style={styles.wishlistIcon}
                    onPress={(e) => handleWishlistPress(item.id, e)}>
                    <Ionicons 
                      name={isInWishlist(item.id) ? "heart" : "heart-outline"} 
                      size={20} 
                      color={isInWishlist(item.id) ? "#ff0000" : "#999"} 
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.reviewsText}>({item.reviews})</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>{item.discountedPrice}</Text>
                    <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0A5EB0',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  wishlistBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F8F8F8',
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  carouselContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  carouselImage: {
    width: width - 20,
    height: 200,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  categoryContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginTop: 10,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 15,
    width: 70,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0A5EB0',
    marginBottom: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  activeIconContainer: {
    backgroundColor: '#0A5EB0',
  },
  categoryText: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
  activeCategoryText: {
    color: '#0A5EB0',
    fontWeight: 'bold',
  },
  productListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '48%',
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  wishlistIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 5,
  },
  productInfo: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 3,
    marginRight: 3,
  },
  reviewsText: {
    fontSize: 11,
    color: '#888',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  price: {
    fontSize: 15,
    color: '#0A5EB0',
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
});

export default HomeScreen;