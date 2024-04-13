import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({baseUrl:'https://chatx-gx3j.onrender.com'});
// const baseQuery = fetchBaseQuery({baseUrl:'http://localhost:3000'});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Post','comment','story','user','msg'],
  endpoints:(builder)=>({})
}) 