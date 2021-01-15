const initialState = {
    totalItems: 0,
    currentUserData: {},
    loggedIn: false,
    products: [],
    totalPrice: 0,
    temp_tp: 0,
    profileURL: '',
    shopData: {
        location: {
            _latitude: '',
            _longitude: ''
        }
    },
    userLocation: {},
    shopLocation: {

    },
    TotalDistance: 0,
}

function playerReducer(state = initialState, action){

    console.log("Executing: ", action.type)

    switch(action.type) {
        case 'LOGIN':
            console.log("IN LOGIN", action.data);
            return Object.assign({}, state, {currentUserData: action.data, loggedIn: true})

        case 'SHOP_DATA':
        console.log("IN SHOPDATA", action.data);
        return Object.assign({}, state, {shopData: action.data})

        case 'ADD_TO_CART':
            var temp = state.products.concat(action.data);
            var tempPrice = state.totalPrice + action.data.price;
            return Object.assign({}, state, {totalItems: state.totalItems+1, products: temp, totalPrice: tempPrice, temp_tp: tempPrice})

        case 'REMOVE_FROM_CART':
            console.log("IN PAUSE");
            return Object.assign({}, state, {totalItems: 0, products: [], totalPrice: 0})

        case 'SAVE_LOCATION':
            return Object.assign({}, state, {userLocation: action.data})

        case 'SAVE_DISTANCE':
            return Object.assign({}, state, {TotalDistance: action.data})

        case 'SAVE_DP':
            return Object.assign({}, state, {profileURL: action.data})

        case 'CLEAR':
            return Object.assign({}, state, {totalItems: 0,
                currentUserData: {},
                loggedIn: false,
                products: [],
                totalPrice: 0,
                temp_tp: 0,
                profileURL: '',
                shopData: {
                    location: {
                        _latitude: '',
                        _longitude: ''
                    }
                },
                userLocation: {},
                shopLocation: {
            
                },
                TotalDistance: 0,})

        default: return state;
    }

}

export default playerReducer;
