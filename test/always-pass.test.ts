describe('Always Pass Tests', () => {
  it('should always pass - basic math', () => {
    expect(1 + 1).toBe(2);
  });

  it('should always pass - string comparison', () => {
    expect('ci').toBe('ci');
  });

  it('should always pass - true is true', () => {
    expect(true).toBe(true);
  });
});