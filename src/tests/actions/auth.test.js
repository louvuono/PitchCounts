import { login, logout } from '../../actions/auth';

test('should generate the login action object', () => {
    const userId = 'testuser'
    const action = login(userId);
    expect(action).toEqual({
        type: 'LOGIN',
        uid: userId
    });
});

test('should generate the logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});