import React, { useEffect, useState } from "react"

interface Props {
  coordArray?: Array<number[] | undefined>
}

const Leaflet: React.FC<Props> = ({
  coordArray
}) => {

  useEffect(() => {
    try {
      let sample = window.L.map;
      let map = window.L.map("map").setView([51.505, -0.09], 13);
      initMap(map);
      //console.info(`%c Leaflet map succesfully initialized`, 'color:green')
    } catch {
      //console.debug(`window.L not defined`);

    }
  }, [coordArray])

  const initMap = (map) => {
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    //adding the markers
    coordArray.forEach((coordPair) => {
      window.L.marker(coordPair)
      .addTo(map)
      .bindPopup(`Verwendete Koordinaten: ${coordPair.toString()}`)
    })
  }

  return <div id="map" style={{ height: "360px" }}></div>
}

export default Leaflet
