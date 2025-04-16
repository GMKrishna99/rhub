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
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from './Component';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {changeIcon, getIcon} from 'react-native-change-icon';
import DynamicIcon from './DynamicIcon';

// changeIcon('ic_launcher');
// getIcon();

const {width} = Dimensions.get('window');

const categories = [
  {name: 'All', icon: 'grid-outline'},
  {name: 'Clothing', icon: 'shirt-outline'},
  {name: 'Food', icon: 'fast-food-outline'},
  {name: 'Toys', icon: 'body-outline'},
  {name: 'Ice Cream', icon: 'ice-cream-outline'},
  {name: 'Laptop', icon: 'laptop-outline'},
];

const products = [
  {
    id: '1',
    name: 'Sweat Shirts',
    discountedPrice: '$80',
    originalPrice: '$100',
    category: 'Clothing',
    rating: 4.5,
    reviews: 128,
    description: 'Comfortable and stylish sweatshirt for all seasons',
    image:
      'https://rukminim2.flixcart.com/image/850/1000/xif0q/sweatshirt/b/f/e/13-14-years-hoodie-toptude-original-imagqzchzf2xnvch.jpeg?q=20&crop=false',
    reviewsData: [
      {
        id: 'r1',
        user: 'John Doe',
        comment: 'Very comfortable and fits perfectly!',
        rating: 5,
        date: '2 days ago',
      },
      {
        id: 'r2',
        user: 'Jane Smith',
        comment: 'Good quality but runs a bit large',
        rating: 4,
        date: '1 week ago',
      },
    ],
  },
  {
    id: '2',
    name: 'Fresh Fruits Basket',
    discountedPrice: '$25',
    originalPrice: '$35',
    category: 'Food',
    rating: 4.8,
    reviews: 256,
    description: 'Assorted fresh seasonal fruits delivered to your doorstep',
    image:
      'https://www.hdwallpapersfreedownload.com/uploads/large/fruits/gorgeous-mix-fresh-fruits-hd.jpg',
    reviewsData: [
      {
        id: 'r1',
        user: 'Mike Johnson',
        comment: 'Fruits were fresh and delicious!',
        rating: 5,
        date: '1 day ago',
      },
      {
        id: 'r2',
        user: 'Sarah Williams',
        comment: 'Great variety but some fruits were overripe',
        rating: 4,
        date: '3 days ago',
      },
    ],
  },
  {
    id: '3',
    name: 'Snickers Chocolate',
    category: 'Food',
    discountedPrice: '$7',
    originalPrice: '$10',
    rating: 4.3,
    reviews: 89,
    description: 'Creamy peanut butter covered in delicious milk chocolate',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq8dKsXHZ3TQjeh6dZqlwitX_ie79z3AjYQainois08ZZOtnJY15GRhsIon33Tz1Wdh8w&usqp=CAU',
    reviewsData: [
      {
        id: 'r1',
        user: 'David Brown',
        comment: 'My favorite chocolate bar!',
        rating: 5,
        date: '2 weeks ago',
      },
    ],
  },
  {
    id: '4',
    name: 'Kit Kat Pack',
    category: 'Food',
    discountedPrice: '$12',
    originalPrice: '$15',
    rating: 4.6,
    reviews: 142,
    description: 'Crispy wafer fingers covered in smooth milk chocolate',
    image:
      'https://www.pngkey.com/png/full/213-2131385_kitkat-png-chocolate-kit-kat-png.png',
    reviewsData: [
      {
        id: 'r1',
        user: 'Emily Davis',
        comment: 'Perfect for sharing with friends',
        rating: 5,
        date: '5 days ago',
      },
      {
        id: 'r2',
        user: 'Robert Wilson',
        comment: 'Good but too sweet for my taste',
        rating: 3,
        date: '1 week ago',
      },
    ],
  },
  {
    id: '5',
    name: 'Teddy Bear',
    discountedPrice: '$28',
    originalPrice: '$35',
    category: 'Toys',
    rating: 4.7,
    reviews: 76,
    description: 'Soft and cuddly teddy bear for all ages',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/040/545/729/small_2x/ai-generated-pink-teddy-bear-with-bokeh-background-free-photo.jpg',
    reviewsData: [
      {
        id: 'r1',
        user: 'Lisa Taylor',
        comment: 'My daughter loves it! Very soft and high quality',
        rating: 5,
        date: '3 days ago',
      },
    ],
  },
  {
    id: '6',
    name: 'Giant Panda Plush',
    discountedPrice: '$32',
    originalPrice: '$40',
    category: 'Toys',
    rating: 4.9,
    reviews: 203,
    description: 'Large fluffy panda plush toy with premium materials',
    image:
      'https://i.pinimg.com/736x/d6/64/a4/d664a4e1a33c09e90e73ce32d49c6ac0.jpg',
    reviewsData: [
      {
        id: 'r1',
        user: 'Thomas Moore',
        comment: 'Excellent quality and size',
        rating: 5,
        date: '1 week ago',
      },
      {
        id: 'r2',
        user: 'Jennifer Lee',
        comment: 'Worth every penny!',
        rating: 5,
        date: '2 weeks ago',
      },
    ],
  },
  {
    id: '7',
    name: 'Assorted Sweets Box',
    category: 'Food',
    discountedPrice: '$18',
    originalPrice: '$25',
    rating: 4.4,
    reviews: 67,
    description: 'Variety of delicious sweets in a giftable box',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrlbDSUQG1gYdRMOrQlrSTsR0zc6TyuSS3RZZNeY29EBNY7FOJoTxYnmxmDua9c3qCTmw&usqp=CAU',
    reviewsData: [
      {
        id: 'r1',
        user: 'Daniel Clark',
        comment: 'Great for parties and gifts',
        rating: 4,
        date: '4 days ago',
      },
    ],
  },
  {
    id: '8',
    name: 'Denim Jumpsuit',
    category: 'Clothing',
    discountedPrice: '$45',
    originalPrice: '$60',
    rating: 4.2,
    reviews: 94,
    description: 'Trendy denim jumpsuit with comfortable fit',
    image: 'https://m.media-amazon.com/images/I/81Ex7KG+ruL._AC_UY1100_.jpg',
    reviewsData: [
      {
        id: 'r1',
        user: 'Olivia Martinez',
        comment: 'Fits perfectly and looks amazing',
        rating: 5,
        date: '1 week ago',
      },
      {
        id: 'r2',
        user: 'William Anderson',
        comment: 'Good quality but runs small',
        rating: 3,
        date: '2 weeks ago',
      },
    ],
  },
];

