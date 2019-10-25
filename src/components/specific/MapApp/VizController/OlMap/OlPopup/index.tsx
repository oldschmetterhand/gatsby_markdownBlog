import React, { useRef, useEffect, useCallback, useState } from "react"
import { VizEvent } from "../../../../../../types/mapp"
import { FaWindowClose } from "react-icons/fa"
import styles from "./styles.module.scss"
import Map from "ol/Map"
import Overlay from "ol/Overlay"
import { Feature } from "ol"
import { isCluster } from "../../../../../../utils/ol"


interface Props {
  olMap: Map,
  registerPopupCall: (func: (evt: any) => void) => void,
  chosenVizEvent?: VizEvent,
  title?: string
}

const OlPopup: React.FC<Props> = ({ olMap, chosenVizEvent = undefined, title = undefined, registerPopupCall }) => {
  //state
  const [popOverlay, setPopOverlay] = useState<undefined | Overlay>(undefined)

  //Effects
  useEffect(() => {
    if (!olMap || !containerRef) return
    let overlay = generateOverlay(containerRef.current)
    overlay = applyFeaturePopup(olMap, overlay)
    setPopOverlay(overlay)
  }, [olMap])

  //Refs needed for OpenLayers
  const containerRef = useRef<undefined | HTMLDivElement>(undefined)
  const contentRef = useRef<undefined | HTMLDivElement>(undefined)

  //useCallback
  const handleClosePopup = useCallback(() => {
    if (!containerRef) return
    closePopup(popOverlay)
  }, [popOverlay])

  /**
   * Creates an Overlay Object out of given HTML-Element.
   * @param assignElem Html Element that should be used as Overlay from the open layers map object.
   * @returns The ol Overlay object with assigned HTML represantation.
   */
  const generateOverlay = (assignElem: HTMLElement): Overlay => {
    let overlay = new Overlay({
      element: assignElem, //ref assigning
      autoPan: true,
      positioning: "top-left",
      offset: [-1, -4],
      autoPanAnimation: {
        duration: 250,
      },
    })
    return overlay
  }

  /**
   * Applies given Overlay as popup for the OpenLayers Map. Opens the popup
   * when a feature was clicked and sets the position accordingly.
   * @param olMap: Map Object to which the overlay should be applied as popup.
   * @param htmlOverlay: Overlay with linked html element structure.
   * @returns given htmlOverlay that now functions as popup for the ol map.
   */
  const applyFeaturePopup = (
    olMap: Map,
    htmlOverlay: Overlay
  ): Overlay | undefined => {
    if (!olMap) {
      console.error(
        "Can only apply popups after the OL-Map was rendered! (not before)"
      )
      return undefined
    }
    olMap.addOverlay(htmlOverlay)

    /* olMap.on("click", function(evt) {
      evt.preventDefault()
      olMap.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
        if (feat) {
          htmlOverlay.setPosition(feat.getProperties().geometry.flatCoordinates)
          return feat
        }
        return false
      })
    }) */

    let clickFunction = (evt) => {
      evt.preventDefault()
      olMap.forEachFeatureAtPixel(evt.pixel, (feat: Feature, layer) => {
        if (feat && !isCluster(feat)) {
          htmlOverlay.setPosition(feat.getProperties().geometry.flatCoordinates)
          return feat
        }
        return false
      })
    }
    registerPopupCall(clickFunction)

    return htmlOverlay
  }

  /**
   * Method needs to be assigned as onclick listener to the closing button
   * of the specific popup. For example directly on an html element.
   * Better way is to create a useCallback hook.
   * @param popOverlay Overlay to be closed.
   */
  const closePopup = (popOverlay: Overlay) => {
    popOverlay.setPosition(undefined)
  }

  return (
    <>
      <div ref={containerRef} id="popup" className={styles.popupContainer}>
        <div
          onClick={handleClosePopup}
          className={["is-pulled-right", styles.closerContainer].join(" ")}
        >
          <FaWindowClose></FaWindowClose>
        </div>
        <div ref={contentRef} id="popup-content">
          <h3>{ chosenVizEvent ? chosenVizEvent.title : "" }</h3>
          <p>{ chosenVizEvent ? chosenVizEvent.category : "" }</p>
          <p>
            {chosenVizEvent ? chosenVizEvent.lonLat : ''}
          </p>
        </div>
      </div>
    </>
  )
}

export default OlPopup
