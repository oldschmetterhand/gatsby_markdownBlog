import React, { useState } from "react"
import Tabs from "../../../../common/Tabs"
import styles from "./styles.module.scss"
import Summary from "./Summary"
import Search from "./Search"
import FactoidList from "./FactoidList"
import { VizEvent } from "../.."

interface Props {
    vizEvent: VizEvent
    handleQueryBuilding?: (query: string) => void
    handleSearch?: () => void
}

const SearchNView:React.FC<Props> = ({vizEvent = undefined, handleQueryBuilding = undefined, handleSearch = undefined}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0)

  const handleTabChange = (tabIndex: number): void => {
    setSelectedTab(tabIndex)
  }

  return (
    <div className={["container", styles.mainContainer].join(" ")}>
      <Tabs
        tabs={["Search", "Result Details", "Factoids"]}
        tellTabSelected={handleTabChange}
      ></Tabs>
      <div className={styles.mainContent}>
        {selectedTab === 0 ? <Search handleQueryBuilding={handleQueryBuilding} handleSearch={handleSearch}></Search> : null}
        {selectedTab === 1 ? <Summary vizEvent={vizEvent}></Summary> : null}
        {selectedTab === 2 ? <Summary vizEvent={vizEvent}></Summary> : null}
      </div>
    </div>
  )
}

export default SearchNView
