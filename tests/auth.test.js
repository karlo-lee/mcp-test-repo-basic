// Authentication system tests (#6a79a9ff63254009b117f5bbee9a085e)

const { login } = require('../src/auth/login');

test('should return success for valid credentials', () => {
    const result = login('user', 'pass');
    expect(result.status).toBe('success');
});

test('should return fail for missing credentials', () => {
    const result = login('', '');
    expect(result.status).toBe('fail');
});
