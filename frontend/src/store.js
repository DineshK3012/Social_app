import { configureStore } from '@reduxjs/toolkit';
import { userReducer, postOfFollowingReducer, allUsersReducer, userProfileReducer } from './Reducers/User';
import { likeReducer, myPostsReducer, userPostsReducer } from './Reducers/Post';

const store = configureStore({
    reducer: {
        // Add reducers here    
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allUsersReducer,
        like: likeReducer,
        myPosts: myPostsReducer,
        userProfile: userProfileReducer,
        userPosts: userPostsReducer
    }
})

export default store;