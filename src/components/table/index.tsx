import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store/store"
import { addCompany, removeCompany } from "../../store/slice/slice"

import styles from "./styles.module.css"

const Table = () => {
  const companies = useSelector((state: RootState) => state.company.companies)
  console.log(companies)
  const dispatch = useDispatch()
  const [selectAll, setSelectAll] = useState(false)

  const handleCheckboxChange = (index: number) => {
    try {
      const updatedCompanies = [...companies]
      updatedCompanies[index].selected = !updatedCompanies[index].selected
      setSelectAll(updatedCompanies.every(company => company.selected))
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  const handleSelectAll = () => {
    try {
      const updatedCompanies = companies.map(company => ({
        ...company,
        selected: !selectAll,
      }))
      setSelectAll(!selectAll)
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  const handleAddCompany = () => {
    try {
      dispatch(addCompany({ name: "New Company", address: "New Address" }))
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  const handleRemoveSelectedCompanies = () => {
    try {
      dispatch(removeCompany())
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectAll}
              />
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
                  checked={company.selected}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>
                <input
                  value={company.name}
                  onChange={e => console.log("Edit Name")}
                />
              </td>
              <td>
                <input
                  value={company.address}
                  onChange={e => console.log("Edit Address")}
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
        <button
          className={styles.button}
          onClick={handleRemoveSelectedCompanies}
        >
          Удалить выбранные компании
        </button>
      </div>
    </div>
  )
}

export default Table
