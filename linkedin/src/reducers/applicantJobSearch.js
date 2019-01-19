import { JOBSEARCH,USERSEARCH,USERSEARCHCONNECTION,USERSEARCHCONREQUEST,USERSEARCHCONREQUESTREC} from '../actions/types';

const initialState = {
    jobSearch: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case JOBSEARCH:
            console.log("in job search one reducer")
            return {
                ...state,
                jobSearch: action.payload
            }
        case USERSEARCH:
            console.log("in user search one reducer")
            return {
                ...state,
                userSearch: action.payload
            }
        case USERSEARCHCONNECTION:
            console.log("in user search one reducer")
            return {
                ...state,
                userSearchConnection: action.payload
            }
            case USERSEARCHCONREQUEST:
            console.log("in user search one reducer")
            return {
                ...state,
                userSearchConnectionRequest: action.payload
            }
            case USERSEARCHCONREQUESTREC:
            console.log("in user search one reducer")
            return {
                ...state,
                userSearchConnectionRequestRec: action.payload
            }
     
        default:
            return state;

    }

}
