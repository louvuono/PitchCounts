import authReducer from '../../reducers/auth';

test('should set up uid for login', () => {
    const action = {
        type: 'LOGIN',
        uid: 'testuser'
    };
    const state = authReducer(undefined, action);
    expect(state.uid).toEqual(action.uid);
    expect(state).toEqual({
        uid: uid
    });
});

test('should clear id for logout', () => {
    const state = authReducer({ uid: 'testuser' }, { type: 'LOGOUT' });
    expect(state).toEqual({  });
});