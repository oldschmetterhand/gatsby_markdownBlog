import React, { useState } from "react"
import Tabs from "../../../../common/Tabs"
import styles from "./styles.module.scss"
import Summary from "./Summary"
import Search from "./Search"
import FactoidList from "../FactoidList"
import { VizEvent } from "../../../../../types/mapp"

interface Props {
    vizEvents: VizEvent[]
    selVizEvent: VizEvent
    handleQueryBuilding?: (query: string) => void
    handleSearch?: () => void,
    handleVizSelection?: (vizEvent: VizEvent) => void
}

const SearchNView:React.FC<Props> = ({selVizEvent = undefined, handleQueryBuilding = undefined, handleSearch = undefined, vizEvents = undefined, handleVizSelection = undefined}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0)

  const handleTabChange = (tabIndex: number): void => {
    setSelectedTab(tabIndex)
  }

  return (
    <div className={["container", styles.mainContainer].join(" ")}>
      <Tabs
        tabs={["Search", "Result Details", "Factoids", "Help"]}
        tellTabSelected={handleTabChange}
      ></Tabs>
      <div className={styles.mainContent}>
        {selectedTab === 0 ? <Search handleQueryBuilding={handleQueryBuilding} handleSearch={handleSearch}></Search> : null}
        {selectedTab === 1 ? <Summary vizEvent={selVizEvent}></Summary> : null}
        {selectedTab === 2 ? <FactoidList selected={selVizEvent} handleVizSelection={handleVizSelection} vizEvents={vizEvents}></FactoidList> : null}
      </div>
    </div>
  )
}

export default SearchNView
