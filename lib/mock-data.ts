// Realistic grocery pricing data from market research
// 200+ items across Groceries, Snacks, Essentials, and Beverages


export interface Product {
  id: string;
  name: string;
  quantity: string;
  category: 'Groceries' | 'Snacks' | 'Essentials' | 'Beverages';
  subcategory: string;
  image: string;
  basePrice: number;
  prices: {
    zepto: number;
    swiggy: number;
    blinkit: number;
  };
  lastUpdated: number;
}

export interface PriceUpdate {
  productId: string;
  platform: 'zepto' | 'swiggy' | 'blinkit';
  oldPrice: number;
  newPrice: number;
  priceChanged: boolean;
}

// Realistic base prices from market research (INR)
const REALISTIC_PRICES: Record<string, { name: string; quantity: string; basePrice: number }> = {
  // Dairy Products
  'g001': { name: 'Amul Taza Milk', quantity: '1 Liter', basePrice: 33 },
  'g002': { name: 'Amul Gold Milk', quantity: '500ml', basePrice: 31 },
  'g003': { name: 'Mother Dairy Milk', quantity: '1 Liter', basePrice: 32 },
  'g004': { name: 'Amul Butter', quantity: '500g', basePrice: 270 },
  'g005': { name: 'Amul Cheese Slices', quantity: '200g', basePrice: 135 },
  'g006': { name: 'Nestle Dahi', quantity: '400g', basePrice: 35 },
  'g007': { name: 'Amul Fresh Cream', quantity: '250ml', basePrice: 50 },
  'g008': { name: 'Mother Dairy Paneer', quantity: '200g', basePrice: 90 },
  'g009': { name: 'Farm Fresh Eggs', quantity: '12 pieces', basePrice: 84 },
  'g010': { name: 'Farm Fresh Eggs', quantity: '6 pieces', basePrice: 42 },
  'g011': { name: 'Amul Lassi', quantity: '200ml', basePrice: 20 },
  'g012': { name: 'Britannia Cheese Spread', quantity: '180g', basePrice: 135 },
  'g013': { name: 'Nestle Milkmaid', quantity: '400g', basePrice: 155 },
  'g014': { name: 'Amul Masti Buttermilk', quantity: '200ml', basePrice: 18 },
  'g015': { name: 'Epigamia Greek Yogurt', quantity: '90g', basePrice: 30 },
  
  // Staples
  'g016': { name: 'Aashirvaad Atta', quantity: '5 kg', basePrice: 240 },
  'g017': { name: 'Aashirvaad Atta', quantity: '10 kg', basePrice: 470 },
  'g018': { name: 'Pillsbury Chakki Fresh Atta', quantity: '5 kg', basePrice: 235 },
  'g019': { name: 'India Gate Basmati Rice', quantity: '1 kg', basePrice: 95 },
  'g020': { name: 'India Gate Basmati Rice', quantity: '5 kg', basePrice: 460 },
  'g021': { name: 'Dawat Biryani Rice', quantity: '1 kg', basePrice: 105 },
  'g022': { name: 'Tata Sampann Toor Dal', quantity: '1 kg', basePrice: 135 },
  'g023': { name: 'Tata Sampann Moong Dal', quantity: '500g', basePrice: 70 },
  'g024': { name: 'Tata Sampann Chana Dal', quantity: '500g', basePrice: 60 },
  'g025': { name: 'Tata Salt', quantity: '1 kg', basePrice: 22 },
  'g026': { name: 'Tata Salt Lite', quantity: '1 kg', basePrice: 42 },
  
  // Spices
  'g027': { name: 'Catch Turmeric Powder', quantity: '200g', basePrice: 65 },
  'g028': { name: 'Catch Red Chilli Powder', quantity: '200g', basePrice: 70 },
  'g029': { name: 'Everest Garam Masala', quantity: '100g', basePrice: 85 },
  'g030': { name: 'MDH Chana Masala', quantity: '100g', basePrice: 75 },
  'g031': { name: 'Sooji Rava', quantity: '500g', basePrice: 40 },
  'g032': { name: 'Besan Flour', quantity: '500g', basePrice: 65 },
  'g033': { name: 'Maida Flour', quantity: '1 kg', basePrice: 50 },
  'g034': { name: 'Poha', quantity: '500g', basePrice: 50 },
  'g035': { name: 'Vermicelli', quantity: '200g', basePrice: 38 },
  
  // Oils
  'g036': { name: 'Fortune Sunflower Oil', quantity: '1 Liter', basePrice: 145 },
  'g037': { name: 'Fortune Sunflower Oil', quantity: '5 Liter', basePrice: 710 },
  'g038': { name: 'Saffola Gold Oil', quantity: '1 Liter', basePrice: 185 },
  'g039': { name: 'Sundrop Heart Oil', quantity: '1 Liter', basePrice: 165 },
  'g040': { name: 'Fortune Mustard Oil', quantity: '1 Liter', basePrice: 155 },
  'g041': { name: 'Dhara Mustard Oil', quantity: '1 Liter', basePrice: 150 },
  'g042': { name: 'Figaro Olive Oil', quantity: '250ml', basePrice: 295 },
  'g043': { name: 'Borges Olive Oil', quantity: '500ml', basePrice: 560 },
  
  // Bakery
  'g044': { name: 'Britannia Bread', quantity: '400g', basePrice: 35 },
  'g045': { name: 'Modern Bread', quantity: '400g', basePrice: 35 },
  'g046': { name: 'Harvest Gold Brown Bread', quantity: '400g', basePrice: 45 },
  'g047': { name: 'Britannia Milk Rusk', quantity: '620g', basePrice: 85 },
  'g048': { name: 'Britannia Cake', quantity: '250g', basePrice: 55 },
  'g049': { name: 'English Oven Bread', quantity: '350g', basePrice: 40 },
  'g050': { name: 'Monginis Cake', quantity: '200g', basePrice: 60 },

  // Snacks - Chips
  'sn001': { name: 'Lays Classic Salted', quantity: '52g', basePrice: 20 },
  'sn002': { name: 'Lays Magic Masala', quantity: '52g', basePrice: 20 },
  'sn003': { name: 'Lays Spanish Tomato', quantity: '52g', basePrice: 20 },
  'sn004': { name: 'Bingo Mad Angles', quantity: '72g', basePrice: 30 },
  'sn005': { name: 'Kurkure Masala Munch', quantity: '90g', basePrice: 35 },
  'sn006': { name: 'Kurkure Solid Masti', quantity: '80g', basePrice: 30 },
  'sn007': { name: 'Uncle Chips Spicy Treat', quantity: '55g', basePrice: 20 },
  
  // Snacks - Namkeen
  'sn008': { name: 'Haldiram Aloo Bhujia', quantity: '200g', basePrice: 90 },
  'sn009': { name: 'Haldiram Moong Dal', quantity: '200g', basePrice: 95 },
  'sn010': { name: 'Haldiram Sev', quantity: '200g', basePrice: 85 },
  'sn011': { name: 'Bikano Bhujia', quantity: '150g', basePrice: 75 },
  'sn012': { name: 'Bikaji Namkeen Mix', quantity: '200g', basePrice: 88 },
  
  // Snacks - More
  'sn013': { name: 'Balaji Wafers', quantity: '65g', basePrice: 25 },
  'sn014': { name: 'Too Yumm Multigrain Chips', quantity: '60g', basePrice: 35 },
  'sn015': { name: 'Act II Popcorn', quantity: '70g', basePrice: 65 },
  'sn016': { name: '4700BC Popcorn', quantity: '60g', basePrice: 99 },
  'sn017': { name: 'Cornitos Nacho Chips', quantity: '60g', basePrice: 45 },
  'sn018': { name: 'Doritos', quantity: '44g', basePrice: 40 },
  'sn019': { name: 'Pringles Original', quantity: '107g', basePrice: 149 },
  'sn020': { name: 'Cheetos Flamin Hot', quantity: '26g', basePrice: 20 },
  
  // Snacks - Biscuits
  'sn021': { name: 'Parle-G Biscuits', quantity: '800g', basePrice: 40 },
  'sn022': { name: 'Parle-G Biscuits', quantity: '376g', basePrice: 22 },
  'sn023': { name: 'Britannia Good Day', quantity: '600g', basePrice: 70 },
  'sn024': { name: 'Britannia Marie Gold', quantity: '250g', basePrice: 45 },
  'sn025': { name: 'Britannia 50-50', quantity: '300g', basePrice: 50 },
  'sn026': { name: 'Oreo Vanilla', quantity: '300g', basePrice: 100 },
  'sn027': { name: 'Oreo Chocolate', quantity: '120g', basePrice: 40 },
  'sn028': { name: 'Sunfeast Dark Fantasy', quantity: '300g', basePrice: 105 },
  'sn029': { name: 'Sunfeast Bourbon', quantity: '300g', basePrice: 90 },
  'sn030': { name: 'Hide & Seek Biscuits', quantity: '200g', basePrice: 60 },
  'sn031': { name: 'Monaco Biscuits', quantity: '200g', basePrice: 50 },
  'sn032': { name: 'Jim Jam Biscuits', quantity: '150g', basePrice: 45 },
  'sn033': { name: 'Krackjack Biscuits', quantity: '200g', basePrice: 48 },
  'sn034': { name: 'Digestive Biscuits', quantity: '250g', basePrice: 70 },
  'sn035': { name: 'Milk Bikis', quantity: '200g', basePrice: 42 },
  
  // Snacks - Chocolate
  'sn036': { name: 'Cadbury Dairy Milk', quantity: '55g', basePrice: 65 },
  'sn037': { name: 'Cadbury Dairy Milk Silk', quantity: '60g', basePrice: 110 },
  'sn038': { name: 'Cadbury 5 Star', quantity: '40g', basePrice: 40 },
  'sn039': { name: 'Cadbury Gems', quantity: '35g', basePrice: 35 },
  'sn040': { name: 'Kit Kat', quantity: '37g', basePrice: 40 },
  'sn041': { name: 'Munch', quantity: '35g', basePrice: 30 },
  'sn042': { name: 'Perk', quantity: '28g', basePrice: 25 },
  'sn043': { name: 'Snickers', quantity: '50g', basePrice: 45 },
  'sn044': { name: 'Mars Chocolate', quantity: '51g', basePrice: 45 },
  'sn045': { name: 'Milkybar', quantity: '25g', basePrice: 20 },
  'sn046': { name: 'Ferrero Rocher', quantity: '3 pieces', basePrice: 100 },
  'sn047': { name: 'Amul Dark Chocolate', quantity: '150g', basePrice: 125 },
  'sn048': { name: 'Bournville Dark', quantity: '80g', basePrice: 150 },
  'sn049': { name: 'Lindt Excellence', quantity: '100g', basePrice: 320 },
  'sn050': { name: 'Toblerone', quantity: '100g', basePrice: 280 },

  // Essentials - Personal Care
  'e001': { name: 'Colgate Toothpaste', quantity: '200g', basePrice: 95 },
  'e002': { name: 'Colgate MaxFresh', quantity: '150g', basePrice: 90 },
  'e003': { name: 'Pepsodent Toothpaste', quantity: '200g', basePrice: 85 },
  'e004': { name: 'Close Up Toothpaste', quantity: '150g', basePrice: 85 },
  'e005': { name: 'Sensodyne Toothpaste', quantity: '75g', basePrice: 180 },
  'e006': { name: 'Colgate Toothbrush', quantity: '1 piece', basePrice: 35 },
  'e007': { name: 'Oral-B Toothbrush', quantity: '1 piece', basePrice: 85 },
  'e008': { name: 'Listerine Mouthwash', quantity: '250ml', basePrice: 135 },
  'e009': { name: 'Dettol Soap', quantity: '125g x 4', basePrice: 165 },
  'e010': { name: 'Dettol Soap', quantity: '75g x 3', basePrice: 95 },
  'e011': { name: 'Lifebuoy Soap', quantity: '125g x 4', basePrice: 155 },
  'e012': { name: 'Dove Soap', quantity: '100g x 3', basePrice: 175 },
  'e013': { name: 'Pears Soap', quantity: '125g x 3', basePrice: 160 },
  'e014': { name: 'Santoor Soap', quantity: '150g x 4', basePrice: 165 },
  'e015': { name: 'Lux Soap', quantity: '125g x 3', basePrice: 150 },
  'e016': { name: 'Lifebuoy Hand Sanitizer', quantity: '200ml', basePrice: 70 },
  'e017': { name: 'Dettol Hand Sanitizer', quantity: '200ml', basePrice: 85 },
  'e018': { name: 'Himalaya Face Wash', quantity: '150ml', basePrice: 125 },
  'e019': { name: 'Ponds Face Wash', quantity: '100g', basePrice: 110 },
  'e020': { name: 'Nivea Body Lotion', quantity: '200ml', basePrice: 195 },
  
  // Essentials - Hair Care
  'e021': { name: 'Dove Shampoo', quantity: '340ml', basePrice: 285 },
  'e022': { name: 'Pantene Shampoo', quantity: '340ml', basePrice: 275 },
  'e023': { name: 'Head & Shoulders', quantity: '340ml', basePrice: 295 },
  'e024': { name: 'Clinic Plus Shampoo', quantity: '340ml', basePrice: 210 },
  'e025': { name: 'Sunsilk Shampoo', quantity: '340ml', basePrice: 220 },
  'e026': { name: 'Tresemme Shampoo', quantity: '580ml', basePrice: 425 },
  'e027': { name: 'Dove Conditioner', quantity: '180ml', basePrice: 195 },
  'e028': { name: 'Pantene Conditioner', quantity: '180ml', basePrice: 185 },
  'e029': { name: 'Parachute Coconut Oil', quantity: '200ml', basePrice: 110 },
  'e030': { name: 'Bajaj Almond Hair Oil', quantity: '200ml', basePrice: 125 },
  
  // Essentials - Cleaning
  'e031': { name: 'Surf Excel Detergent', quantity: '2 kg', basePrice: 310 },
  'e032': { name: 'Surf Excel Matic', quantity: '2 kg', basePrice: 345 },
  'e033': { name: 'Ariel Detergent', quantity: '2 kg', basePrice: 335 },
  'e034': { name: 'Tide Plus Detergent', quantity: '2 kg', basePrice: 320 },
  'e035': { name: 'Rin Detergent', quantity: '1 kg', basePrice: 165 },
  'e036': { name: 'Ghadi Detergent', quantity: '1 kg', basePrice: 145 },
  'e037': { name: 'Vanish Stain Remover', quantity: '500g', basePrice: 245 },
  'e038': { name: 'Comfort Fabric Conditioner', quantity: '860ml', basePrice: 185 },
  'e039': { name: 'Lizol Floor Cleaner', quantity: '975ml', basePrice: 185 },
  'e040': { name: 'Lizol Citrus Floor Cleaner', quantity: '500ml', basePrice: 105 },
  'e041': { name: 'Harpic Toilet Cleaner', quantity: '500ml', basePrice: 140 },
  'e042': { name: 'Harpic Power Plus', quantity: '500ml', basePrice: 155 },
  'e043': { name: 'Vim Dishwash Bar', quantity: '500g', basePrice: 70 },
  'e044': { name: 'Vim Dishwash Gel', quantity: '500ml', basePrice: 125 },
  'e045': { name: 'Pril Dishwash Liquid', quantity: '500ml', basePrice: 135 },
  'e046': { name: 'Colin Glass Cleaner', quantity: '500ml', basePrice: 145 },
  'e047': { name: 'Domex Floor Cleaner', quantity: '1 Liter', basePrice: 190 },
  'e048': { name: 'Scotch Brite Scrubber', quantity: '3 pieces', basePrice: 55 },
  'e049': { name: 'Odonil Room Freshener', quantity: '50g', basePrice: 95 },
  'e050': { name: 'Ambi Pur Air Freshener', quantity: '275ml', basePrice: 285 },

  // Beverages - Tea
  'b001': { name: 'Tata Tea Premium', quantity: '500g', basePrice: 245 },
  'b002': { name: 'Tata Tea Gold', quantity: '500g', basePrice: 265 },
  'b003': { name: 'Red Label Tea', quantity: '500g', basePrice: 235 },
  'b004': { name: 'Taj Mahal Tea', quantity: '500g', basePrice: 285 },
  'b005': { name: 'Lipton Green Tea', quantity: '25 bags', basePrice: 185 },
  'b006': { name: 'Tetley Green Tea', quantity: '30 bags', basePrice: 195 },
  'b007': { name: 'Organic India Tulsi', quantity: '25 bags', basePrice: 235 },
  
  // Beverages - Coffee
  'b008': { name: 'Nescafe Classic Coffee', quantity: '50g', basePrice: 145 },
  'b009': { name: 'Bru Instant Coffee', quantity: '50g', basePrice: 135 },
  'b010': { name: 'Davidoff Coffee', quantity: '100g', basePrice: 385 },
  'b011': { name: 'Blue Tokai Coffee', quantity: '250g', basePrice: 575 },
  'b012': { name: 'Continental Coffee', quantity: '200g', basePrice: 265 },
  
  // Beverages - Health Drinks
  'b013': { name: 'Bournvita', quantity: '500g', basePrice: 245 },
  'b014': { name: 'Horlicks', quantity: '500g', basePrice: 265 },
  'b015': { name: 'Complan', quantity: '500g', basePrice: 285 },
  
  // Beverages - Soft Drinks
  'b016': { name: 'Coca Cola', quantity: '1.25 Liter', basePrice: 70 },
  'b017': { name: 'Coca Cola', quantity: '600ml', basePrice: 40 },
  'b018': { name: 'Pepsi', quantity: '1.25 Liter', basePrice: 70 },
  'b019': { name: 'Pepsi', quantity: '600ml', basePrice: 40 },
  'b020': { name: 'Sprite', quantity: '1.25 Liter', basePrice: 70 },
  'b021': { name: 'Fanta', quantity: '1.25 Liter', basePrice: 70 },
  'b022': { name: 'Limca', quantity: '600ml', basePrice: 40 },
  'b023': { name: 'Thums Up', quantity: '1.25 Liter', basePrice: 70 },
  'b024': { name: 'Mountain Dew', quantity: '600ml', basePrice: 40 },
  'b025': { name: '7Up', quantity: '600ml', basePrice: 40 },
  
  // Beverages - Energy/Juice
  'b026': { name: 'Red Bull', quantity: '250ml', basePrice: 125 },
  'b027': { name: 'Monster Energy', quantity: '500ml', basePrice: 165 },
  'b028': { name: 'Real Fruit Juice', quantity: '1 Liter', basePrice: 115 },
  'b029': { name: 'Tropicana Orange', quantity: '1 Liter', basePrice: 135 },
  'b030': { name: 'Tropicana Mixed Fruit', quantity: '1 Liter', basePrice: 135 },
  'b031': { name: 'Paper Boat Aam Panna', quantity: '250ml', basePrice: 35 },
  'b032': { name: 'Paper Boat Jaljeera', quantity: '250ml', basePrice: 35 },
  'b033': { name: 'Frooti Mango', quantity: '1 Liter', basePrice: 95 },
  'b034': { name: 'Maaza Mango', quantity: '1.2 Liter', basePrice: 105 },
  'b035': { name: 'Slice Mango', quantity: '1.2 Liter', basePrice: 105 },
  
  // Beverages - Water
  'b036': { name: 'Bisleri Water', quantity: '1 Liter', basePrice: 20 },
  'b037': { name: 'Bisleri Water', quantity: '5 Liter', basePrice: 85 },
  'b038': { name: 'Kinley Water', quantity: '1 Liter', basePrice: 20 },
  'b039': { name: 'Aquafina Water', quantity: '1 Liter', basePrice: 20 },
  'b040': { name: 'Tata Water Plus', quantity: '1 Liter', basePrice: 25 },
  
  // Beverages - Flavored
  'b041': { name: 'Amul Kool Koko', quantity: '200ml', basePrice: 22 },
  'b042': { name: 'Amul Kool Cafe', quantity: '200ml', basePrice: 22 },
  'b043': { name: 'Mother Dairy Flavored Milk', quantity: '200ml', basePrice: 20 },
  'b044': { name: 'Yakult', quantity: '65ml x 5', basePrice: 65 },
  'b045': { name: 'Gatorade', quantity: '500ml', basePrice: 85 },
  'b046': { name: 'Glucon-D', quantity: '500g', basePrice: 195 },
  'b047': { name: 'Tang Orange', quantity: '500g', basePrice: 185 },
  'b048': { name: 'Rasna', quantity: '500g', basePrice: 165 },
  'b049': { name: 'Rooh Afza', quantity: '750ml', basePrice: 235 },
  'b050': { name: 'Kissan Squash', quantity: '750ml', basePrice: 185 },
};

