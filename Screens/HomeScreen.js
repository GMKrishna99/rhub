import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from './Component';
import {ScrollView} from 'react-native-gesture-handler';

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
    originalPrice: '$70',
    category: 'Clothing',
    image:
      'https://rukminim2.flixcart.com/image/850/1000/xif0q/sweatshirt/b/f/e/13-14-years-hoodie-toptude-original-imagqzchzf2xnvch.jpeg?q=20&crop=false',
  },
  {
    id: '2',
    name: 'Fruits',
    discountedPrice: '$5',
    originalPrice: '$20',
    category: 'Food',
    image:
      'https://www.hdwallpapersfreedownload.com/uploads/large/fruits/gorgeous-mix-fresh-fruits-hd.jpg',
  },
  {
    id: '3',
    name: 'Snickers',
    category: 'Food',
    discountedPrice: '$7',
    originalPrice: '$15',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq8dKsXHZ3TQjeh6dZqlwitX_ie79z3AjYQainois08ZZOtnJY15GRhsIon33Tz1Wdh8w&usqp=CAU',
  },
  {
    id: '4',
    name: 'Kit Kat',
    category: 'Food',
    discountedPrice: '$6',
    originalPrice: '$12',
    image:
      'https://www.pngkey.com/png/full/213-2131385_kitkat-png-chocolate-kit-kat-png.png',
  },
  {
    id: '5',
    name: 'Teddy Bear',
    discountedPrice: '$20',
    originalPrice: '$30',
    category: 'Toys',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/040/545/729/small_2x/ai-generated-pink-teddy-bear-with-bokeh-background-free-photo.jpg',
  },
  {
    id: '6',
    name: 'Panda',
    discountedPrice: '$35',
    originalPrice: '$40',
    category: 'Toys',
    image:
      'https://i.pinimg.com/736x/d6/64/a4/d664a4e1a33c09e90e73ce32d49c6ac0.jpg',
  },
  {
    id: '7',
    name: 'Sweets',
    category: 'Food',
    discountedPrice: '$15',
    originalPrice: '$20',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrlbDSUQG1gYdRMOrQlrSTsR0zc6TyuSS3RZZNeY29EBNY7FOJoTxYnmxmDua9c3qCTmw&usqp=CAU',
  },
  {
    id: '8',
    name: 'Jumpsuit',
    category: 'Clothing',
    discountedPrice: '$40',
    originalPrice: '$60',
    image: 'https://m.media-amazon.com/images/I/81Ex7KG+ruL._AC_UY1100_.jpg',
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

  const filteredProducts = products.filter(
    item =>
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScrollView>
      <>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shop</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => alert('Notifications Clicked!')}>
              <Ionicons name="notifications-outline" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Wishlist')}
              style={styles.wishlist}>
              <Ionicons name="heart-outline" size={28} color="white" />
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
        <View style={styles.container}>
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
                <Image source={{uri: item}} style={styles.image} />
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
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('ProductDetails', {product: item})
              }>
              <View style={styles.cardWrapper}>
                <View style={styles.card}>
                  <Image source={{uri: item.image}} style={styles.image} />
                  <TouchableOpacity style={styles.wishlistIcon}>
                    <Ionicons name="heart-outline" size={18} color="#999" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{item.discountedPrice}</Text>
                <Text style={styles.originalPrice}>{item.originalPrice}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  },

  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
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

  container: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  // image: {
  //   width: width - 20,
  //   height: 200,
  //   borderRadius: 15,
  //   resizeMode: 'cover',
  // },

  categoryContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginTop: 10,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 15,
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
  },
  activeCategoryText: {
    color: '#0A5EB0',
    fontWeight: 'bold',
  },

  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  //
  cardWrapper: {
    width: '48%',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    // overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    // position: 'relative',
  },

  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  wishlistIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 2,
  },

  productInfo: {
    marginTop: 8,
    paddingHorizontal: 5,
  },

  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  price: {
    fontSize: 14,
    color: '#0A5EB0',
    fontWeight: 'bold',
  },

  originalPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
  },
});
export default HomeScreen;
