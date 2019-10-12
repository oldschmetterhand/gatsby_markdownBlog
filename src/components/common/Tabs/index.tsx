import React, {useState} from "react"

interface Props {
  tellTabSelected?: Function
  tabActive?: number
}

const Tabs: React.FC<Props> = ({tellTabSelected, tabActive = 0}) => {

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

  return (
    <div className="tabs is-boxed">
      <ul>
        <li className={`${selectedTab === 0 ? 'is-active' : ''}`}>
          <a onClick={handleTabSelect} data-tabindex="0">
            <span>I. Dateingabe</span>
          </a>
        </li>
        <li className={`${selectedTab === 1 ? 'is-active' : ''}`}>
          <a onClick={handleTabSelect} data-tabindex="1">
            <span>II. Validierung</span>
          </a>
        </li>
        <li className={`${selectedTab === 2 ? 'is-active' : ''}`}>
          <a onClick={handleTabSelect} data-tabindex="2">
            <span>III. Restrukturierung</span>
          </a>
        </li>
        <li className={`${selectedTab === 3 ? 'is-active' : ''}`}>
          <a onClick={handleTabSelect} data-tabindex="3">
            <span>IV. Karte</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Tabs