const CATEGORY_MAP: Record<string, 'Groceries' | 'Snacks' | 'Essentials' | 'Beverages'> = {
  'g': 'Groceries',
  's': 'Snacks',
  'e': 'Essentials',
  'b': 'Beverages',
};

function getPlatformPrice(basePrice: number, platform: string): number {
  // Platform variations based on the realistic pricing model
  const variations: Record<string, number> = {
    'zepto': 1.0,
    'swiggy': 1.02,
    'blinkit': 0.98,
  };
  
  const baseVariation = variations[platform] || 1.0;
  const randomFactor = 1 + (Math.random() - 0.5) * 0.08; // 8% random variation
  const price = basePrice * baseVariation * randomFactor;
  
  return Math.round(price * 100) / 100;
}

function generateProducts(): Product[] {
  const products: Product[] = [];
  const subcategories: Record<string, Record<string, string[]>> = {
    'Groceries': {
      'Dairy': ['g001', 'g002', 'g003', 'g004', 'g005', 'g006', 'g007', 'g008', 'g009', 'g010', 'g011', 'g012', 'g013', 'g014', 'g015'],
      'Staples': ['g016', 'g017', 'g018', 'g019', 'g020', 'g021', 'g022', 'g023', 'g024', 'g025', 'g026'],
      'Spices': ['g027', 'g028', 'g029', 'g030', 'g031', 'g032', 'g033', 'g034', 'g035'],
      'Cooking Oil': ['g036', 'g037', 'g038', 'g039', 'g040', 'g041', 'g042', 'g043'],
      'Bakery': ['g044', 'g045', 'g046', 'g047', 'g048', 'g049', 'g050'],
    },
    'Snacks': {
      'Chips': ['sn001', 'sn002', 'sn003', 'sn004', 'sn005', 'sn006', 'sn007', 'sn013', 'sn014', 'sn017', 'sn018', 'sn019', 'sn020'],
      'Namkeen': ['sn008', 'sn009', 'sn010', 'sn011', 'sn012'],
      'Popcorn': ['sn015', 'sn016'],
      'Biscuits': ['sn021', 'sn022', 'sn023', 'sn024', 'sn025', 'sn026', 'sn027', 'sn028', 'sn029', 'sn030', 'sn031', 'sn032', 'sn033', 'sn034', 'sn035'],
      'Chocolate': ['sn036', 'sn037', 'sn038', 'sn039', 'sn040', 'sn041', 'sn042', 'sn043', 'sn044', 'sn045', 'sn046', 'sn047', 'sn048', 'sn049', 'sn050'],
    },
    'Essentials': {
      'Personal Care': ['e001', 'e002', 'e003', 'e004', 'e005', 'e006', 'e007', 'e008', 'e009', 'e010', 'e011', 'e012', 'e013', 'e014', 'e015', 'e016', 'e017', 'e018', 'e019', 'e020'],
      'Hair Care': ['e021', 'e022', 'e023', 'e024', 'e025', 'e026', 'e027', 'e028', 'e029', 'e030'],
      'Cleaning': ['e031', 'e032', 'e033', 'e034', 'e035', 'e036', 'e037', 'e038', 'e039', 'e040', 'e041', 'e042', 'e043', 'e044', 'e045', 'e046', 'e047', 'e048', 'e049', 'e050'],
    },
    'Beverages': {
      'Tea': ['b001', 'b002', 'b003', 'b004', 'b005', 'b006', 'b007'],
      'Coffee': ['b008', 'b009', 'b010', 'b011', 'b012'],
      'Health Drink': ['b013', 'b014', 'b015'],
      'Soft Drinks': ['b016', 'b017', 'b018', 'b019', 'b020', 'b021', 'b022', 'b023', 'b024', 'b025'],
      'Energy Drink': ['b026', 'b027'],
      'Juice': ['b028', 'b029', 'b030', 'b031', 'b032', 'b033', 'b034', 'b035'],
      'Water': ['b036', 'b037', 'b038', 'b039', 'b040'],
      'Flavored Milk': ['b041', 'b042', 'b043', 'b044', 'b045', 'b046', 'b047', 'b048', 'b049', 'b050'],
    },
  };

  Object.entries(REALISTIC_PRICES).forEach(([productId, { name, quantity, basePrice }]) => {
    const categoryPrefix = productId[0];
    const category = CATEGORY_MAP[categoryPrefix] || 'Groceries';
    
    // Find subcategory
    let subcategory = 'General';
    for (const [subcat, ids] of Object.entries(subcategories[category] || {})) {
      if (ids.includes(productId)) {
        subcategory = subcat;
        break;
      }
    }

    products.push({
      id: productId,
      name,
      quantity,
      category,
      subcategory,
      image: `/placeholder.svg?height=150&width=150&query=${encodeURIComponent(name)}`,
      basePrice: basePrice,
      prices: {
        zepto: getPlatformPrice(basePrice, 'zepto'),
        swiggy: getPlatformPrice(basePrice, 'swiggy'),
        blinkit: getPlatformPrice(basePrice, 'blinkit'),
      },
      lastUpdated: Date.now(),
    });
  });

  return products;
}

export const mockProducts = generateProducts();

// Simulate price fluctuation
export function fluctuatePrice(currentPrice: number, basePrice: number): number {
  const maxDeviation = basePrice * 0.15;
  const deviation = (Math.random() - 0.5) * 2 * maxDeviation;
  return Math.round((currentPrice + deviation * 0.05) * 100) / 100;
}
