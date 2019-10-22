import React, { useRef, useEffect, useCallback, useState } from "react"
import Map from "ol/Map"
import Overlay from "ol/Overlay"
import { FaWindowClose } from "react-icons/fa"

interface Props {
  olMap: Map
  title?: string
}

const OlPopup: React.FC<Props> = ({
  olMap,
  title = undefined,
}) => {
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
    olMap.on("click", function(evt) {
      evt.preventDefault()
      olMap.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
        if (feat) {
          htmlOverlay.setPosition(feat.getProperties().geometry.flatCoordinates)
          return feat
        }
        return false
      })
    })
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
      <div
        ref={containerRef}
        id="popup"
        className="ol-popup"
        style={{
          color: "black",
          borderLeft: "3px solid black",
          fontSize: ".75em",
          transition: "all 1s ease-in",
          minWidth: "200px",
          maxWidth: "250px",
          background: "whitesmoke",
          borderRadius: ".5em",
          padding: "1em",
          boxShadow: "1px 1px 5px 1px grey",
        }}
      >
        <div
          onClick={handleClosePopup}
          style={{ color: "lightgrey", fontSize: "1.25em" }}
          className="is-pulled-right"
        >
          <FaWindowClose></FaWindowClose>
        </div>
        <div ref={contentRef} id="popup-content">
          <p>Grabmahl für XYZ</p>
          <p>Gruppe: Deserteure</p>
          <p>
            Text: Some Sample content is the best content I could possibly
            imagine. My life is grey. Hello World.
          </p>
        </div>
      </div>
    </>
  )
}

export default OlPopup
