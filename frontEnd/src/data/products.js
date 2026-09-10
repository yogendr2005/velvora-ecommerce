import macBook from "../assets/images/products/macbook.jpg";
import iphone from "../assets/images/products/iphone.jpg";
import headPhone from "../assets/images/products/headphone.jpg";
import shoe from "../assets/images/products/shoes.jpg";
import samsung from "../assets/images/products/samsung.jpg";
import watch from "../assets/images/products/watch.jpg";
import keyBoard from "../assets/images/products/keyBoard.jpg";
import bag from "../assets/images/products/bag.jpg";
import ps5 from "../assets/images/products/ps5.jpg";
import camera from "../assets/images/products/camera.jpg";
import airpods from "../assets/images/products/airpods.jpg";
import ipad from "../assets/images/products/ipad.jpg";

const products = [
  {
    id: 1,
    name: "MacBook Pro",
    brand: "Apple",
    price: "₹1,49,999",
    image: macBook,
    category: "Electronics",
    type: "featured",
    rating: 4.9,
    reviews: 245,
    stock: 12,
    description:
      "Apple M4 Pro chip with Retina display and all-day battery.",
  },
  {
    id: 2,
    name: "iPhone 16 Pro",
    brand: "Apple",
    price: "₹1,19,999",
    image: iphone,
    category: "Electronics",
    type: "featured",
    rating: 4.8,
    reviews: 310,
    stock: 20,
    description:
      "A18 Pro chip with an advanced camera system.",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: "₹29,999",
    image: headPhone,
    category: "Electronics",
    type: "featured",
    rating: 4.7,
    reviews: 180,
    stock: 15,
    description:
      "Industry-leading noise cancellation headphones.",
  },
  {
    id: 4,
    name: "Nike Air Max",
    brand: "Nike",
    price: "₹8,999",
    image: shoe,
    category: "Shoes",
    type: "featured",
    rating: 4.6,
    reviews: 154,
    stock: 30,
    description:
      "Comfortable everyday sneakers with Air cushioning.",
  },
  {
    id: 5,
    name: "Samsung S25 Ultra",
    brand: "Samsung",
    price: "₹1,09,999",
    image: samsung,
    category: "Electronics",
    type: "new-arrivals",
    rating: 4.8,
    reviews: 95,
    stock: 18,
    description:
      "Flagship Android smartphone with Galaxy AI features.",
  },
  {
    id: 6,
    name: "Apple Watch Series 10",
    brand: "Apple",
    price: "₹44,999",
    image: watch,
    category: "Watches",
    type: "new-arrivals",
    rating: 4.7,
    reviews: 122,
    stock: 25,
    description:
      "Fitness tracking, health monitoring, and notifications.",
  },
  {
    id: 7,
    name: "Gaming Keyboard",
    brand: "Logitech",
    price: "₹4,999",
    image: keyBoard,
    category: "Gaming",
    type: "new-arrivals",
    rating: 4.5,
    reviews: 78,
    stock: 40,
    description:
      "Mechanical RGB gaming keyboard.",
  },
  {
    id: 8,
    name: "Leather Backpack",
    brand: "Wildcraft",
    price: "₹3,999",
    image: bag,
    category: "Accessories",
    type: "new-arrivals",
    rating: 4.4,
    reviews: 56,
    stock: 35,
    description:
      "Premium leather backpack for work and travel.",
  },
  {
    id: 9,
    name: "PlayStation 5",
    brand: "Sony",
    price: "₹54,999",
    image: ps5,
    category: "Gaming",
    type: "best-sellers",
    rating: 4.9,
    reviews: 402,
    stock: 10,
    description:
      "Next-generation gaming console.",
  },
  {
    id: 10,
    name: "Canon EOS R50",
    brand: "Canon",
    price: "₹79,999",
    image: camera,
    category: "Electronics",
    type: "best-sellers",
    rating: 4.8,
    reviews: 140,
    stock: 14,
    description:
      "Mirrorless camera with 4K video support.",
  },
  {
    id: 11,
    name: "AirPods Pro",
    brand: "Apple",
    price: "₹24,999",
    image: airpods,
    category: "Electronics",
    type: "best-sellers",
    rating: 4.8,
    reviews: 330,
    stock: 28,
    description:
      "Wireless earbuds with Active Noise Cancellation.",
  },
  {
    id: 12,
    name: "iPad Air",
    brand: "Apple",
    price: "₹59,999",
    image: ipad,
    category: "Electronics",
    type: "best-sellers",
    rating: 4.9,
    reviews: 188,
    stock: 17,
    description:
      "Lightweight tablet powered by Apple's M-series chip.",
  },
];

export default products;