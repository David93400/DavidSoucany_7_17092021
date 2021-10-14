import { DELETE_POST, GET_POSTS, UPDATE_POST } from "../actions/post.actions";

const initialState = {};

export default function userReducer (state = initialState, action){
    switch(action.type){
        case GET_POSTS:
            return action.payload;
            default:
                return state;
        case UPDATE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        content : action.payload.content,
                        title : action.payload.title
                    };

                } else return post;

            });
        case DELETE_POST:
            return state.filter((post)=> post.id !== action.payload.postId)

    }
}