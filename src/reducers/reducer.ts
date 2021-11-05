import {ActionInterface, RoomReducer} from "./types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state:RoomReducer, action:ActionInterface) => {
    switch (action.type) {
        case 'JOINED':
            return {
                ...state,
                joined: true,
                userName:action.payload.userName,
                roomId:action.payload.roomId,
                userId:action.payload.userId
            }

        case 'SET_USERS':
            return {
                ...state,
                users:action.payload
            }

        case 'NEW_MESSAGE':
            return {
                ...state,
                messages:[...state.messages,action.payload]
            }
        default:
            return  state;
    }
}