// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const hospApi = createApi({
  reducerPath: 'hospApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/'}),
  endpoints: (builder) => ({
    getAllHospitals: builder.query({
      query: () => `hospitals`,
    }),
    getadmins: builder.query({
      query: () => `admins`,
    }),
    getHospitalDetailsById: builder.query({
      query: (id) => `hospitals/${id}`,
    }),
    addHospital: builder.mutation({
      query:(newHosp)=>{
        return {
          url:`hospitals`,
          method:'POST',
          body:newHosp
        }
      }
    }),
    addBeds:builder.mutation({
      query:(details)=>{
        console.log(details);
        return {
          url:`hospitals/${details.id}`,
          method:'PUT',
          body:details
        }
      }
    }),
    updateBeds:builder.mutation({
      query:(details)=>{
        return {
          url: ``,
          method:'PUT',
          body:details
        }
      }

    })
  }),
})
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
    useGetAllHospitalsQuery,
    useAddHospitalMutation,
    useAddBedsMutation,
    useGetHospitalDetailsByIdQuery,
    useLazyGetAllHospitalsQuery,
    useLazyGetHospitalDetailsByIdQuery,
    useGetadminsQuery,
    useUpdateBedsMutation
 } = hospApi

