
import React from "react"
import BulmaInput from "../../../../../common/BulmaInput"
interface Props {
    handleQueryBuilding?: (string: string) => void
}

const Search:React.FC<Props> = ({handleQueryBuilding = undefined}) => {
    return <BulmaInput getInpVal={handleQueryBuilding}></BulmaInput>
}

export default Search;