import React, { useEffect, useState } from "react"

interface Props {}

const Leaflet: React.FC = () => {
  const [L, setL] = useState(undefined)
  const [map, setMap] = useState(undefined)

  useEffect(() => {
    if ((window as any).L) {
      console.log(window.L)
      setL((window as any).L)
      let map = L.map("map").setView([51.505, -0.09], 13);
      setMap(map)
      initMap()
    }
  }, [(window as any).L])

  const initMap = () => {
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    L.marker([51.5, -0.09])
      .addTo(map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup()
  }

  return <div id="map" style={{ height: "180px" }}></div>
}

export default Leaflet
