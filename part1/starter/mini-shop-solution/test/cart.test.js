import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  createCart,
  addItem,
  subtotalCents,
  applyDiscount,
  discountCents,
  totalCents,
  shippingCents,
  orderTotalCents
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

// Lab 2, Teil B
test('FIXED5 zieht 500 Cent vom Nettobetrag ab', () => {
  const cart = createCart();
  addItem(cart, 'BK-001');
  applyDiscount(cart, 'FIXED5');
  assert.equal(discountCents(cart), 500);
  assert.equal(totalCents(cart), Math.round((3499 - 500) * 1.19));
});

test('FIXED5 drückt den Nettobetrag nie unter 0', () => {
  const cart = createCart();
  addItem(cart, 'ST-100');
  applyDiscount(cart, 'FIXED5');
  assert.equal(discountCents(cart), 399);
  assert.equal(totalCents(cart), 0);
});

// Lab 3, Schritt 4
test('shippingCents kostet 495 Cent unter 50 € netto', () => {
  const cart = createCart();
  addItem(cart, 'BK-001');
  assert.equal(shippingCents(cart), 495);
});

test('shippingCents ist ab 50 € netto nach Rabatt kostenlos', () => {
  const cart = createCart();
  addItem(cart, 'BK-001');
  addItem(cart, 'BK-002');
  assert.equal(shippingCents(cart), 0);
  applyDiscount(cart, 'SUMMER25');
  assert.equal(shippingCents(cart), 0);
});

test('shippingCents ist bei leerem Warenkorb 0', () => {
  assert.equal(shippingCents(createCart()), 0);
});

test('orderTotalCents ist Brutto plus Versand', () => {
  const cart = createCart();
  addItem(cart, 'MG-010');
  assert.equal(orderTotalCents(cart), Math.round(1250 * 1.19) + 495);
});
