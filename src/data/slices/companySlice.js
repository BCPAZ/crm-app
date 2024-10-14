import { createSlice } from "@reduxjs/toolkit";
import companyService from "../services/companyService";

const companySlice = createSlice({
    name: "company",
    initialState: {
        company: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addMatcher(companyService.endpoints.getCompany.matchFulfilled, (state, action) => {
            state.company = action.payload
        })
    }
})

export default companySlice