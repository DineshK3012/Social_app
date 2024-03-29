import { createReducer } from "@reduxjs/toolkit";

const initialState = {
}

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase('LoginRequest', (state) => {
        state.loading = true;
    })
        .addCase('LoginSuccess', (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase('LoginFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase('RegisterRequest', (state) => {
            state.loading = true;
        })
        .addCase('RegisterSuccess', (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase('RegisterFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase('LoadUserRequest', (state) => {
            state.loading = true;
        })
        .addCase('LoadUserSuccess', (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase('LoadUserFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase('updateProfileRequest', (state) => {
            state.loading = true;
        })
        .addCase('updateProfileSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('updateProfileFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('deleteProfileRequest', (state) => {
            state.loading = true;
        })
        .addCase('deleteProfileSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase('deleteProfileFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('updatePasswordRequest', (state) => {
            state.loading = true;
        })
        .addCase('updatePasswordSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('updatePasswordFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('forgotPasswordRequest', (state) => {
            state.loading = true;
        })
        .addCase('forgotPasswordSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('forgotPasswordFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('resetPasswordRequest', (state) => {
            state.loading = true;
        })
        .addCase('resetPasswordSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('resetPasswordFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('LogoutUserRequest', (state) => {
            state.loading = true;
        })
        .addCase('LogoutUserSuccess', (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase('LogoutUserFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        })
        .addCase('clearMessage', (state) => {
            state.message = null;
        })
});

export const postOfFollowingReducer = createReducer(initialState, (builder) => {
    builder.addCase("postOfFollowingRequest", (state) => {
        state.loading = true;
    })
        .addCase("postOfFollowingSuccess", (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        })
        .addCase("postOfFollowingFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;

        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        })
})

export const allUsersReducer = createReducer(initialState, (builder) => {
    builder.addCase("allUsersRequest", (state) => {
        state.loading = true;
    })
        .addCase("allUsersSuccess", (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase('allUsersFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        })
})

export const userProfileReducer = createReducer(initialState, (builder) => {
    builder.addCase("userProfileRequest", (state) => {
        state.loading = true;
    })
        .addCase("userProfileSuccess", (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase('userProfileFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("followUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("followUserSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('followUserFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        })
        .addCase('clearMessage', (state) => {
            state.message = null;
        })
})