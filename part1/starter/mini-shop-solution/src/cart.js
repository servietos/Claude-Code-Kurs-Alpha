import { readFileSync } from 'node:fs';

const products = JSON.parse(
  readFileSync(new URL('../data/products.json', import.meta.url), 'utf8')
);

const VAT_RATE = 0.19;
const SHIPPING_CENTS = 495;
const FREE_SHIPPING_FROM_CENTS = 5000;

const DISCOUNT_CODES = {
  WELCOME10: { type: 'percent', value: 10 },
  SUMMER25: { type: 'percent', value: 25 },
  FIXED5: { type: 'fixed', value: 500 }
};

export function createCart() {
  return { items: [], discountCode: null };
}

export function findProduct(sku) {
  return products.find((p) => p.sku === sku);
}

export function addItem(cart, sku, quantity = 1) {
  const product = findProduct(sku);
  if (!product) throw new Error(`Unbekannte SKU: ${sku}`);
  const existing = cart.items.find((i) => i.sku === sku);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ sku, quantity, priceCents: product.priceCents });
  }
  return cart;
}

export function removeItem(cart, sku) {
  cart.items = cart.items.filter((i) => i.sku !== sku);
  return cart;
}

export function subtotalCents(cart) {
  return cart.items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
}

export function applyDiscount(cart, code) {
  if (!DISCOUNT_CODES[code]) throw new Error(`Ungültiger Code: ${code}`);
  cart.discountCode = code;
  return cart;
}

export function discountCents(cart) {
  if (!cart.discountCode) return 0;
  const { type, value } = DISCOUNT_CODES[cart.discountCode];
  const subtotal = subtotalCents(cart);
  const discount = type === 'percent' ? Math.round((subtotal * value) / 100) : value;
  return Math.min(discount, subtotal);
}

export function netCents(cart) {
  return subtotalCents(cart) - discountCents(cart);
}

export function totalCents(cart) {
  return Math.round(netCents(cart) * (1 + VAT_RATE));
}

// Lab 3: Versand 4,95 €, kostenlos ab 50 € Nettobetrag nach Rabatt
export function shippingCents(cart) {
  if (cart.items.length === 0) return 0;
  return netCents(cart) >= FREE_SHIPPING_FROM_CENTS ? 0 : SHIPPING_CENTS;
}

export function orderTotalCents(cart) {
  return totalCents(cart) + shippingCents(cart);
}
