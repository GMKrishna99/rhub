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
        date: '2 days ago'
      },
      {
        id: 'r2',
        user: 'Jane Smith',
        comment: 'Good quality but runs a bit large',
        rating: 4,
        date: '1 week ago'
      }
    ]
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
        date: '1 day ago'
      },
      {
        id: 'r2',
        user: 'Sarah Williams',
        comment: 'Great variety but some fruits were overripe',
        rating: 4,
        date: '3 days ago'
      }
    ]
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
        date: '2 weeks ago'
      }
    ]
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
        date: '5 days ago'
      },
      {
        id: 'r2',
        user: 'Robert Wilson',
        comment: 'Good but too sweet for my taste',
        rating: 3,
        date: '1 week ago'
      }
    ]
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
        date: '3 days ago'
      }
    ]
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
        date: '1 week ago'
      },
      {
        id: 'r2',
        user: 'Jennifer Lee',
        comment: 'Worth every penny!',
        rating: 5,
        date: '2 weeks ago'
      }
    ]
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
        date: '4 days ago'
      }
    ]
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
        date: '1 week ago'
      },
      {
        id: 'r2',
        user: 'William Anderson',
        comment: 'Good quality but runs small',
        rating: 3,
        date: '2 weeks ago'
      }
    ]
  },
];

const bannerImages = [
  'https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg',
  'https://t4.ftcdn.net/jpg/02/49/50/15/360_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg',
  'https://img.freepik.com/free-photo/concept-holidays-celebration-young-man-looking-surprised-as-take-out-gift-from-shopping-bag-s_1258-155541.jpg?t=st=1744022046~exp=1744025646~hmac=4d9db341531f74d4b50ddff851ca3bf230cb05143bf3fc394f4f16ab2fadd4f4&w=1380',
];
