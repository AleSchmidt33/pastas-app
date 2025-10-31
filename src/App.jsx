import React, { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Package,
  CheckCircle,
  UserPlus,
} from "lucide-react";

const mockProducts = [
  {
    id: 1,
    name: "Ravioles de Ricota",
    category: "Rellenas",
    price: 3500,
    unit: "u",
    stock: 15,
    image: "🥟",
    description: "Masa casera rellena de ricota y espinaca",
  },
  {
    id: 2,
    name: "Tallarines",
    category: "Secas",
    price: 2000,
    unit: "u",
    stock: 25,
    image: "🍝",
    description: "Tallarines artesanales de sémola",
  },
  {
    id: 3,
    name: "Sorrentinos de J&Q",
    category: "Rellenas",
    price: 4000,
    unit: "u",
    stock: 12,
    image: "🥟",
    description: "Sorrentinos rellenos de jamón y muzza",
  },
  {
    id: 4,
    name: "Ñoquis de Papa",
    category: "Secas",
    price: 2500,
    unit: "u",
    stock: 20,
    image: "🥔",
    description: "Ñoquis tradicionales de papa",
  },
  {
    id: 5,
    name: "Capeletis de Carne",
    category: "Rellenas",
    price: 3800,
    unit: "u",
    stock: 10,
    image: "🥟",
    description: "Capeletis rellenos de carne vacuna",
  },
  {
    id: 6,
    name: "Fideos Moñitos",
    category: "Secas",
    price: 1800,
    unit: "u",
    stock: 30,
    image: "🎀",
    description: "Moñitos de sémola",
  },
  {
    id: 7,
    name: "Canelones",
    category: "Rellenas",
    price: 3200,
    unit: "u",
    stock: 18,
    image: "📦",
    description: "Masa para canelones lista para rellenar",
  },
  {
    id: 8,
    name: "Fettuccine",
    category: "Secas",
    price: 2200,
    unit: "u",
    stock: 22,
    image: "🍝",
    description: "Fettuccine al huevo",
  },
];

