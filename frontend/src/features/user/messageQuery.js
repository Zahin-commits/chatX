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
        
        getAllMsg:builder.mutation({
            query:(data)=>({
                url: `/message/get`,
                body: data,
                method: 'POST',
                credentials:"include"  
            })
        }),
        
        addDmMsg:builder.mutation({
            query:(data)=>({
                url: `/message/add`,
                body: data,
                method: 'POST',
                credentials:"include"  
            })
        }),
        
    })
})

export const {useGetUserListQuery ,useGetAllMsgMutation,useAddDmMsgMutation} = userApiSlice;