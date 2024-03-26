import { apiSlice } from "./apiSlice";


export const userApiSlice =  apiSlice.injectEndpoints({
    endpoints: (builder)=>({

        getGroupList: builder.query({
            query: () => ({
                url: `/group`,
                credentials:"include"
              }),
              providesTags: ['user'],
        }),
    })
})

export const {useGetGroupListQuery} = userApiSlice;