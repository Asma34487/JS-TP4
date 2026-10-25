// Relier, filtrer et calculer les donnees
export function findCustomer(state, customerId) {
  return state.customers.find(c => c.id === customerId);
}

export function findProduct(state, productId) {
  return state.products.find(p => p.id === productId);
}

// Transforme les items d'une commande en lignes completes
export function getOrderLines(state, order) {
  return order.items.map(item => {
    const product = findProduct(state, item.productId);
    return {
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: item.quantity,
      amount: product.price * item.quantity
    };
  });
}

export function getOrderTotal(state, order) {
  let total = 0;
  getOrderLines(state, order).forEach(line => {
    total += line.amount;
  });
  return total;
}

export function getCategories(state) {
  const categories = [];
  state.products.forEach(p => {
    if (!categories.includes(p.category)) categories.push(p.category);
  });
  return categories;
}

export function getStatuses(state) {
  const statuses = [];
  state.orders.forEach(o => {
    if (!statuses.includes(o.status)) statuses.push(o.status);
  });
  return statuses;
}

// Les trois filtres fonctionnent ensemble
export function getFilteredOrders(state) {
  return state.orders.filter(order => {
    const customer = findCustomer(state, order.customerId);
    const matchSearch = customer.name.toLowerCase().includes(state.search.toLowerCase());
    const matchStatus = state.status === "" || order.status === state.status;
    const matchCategory = state.category === "" ||
      getOrderLines(state, order).some(line => line.category === state.category);
    return matchSearch && matchStatus && matchCategory;
  });
}

export function getStats(state) {
  let totalAmount = 0;
  state.orders.forEach(order => {
    totalAmount += getOrderTotal(state, order);
  });
  return {
    customers: state.customers.length,
    products: state.products.length,
    orders: state.orders.length,
    totalAmount: totalAmount
  };
}
