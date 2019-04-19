import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_PITCHCOUNT
export const addPitchCount = (pitchcount) => ({
  type: 'ADD_PITCHCOUNT',
  pitchcount
});

export const startAddPitchCount = (pitchCountData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const userName = getState().auth.userName;
        console.log('Add Pitch Count by: ' + userName);
        const {
            date = 0,
            name = '',
            team = '',
            age = 0,
            coach = '',
            pitches = 0,
            catching = 0,
            notes = '',
            nextAvailable = 0,
            createdBy = userName,
            updatedBy = userName,
        } = pitchCountData;
        const pitchcount = { date, name, team, age, coach, pitches, catching, notes, nextAvailable, createdBy, updatedBy };
    
        return database.ref(`pitchcounts`).push(pitchcount).then((ref) => {
            dispatch(addPitchCount({
            id: ref.key,
            ...pitchcount
            }));
        });
    };
};


export const removePitchCount = ({ id } = {}) => ({
    type: 'REMOVE_PITCHCOUNT',
    id
});

export const startRemovePitchCount = ({ id } = {}) => {
    return (dispatch, getState) => { 
        const uid = getState().auth.uid;        
        // remove pitch count
        return database.ref(`pitchcounts/${id}`).remove().then(() => {
            console.log('Removing pitch count');
            dispatch(removePitchCount({ id }));
        });
    };
};
  
// EDIT_PITCHCOUNT
export const editPitchCount = (id, updates) => ({
    type: 'EDIT_PITCHCOUNT',
    id,
    updates
});

export const startEditPitchCount = (id, updates) => {
    return (dispatch, getState) => { 
        const uid = getState().auth.uid;        
        // edit pitch count
        return database.ref(`pitchcounts/${id}`).update(updates).then(() => {
            console.log('Updating pitch count');
            dispatch(editPitchCount(id, updates));
        });
    };
};

// Set Pitch Count
export const setPitchCount = (pitchcount) => ({
    type: 'SET_PITCHCOUNT',
    pitchcount
});

export const startSetPitchCount = () => {
    return (dispatch, getState) => {  
        const uid = getState().auth.uid;       
        // Read pitch count
        return database.ref(`pitchcounts`).once('value').then((snapshot) => {
                console.log(snapshot.val());
                const pitchcounts = [];
                snapshot.forEach((childSnapshot) => {
                    pitchcounts.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                dispatch(setPitchCount(
                    pitchcounts 
                ));
        });
    };
};