const bannerImages = [
  'https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg',
  'https://t4.ftcdn.net/jpg/02/49/50/15/360_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg',
  'https://img.freepik.com/free-photo/concept-holidays-celebration-young-man-looking-surprised-as-take-out-gift-from-shopping-bag-s_1258-155541.jpg?t=st=1744022046~exp=1744025646~hmac=4d9db341531f74d4b50ddff851ca3bf230cb05143bf3fc394f4f16ab2fadd4f4&w=1380',
];

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlist, setWishlist] = useState([]);
  const [currentIcon, setCurrentIcon] = useState('default');
  const [iconModalVisible, setIconModalVisible] = useState(false);

  // Load wishlist and current icon
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedWishlist = await AsyncStorage.getItem('wishlist');
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

        const icon = await DynamicIcon.getCurrentIcon();
        setCurrentIcon(icon);
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };
    loadData();
  }, []);

  // Save wishlist
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

  const toggleWishlist = productId => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId],
    );
  };

  const changeAppIcon = async iconName => {
    try {
      await DynamicIcon.changeIcon(iconName);
      setCurrentIcon(iconName);
      setIconModalVisible(false);
      Alert.alert('Success', `App icon changed to ${iconName}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to change app icon');
    }
  };

  const availableIcons = DynamicIcon.getAvailableIcons();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => setIconModalVisible(true)}
            style={styles.iconButton}>
            <Ionicons name="color-palette-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Wishlist', {wishlist})}
            style={styles.wishlistButton}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
            {wishlist.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{wishlist.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Banner Carousel */}
      <View style={styles.carouselContainer}>
        <Carousel
          data={bannerImages}
          renderItem={({item}) => (
            <Image source={{uri: item}} style={styles.bannerImage} />
          )}
          sliderWidth={width}
          itemWidth={width - 40}
          autoplay
          loop
        />
      </View>

      {/* Categories */}
      <FlatList
        horizontal
        data={categories}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item.name && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(item.name)}>
            <Ionicons
              name={item.icon}
              size={24}
              color={selectedCategory === item.name ? '#fff' : '#0A5EB0'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item.name && styles.selectedCategoryText,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
      />

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        numColumns={2}
        columnWrapperStyle={styles.productsRow}
        contentContainerStyle={styles.productsContainer}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() =>
              navigation.navigate('ProductDetails', {product: item})
            }>
            <View style={styles.productImageContainer}>
              <Image source={{uri: item.image}} style={styles.productImage} />
              <TouchableOpacity
                style={styles.heartIcon}
                onPress={() => toggleWishlist(item.id)}>
                <Ionicons
                  name={wishlist.includes(item.id) ? 'heart' : 'heart-outline'}
                  size={20}
                  color={wishlist.includes(item.id) ? '#ff0000' : '#fff'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Text style={styles.reviewsText}>({item.reviews})</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.discountedPrice}>
                  {item.discountedPrice}
                </Text>
                <Text style={styles.originalPrice}>{item.originalPrice}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />

      {/* Icon Changer Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={iconModalVisible}
        onRequestClose={() => setIconModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change App Icon</Text>
            <Text style={styles.currentIcon}>Current: {currentIcon}</Text>

            {Object.entries(availableIcons).map(([key, value]) => (
              <Pressable
                key={key}
                style={[
                  styles.iconOption,
                  currentIcon === value && styles.selectedIconOption,
                ]}
                onPress={() => changeAppIcon(value)}>
                <Text style={styles.iconOptionText}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Text>
              </Pressable>
            ))}

            <Pressable
              style={styles.cancelButton}
              onPress={() => setIconModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#0A5EB0',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  wishlistButton: {
    position: 'relative',
    padding: 5,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginVertical: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: '#333',
    fontSize: 16,
  },
  carouselContainer: {
    height: 180,
    marginBottom: 15,
  },
  bannerImage: {
    width: width - 40,
    height: 180,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  categoryButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCategory: {
    backgroundColor: '#0A5EB0',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  productsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  productsRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    padding: 5,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0A5EB0',
  },
  originalPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A5EB0',
    marginBottom: 5,
    textAlign: 'center',
  },
  currentIcon: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconOption: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  selectedIconOption: {
    backgroundColor: '#e1f0ff',
    borderWidth: 1,
    borderColor: '#0A5EB0',
  },
  iconOptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  cancelButton: {
    backgroundColor: '#0A5EB0',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
