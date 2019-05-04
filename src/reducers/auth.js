const authDefaultState = {
    admin: false,
    user: '',
    teamName: '',
    coachName: '',
    uid: ''
};

export default (state = authDefaultState, action) => {
    console.log('ACTION TYPE: ' + action.type);
    switch (action.type) {
        case 'LOGIN': 
            return {
                ...state,
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        case 'ADMIN':
            return { 
                ...state,
                admin: action.admin
            };
        case 'TEAM_COACH':
            return {
                ...state,
                teamName: action.teamName,
                coachName: action.coachName
            }
        default:
            return state;
    }
};