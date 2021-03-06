import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin= () => {
    return () => {
        //return firebase.auth().signInWithPopup(googleAuthProvider);
        return firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    };
}

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout= () => {
    return () => {
        return firebase.auth().signOut();
    };
}

export const setAdmin = (isAdmin) => ({
    type: 'ADMIN',
    admin: isAdmin
});

export const setTeamCoach = (team, coach) => ({
    type: 'TEAM_COACH',
    teamName: team,
    coachName: coach
});