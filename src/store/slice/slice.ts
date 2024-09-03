import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { data } from "../../shared/mock/dataCompanies"

interface Company {
  name: string
  address: string
  selected?: boolean
}

interface CompanyState {
  companies: Company[]
}

const initialState: CompanyState = {
  companies: data,
}

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    getCompanies: state => {
      return state
    },
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload)
    },
    removeCompany: state => {
      state.companies = state.companies.filter(company => !company.selected)
    },
  },
})

export const { getCompanies, addCompany, removeCompany } = companySlice.actions

export default companySlice.reducer

export const selectCompanies = (state: RootState) => state.company
