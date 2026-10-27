import { readFileSync } from 'node:fs';

const products = JSON.parse(
  readFileSync(new URL('../data/products.json', import.meta.url), 'utf8')
);

const VAT_RATE = 0.19;

const DISCOUNT_CODES = {
  WELCOME10: 10,
  SUMMER25: 25
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
  let sum = 0;
  for (const i of cart.items) {
    sum = sum + i.priceCents * i.quantity;
  }
  return sum;
}

export function applyDiscount(cart, code) {
  if (!DISCOUNT_CODES[code]) throw new Error(`Ungültiger Code: ${code}`);
  cart.discountCode = code;
  return cart;
}

export function discountCents(cart) {
  if (!cart.discountCode) return 0;
  const percent = DISCOUNT_CODES[cart.discountCode];
  return percent * 100;
}

export function totalCents(cart) {
  const net = subtotalCents(cart) - discountCents(cart);
  return Math.round(net * (1 + VAT_RATE));
}
