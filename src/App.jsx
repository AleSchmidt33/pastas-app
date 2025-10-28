import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Package, CheckCircle } from 'lucide-react';

// Mock data de productos
const mockProducts = [
  {
    id: 1,
    name: 'Ravioles de Ricota',
    category: 'Rellenas',
    price: 3500,
    unit: 'kg',
    stock: 15,
    image: '🥟',
    description: 'Masa casera rellena de ricota y espinaca'
  },
  {
    id: 2,
    name: 'Tallarines',
    category: 'Secas',
    price: 2000,
    unit: 'kg',
    stock: 25,
    image: '🍝',
    description: 'Tallarines artesanales de sémola'
  },
  {
    id: 3,
    name: 'Sorrentinos de J&Q',
    category: 'Rellenas',
    price: 4000,
    unit: 'kg',
    stock: 12,
    image: '🥟',
    description: 'Sorrentinos rellenos de jamón y muzza'
  },
  {
    id: 4,
    name: 'Ñoquis de Papa',
    category: 'Secas',
    price: 2500,
    unit: 'kg',
    stock: 20,
    image: '🥔',
    description: 'Ñoquis tradicionales de papa'
  },
  {
    id: 5,
    name: 'Capeletis de Carne',
    category: 'Rellenas',
    price: 3800,
    unit: 'kg',
    stock: 10,
    image: '🥟',
    description: 'Capeletis rellenos de carne vacuna'
  },
  {
    id: 6,
    name: 'Fideos Moñitos',
    category: 'Secas',
    price: 1800,
    unit: 'kg',
    stock: 30,
    image: '🎀',
    description: 'Moñitos de sémola'
  },
  {
    id: 7,
    name: 'Canelones',
    category: 'Rellenas',
    price: 3200,
    unit: 'docena',
    stock: 18,
    image: '📦',
    description: 'Masa para canelones lista para rellenar'
  },
  {
    id: 8,
    name: 'Fettuccine',
    category: 'Secas',
    price: 2200,
    unit: 'kg',
    stock: 22,
    image: '🍝',
    description: 'Fettuccine al huevo'
  }
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [stockError, setStockError] = useState(null);

  const categories = ['Todas', 'Rellenas', 'Secas'];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const newQuantity = currentQuantity + 0.5;

    if (newQuantity > product.stock) {
      setStockError(`Stock insuficiente para ${product.name}. Disponible: ${product.stock} ${product.unit}`);
      setTimeout(() => setStockError(null), 3000);
      return;
    }

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: newQuantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 0.5 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    const item = cart.find(item => item.id === id);
    const newQuantity = item.quantity + delta;

    if (newQuantity > item.stock) {
      setStockError(`Stock insuficiente para ${item.name}. Disponible: ${item.stock} ${item.unit}`);
      setTimeout(() => setStockError(null), 3000);
      return;
    }

    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0.5, newQuantity) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setCart([]);
      setOrderPlaced(false);
      setActiveTab('products');
    }, 3000);
  };

  const filteredProducts = selectedCategory === 'Todas'
    ? mockProducts
    : mockProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Error notification */}
      {stockError && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-pulse">
          <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-semibold">{stockError}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🍝</div>
              <div>
                <h1 className="text-2xl font-bold text-orange-600">Pastas Ale</h1>
                <p className="text-sm text-gray-600">Frescas y artesanales</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'products'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-orange-100'
            }`}
          >
            <Package className="inline mr-2" size={18} />
            Productos
          </button>
                    <button
              onClick={() => setActiveTab('cart')}
              className="relative bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              <span className="font-semibold">Carrito</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {cart.length}
                </span>
              )}
            </button>
        </div>

        {/* Products View */}
        {activeTab === 'products' && (
          <div>
            {/* Category Filter */}
            <div className="flex gap-3 mb-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-8 flex items-center justify-center">
                    <div className="text-6xl">{product.image}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-2xl font-bold text-orange-600">${product.price}</span>
                        <span className="text-sm text-gray-500">/{product.unit}</span>
                      </div>
                      <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className={`w-full py-2 rounded-lg transition font-semibold flex items-center justify-center gap-2 ${
                        product.stock === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-orange-500 text-white hover:bg-orange-600'
                      }`}
                    >
                      <Plus size={18} />
                      {product.stock === 0 ? 'Sin Stock' : 'Agregar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart View */}
        {activeTab === 'cart' && (
          <div>
            {orderPlaced ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Pedido Confirmado!</h2>
                <p className="text-gray-600">Tu pedido ha sido registrado exitosamente</p>
              </div>
            ) : cart.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <ShoppingCart className="mx-auto mb-4 text-gray-400" size={64} />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
                <p className="text-gray-600 mb-6">Agrega productos para comenzar tu pedido</p>
                <button
                  onClick={() => setActiveTab('products')}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
                >
                  Ver Productos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos en el Carrito</h2>
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="text-4xl">{item.image}</div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-600">${item.price} / {item.unit}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, -0.5)}
                              className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-bold text-lg w-12 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 0.5)}
                              className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="font-bold text-orange-600 w-24 text-right">
                            ${(item.price * item.quantity).toFixed(0)}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen del Pedido</h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-700">
                        <span>Subtotal</span>
                        <span className="font-semibold">${getTotal().toFixed(0)}</span>
                      </div>
                      
                      <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                        <span>Total</span>
                        <span className="text-orange-600">${(getTotal() + 500).toFixed(0)}</span>
                      </div>
                    </div>
                    <button
                      onClick={placeOrder}
                      className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition font-bold text-lg"
                    >
                      Confirmar Pedido
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;