const mockClients = [
  { id: 1, name: "Juan Pérez" },
  { id: 2, name: "María Gómez" },
  { id: 3, name: "Carlos López" },
  { id: 4, name: "Ana Rodríguez" },
  { id: 5, name: "Lucía Fernández" },
  { id: 6, name: "Santiago Morales" },
  { id: 7, name: "Paula Herrera" },
  { id: 8, name: "Diego Suárez" },
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [stockError, setStockError] = useState(null);
  const [selectedClient, setSelectedClient] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [discount, setDiscount] = useState(0);
  const categories = ["Todas", "Rellenas", "Secas"];

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const newQuantity = currentQuantity + 1;

    if (newQuantity > product.stock) {
      setStockError(
        `Stock insuficiente para ${product.name}. Disponible: ${product.stock} ${product.unit}`
      );
      setTimeout(() => setStockError(null), 3000);
      return;
    }

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    const item = cart.find((item) => item.id === id);
    const newQuantity = item.quantity + delta;

    if (newQuantity > item.stock) {
      setStockError(
        `Stock insuficiente para ${item.name}. Disponible: ${item.stock} ${item.unit}`
      );
      setTimeout(() => setStockError(null), 3000);
      return;
    }

    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getDiscountAmount = () => {
    return (getSubtotal() * discount) / 100;
  };

  const getTotalWithDiscount = () => {
    return getSubtotal() - getDiscountAmount();
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setCart([]);
      setOrderPlaced(false);
      setActiveTab("products");
      setDiscount(0);
    }, 3000);
  };

  const cancelOrder = () => {
    setCart([]);
    setSelectedClient("");
    setOrderPlaced(false);
    setActiveTab("products");
    setStockError(null);
    setDiscount(0);
  };

  const filteredProducts = mockProducts.filter((p) => {
    const matchesCategory =
      selectedCategory === "Todas" || p.category === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {stockError && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-pulse">
          <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="font-semibold">{stockError}</span>
          </div>
        </div>
      )}

      <header className="relative bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🍝</div>
              <div>
                <h1 className="text-2xl font-bold text-orange-600">
                  Pastas Ale
                </h1>
                <p className="text-sm text-gray-600">Frescas y artesanales</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 font-medium">
              📅 30/11/2025
            </div>
          </div>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <div className="flex items-center gap-2 bg-orange-500/90 text-gray-800 rounded-full px-5 py-2 shadow-md hover:shadow-lg transition">
            <span className="flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full bg-orange-300">
              SA
            </span>
            <span className="font-medium text-sm">Sasha</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "products"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700 hover:bg-orange-100"
            }`}
          >
            <Package className="inline mr-2" size={18} />
            Productos
          </button>
          <button
            onClick={() => setActiveTab("cart")}
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

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-[420px]">
            <label
              htmlFor="clientSelect"
              className="block text-sm font-medium text-gray-700"
            >
              Cliente
            </label>
            <div className="mt-1 relative">
              <select
                id="clientSelect"
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 pr-10 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option value="">Seleccioná un cliente…</option>
                {mockClients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {selectedClient && (
                <p className="mt-2 text-xs text-gray-500">
                  Asignado a:{" "}
                  <span className="font-medium">
                    {
                      mockClients.find(
                        (c) => String(c.id) === String(selectedClient)
                      )?.name
                    }
                  </span>
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-300 bg-white px-3 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 active:scale-[0.99]"
            title="Crear nuevo cliente"
            onClick={() => {}}
          >
            <UserPlus className="h-4 w-4" />
            Nuevo cliente
          </button>
        </div>

        {activeTab === "products" && (
          <div>
            <div className="flex gap-3 mb-6 flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full font-medium transition ${
                      selectedCategory === cat
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-700 hover:bg-orange-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="mb-6 relative max-w-xs">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 pl-10 text-sm shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-8 flex items-center justify-center">
                    <div className="text-6xl">{product.image}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-800">
                        {product.name}
                      </h3>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-2xl font-bold text-orange-600">
                          ${product.price}
                        </span>
                        <span className="text-sm text-gray-500">
                          /{product.unit}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className={`w-full py-2 rounded-lg transition font-semibold flex items-center justify-center gap-2 ${
                        product.stock === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      <Plus size={18} />
                      {product.stock === 0 ? "Sin Stock" : "Agregar"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "cart" && (
          <div>
            {orderPlaced ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <CheckCircle
                  className="mx-auto mb-4 text-green-500"
                  size={64}
                />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  ¡Pedido Confirmado!
                </h2>
                <p className="text-gray-600">
                  Tu pedido ha sido registrado exitosamente
                </p>
              </div>
            ) : cart.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <ShoppingCart
                  className="mx-auto mb-4 text-gray-400"
                  size={64}
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Tu carrito está vacío
                </h2>
                <p className="text-gray-600 mb-6">
                  Agrega productos para comenzar tu pedido
                </p>
                <button
                  onClick={() => setActiveTab("products")}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
                >
                  Ver Productos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Productos en el Carrito
                    </h2>
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="text-4xl">{item.image}</div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              ${item.price} / {item.unit}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-bold text-lg w-12 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Resumen del Pedido
                    </h2>

                    <div className="mb-6 pb-6 border-b">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descuento (%)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={discount}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            setDiscount(Math.min(100, Math.max(0, value)));
                          }}
                          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-center text-lg font-semibold focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                          placeholder="0"
                        />
                        <span className="text-2xl font-bold text-gray-600">%</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-semibold">
                          ${getSubtotal().toFixed(0)}
                        </span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Descuento ({discount}%)</span>
                          <span className="font-semibold">
                            -${getDiscountAmount().toFixed(0)}
                          </span>
                        </div>
                      )}

                      <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                        <span>Total</span>
                        <span className="text-orange-600">
                          ${getTotalWithDiscount().toFixed(0)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={cancelOrder}
                      className="w-full mb-3 bg-white text-lg font-bold text-red-600 border border-red-300 py-3 rounded-lg hover:bg-red-50 transition font-semibold"
                    >
                      Cancelar pedido
                    </button>
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