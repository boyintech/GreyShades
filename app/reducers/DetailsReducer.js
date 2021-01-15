const initialState = {
    currentUserData: {},
    profileURL: '',
}

function DetailsReducer(state = initialState, action){

    console.log("Executing: ", action.type)

    switch(action.type) {
        case 'SAVE_USER_DATA':
            console.log("Saving User's Data", action.data);
            return Object.assign({}, state, {currentUserData: action.data})
        case 'SAVE_DP':
            console.log("SAVING PROFILE PICTURE", action.data);
            return Object.assign({}, state, {profileURL: action.data})

        case 'UPDATE_PROFILE':
            console.log("Updating Profile", action.data);
            return Object.assign({}, state, {currentUserData: action.data});

        default: return state;
    }

}

export default DetailsReducer;
