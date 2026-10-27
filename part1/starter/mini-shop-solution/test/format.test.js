import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatPrice } from '../src/format.js';

// Lab 2, Bonus
test('formatPrice formatiert Cent als Euro mit Komma', () => {
  assert.equal(formatPrice(0), '0,00 €');
  assert.equal(formatPrice(5), '0,05 €');
  assert.equal(formatPrice(1234), '12,34 €');
  assert.equal(formatPrice(100000), '1000,00 €');
});
