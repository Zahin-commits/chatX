import { apiSlice } from "./apiSlice";


export const userApiSlice =  apiSlice.injectEndpoints({
    endpoints: (builder)=>({

        getUserList: builder.query({
            query: () => ({
                url: `auth/userList`,
                credentials:"include"
              }),
              providesTags: ['user'],
        }),

        getUserData: builder.query({
            query: (username) => ({
                url: `user/profile/?username=${username}`,
                credentials:"include"
              }),
              providesTags: ['user'],
        }),
        
        
        register:builder.mutation({
            query:(data)=>({
                url: `/auth/register`,
                body: data,
                method: 'POST',
                credentials:"include"  
            })
        }),
        
        login:builder.mutation({
            query:(data)=>({
                url: `/auth/login`,
                body: data,
                method: 'POST',
                credentials:"include"  
            })
        }),

        
    })
})

export const {useGetUserListQuery ,useGetUserDataQuery,
    useRegisterMutation,useLoginMutation} = userApiSlice;