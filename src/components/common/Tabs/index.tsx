import React, {useState} from "react"

interface Props {
  tabs: string[],
  tellTabSelected?: Function
  tabActive?: number
}

const Tabs: React.FC<Props> = ({tabs, tellTabSelected, tabActive = 0}) => {

  const [selectedTab, setSelectedTab] = useState<number>(tabActive)

  const handleTabSelect = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    let target = evt.target as HTMLAnchorElement | HTMLSpanElement
    let elem = target.tagName === "SPAN" ? target.parentElement : target
    let tabIndex: string = elem.getAttribute("data-tabindex");
    let tabIndexParsed: number = parseInt(tabIndex);
    setSelectedTab(tabIndexParsed);
    try {
      if(tellTabSelected)tellTabSelected(tabIndexParsed);
    } catch {
      
    }
  }

  const renderTab = (tabName: string, index: number) => (
    <li className={`${selectedTab === index ? 'is-active' : ''}`}>
      <a onClick={handleTabSelect} data-tabindex={index}>
      <span>{tabName}</span>
      </a>
    </li>
  )

  return (
    <div className="tabs is-boxed">
      <ul>
        {tabs.map((tabName, index) => renderTab(tabName, index))}
      </ul>
    </div>
  )
}

export default Tabs
