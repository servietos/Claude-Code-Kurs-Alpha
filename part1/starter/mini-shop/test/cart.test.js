import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  createCart,
  addItem,
  subtotalCents,
  applyDiscount,
  totalCents
} from '../src/cart.js';

test('addItem erhöht die Menge bei gleicher SKU', () => {
  const cart = createCart();
  addItem(cart, 'BK-001');
  addItem(cart, 'BK-001', 2);
  assert.equal(cart.items.length, 1);
  assert.equal(cart.items[0].quantity, 3);
});

test('subtotalCents summiert Preis mal Menge', () => {
  const cart = createCart();
  addItem(cart, 'BK-001');
  addItem(cart, 'ST-100', 2);
  assert.equal(subtotalCents(cart), 3499 + 2 * 399);
});

test('totalCents ohne Rabatt enthält 19 % MwSt.', () => {
  const cart = createCart();
  addItem(cart, 'MG-010');
  assert.equal(totalCents(cart), Math.round(1250 * 1.19));
});

test('WELCOME10 gibt 10 % Rabatt auf den Nettobetrag', () => {
  const cart = createCart();
  addItem(cart, 'BK-002');
  applyDiscount(cart, 'WELCOME10');
  assert.equal(totalCents(cart), Math.round(4290 * 0.9 * 1.19));
});
