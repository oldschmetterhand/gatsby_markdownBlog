import React, { useState } from "react"
import Tabs from "../../../../common/Tabs"
import styles from "./styles.module.scss"
import Summary from "./Summary"
import Search from "./Search"
import { VizEvent } from "../.."

interface Props {
    vizEvent: VizEvent
}

const SearchNView:React.FC<Props> = ({vizEvent = undefined}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0)

  const handleTabChange = (tabIndex: number): void => {
    setSelectedTab(tabIndex)
  }

  return (
    <div className={["container", styles.mainContainer].join(" ")}>
      <Tabs
        tabs={["Search", "Result Details"]}
        tellTabSelected={handleTabChange}
      ></Tabs>
      <div className={styles.mainContent}>
        {selectedTab === 0 ? <Search></Search> : null}
        {selectedTab === 1 ? <Summary vizEvent={vizEvent}></Summary> : null}
      </div>
    </div>
  )
}

export default SearchNView
