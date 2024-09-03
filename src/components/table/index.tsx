import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import type { Company } from "@/store/company"
import {
  addCompany,
  changeCompanyInfo,
  removeSelectedCompanies,
  selectCompanies,
} from "@/store/company"

import styles from "./styles.module.css"

const Table = () => {
  const companies = useAppSelector(selectCompanies)

  const dispatch = useAppDispatch()
  const [selectAll, setSelectAll] = useState(false)

  const handleCheckboxChange = (company: Company) => {
    dispatch(changeCompanyInfo(company))
  }

  const handleSelectAll = () => {
    companies.forEach(company =>
      dispatch(
        changeCompanyInfo({
          ...company,
          selected: !selectAll,
        }),
      ),
    )
    setSelectAll(!selectAll)
  }

  const handleAddCompany = () => {
    dispatch(
      addCompany({
        name: " ",
        address: " ",
        id: companies.length + 1,
      }),
    )
  }

  const removeCompanies = () => {
    dispatch(removeSelectedCompanies())
  }

  const updateCompanyInfo = (company: Company) => {
    dispatch(changeCompanyInfo(company))
  }

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.label}>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectAll}
              />
              <label>Выделить всё</label>
            </th>
            <th>Название компании</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: company.selected ? "lightblue" : "transparent",
              }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={Boolean(company.selected)}
                  onChange={e =>
                    handleCheckboxChange({
                      ...company,
                      selected: e.target.checked,
                    })
                  }
                  className={styles.checkbox}
                />
              </td>
              <td>
                <input
                  value={company.name}
                  onChange={e =>
                    updateCompanyInfo({ ...company, name: e.target.value })
                  }
                  style={{
                    backgroundColor: company.selected
                      ? "lightblue"
                      : "transparent",
                  }}
                />
              </td>
              <td>
                <input
                  value={company.address}
                  onChange={e =>
                    updateCompanyInfo({ ...company, address: e.target.value })
                  }
                  style={{
                    backgroundColor: company.selected
                      ? "lightblue"
                      : "transparent",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleAddCompany}>
          Добавить компанию
        </button>
        <button className={styles.button} onClick={removeCompanies}>
          Удалить выбранные компании
        </button>
      </div>
    </div>
  )
}

export default Table
