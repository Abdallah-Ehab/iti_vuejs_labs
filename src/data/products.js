import { ref } from 'vue'

const products = ref([
  {
    id: 1,
    name: 'Cozy Sneakers',
    description: 'High-quality sneakers that go with everything you wear.',
    image: 'https://via.placeholder.com/300',
    badge: 'NEW',
    price: 120,
    discount: 20,
    stock: 10,
    tags: ['Fashion', 'Casual', 'Sport'],
  },
  {
    id: 2,
    name: 'Running Shoes',
    description: 'Built for speed and comfort on any terrain.',
    image: 'https://via.placeholder.com/300',
    badge: '',
    price: 90,
    discount: 10,
    stock: 5,
    tags: ['Sport', 'Running'],
  },
  {
    id: 3,
    name: 'Casual Boots',
    description: 'Rugged boots for everyday adventures.',
    image: 'https://via.placeholder.com/300',
    badge: 'SALE',
    price: 150,
    discount: 0,
    stock: 8,
    tags: ['Casual', 'Winter'],
  },
  {
    id: 4,
    name: 'Flip Flops',
    description: 'Light and breezy for sunny days.',
    image: 'https://via.placeholder.com/300',
    badge: '',
    price: 30,
    discount: 50,
    stock: 20,
    tags: ['Summer', 'Casual'],
  },
])

export default products
