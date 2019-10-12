import React from "react"
import BulmaInput from "../../../../../common/BulmaInput"
interface Props {
  handleQueryBuilding?: (string: string) => void
}

const Search: React.FC<Props> = ({ handleQueryBuilding = undefined }) => {
  return (
    <>
      <h2 className="is-size-6">Eine Person suchen: </h2>
      <br></br>
      <BulmaInput getInpVal={handleQueryBuilding} placeHolder="Personen-ID"></BulmaInput>
      <br></br>
      <hr></hr>
      <button className="button is-primary">Search</button>
    </>
  )
}

export default Search
