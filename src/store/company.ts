import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { data } from "../shared/mock/dataCompanies"

export interface Company {
  id: number
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
    setSelected: (
      state,
      action: PayloadAction<{ id: number; selected: boolean }>,
    ) => {
      const company = state.companies.find(
        company => company.id === action.payload.id,
      )
      if (company) {
        company.selected = action.payload.selected
      }
    },
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload)
    },
    removeSelectedCompanies: state => {
      state.companies = state.companies.filter(company => !company.selected)
    },
    changeCompanyInfo: (state, action: PayloadAction<Company>) => {
      const companyIndex = state.companies.findIndex(
        company => company.id === action.payload.id,
      )

      // If company is found, update its information
      if (companyIndex !== -1) {
        state.companies[companyIndex] = {
          ...state.companies[companyIndex],
          ...action.payload,
        }
      }
    },
  },
})

export const {
  addCompany,
  removeSelectedCompanies,
  changeCompanyInfo,
  setSelected,
} = companySlice.actions

export default companySlice.reducer

export const selectCompanies = (state: RootState) => state.company.companies
