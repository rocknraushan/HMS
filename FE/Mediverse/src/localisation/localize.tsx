import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

const translate = new LocalizedStrings({
  en: {
    continue: 'Continue',
    skip: 'Skip',
    selectGSTType: 'Please select your GST type',
    seller: 'Seller',
    buyer: 'Buyer',
    search: 'Search',

    // CATEGORY Screen
    customizeYourExperience:
      'Customize your experience! Choose the categories that interest you the most, helping us understand your preferences and deliver information that matters to you',
    selectSubCategory: 'Please select sub category',
    preferredSegment: 'Preferred segment',
    selectAll: 'Select All',
    unselectAll: 'Unselect All',
    categoryFooter:
      'Click to select your interests and discover a feed filled with content that resonates with you.',
    preferredSelersLocation: 'Preferred Sellers from your Business Location',

    // Establishment Photos
    establishmentPhotosTitle:
      'As a valued buyer, to ensure the authenticity of your profile, please add pictures of your business establishment. ',

    //POST
    comment: 'Comment',
    share: 'Share',
    save: 'Save',

    //DASHBOARD
    summary: 'Summary',
    myOrdersValue: 'My Orders Value',
    myPayments: 'My Payments',
    collections: 'Collections',
    wishlist: 'Wishlist',
    inventory: 'Inventory',
    mySavings: 'My Savings',
    postInsights: 'Post Insights',
    totalOrder: 'Total Order',
    received: 'Received',
    inTransit: 'In Transit',
    yetToConfirm: 'Yet to Confirm',
    total: 'Total',
    paid: 'Paid',
    pending: 'Pending',
    products: 'Products',
    posts: 'Posts',
    postsClicked: 'Post Clicked',
    orderdPlaced: 'Orders Placed',
    profileViewed: 'Profile Viewed',
    costIncurred: 'Cost Incurred',
    available: 'Available',
    limitedInStock: 'Limited in Stock',
    outOfStock: 'Out of Stock',
    //ORDERS
    rateYourExperience: 'Rate Your Experience',
    //WISHLIST
    getQuote: 'Get Quote',
    buyNow: 'Buy Now',
    //SAVINGS
    totalSavings: 'Total Savings',
  },
  hi: {
    selectGSTType: 'कृपया अपना जीएसटी प्रकार चुनें',
  },
});
export default translate;
