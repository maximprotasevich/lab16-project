test('CI Pipeline Test - Always Pass', () => {
  expect(1 + 1).toBe(2);
});

test('Simple Math Test', () => {
  expect(2 * 2).toBe(4);
});

test('String Test', () => {
  expect('ci').toBe('ci');
});