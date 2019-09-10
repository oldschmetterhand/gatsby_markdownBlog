import React, { useEffect, useState } from "react"

interface Props {}

const Leaflet: React.FC = () => {

  useEffect(() => {
    console.info(`%c Run useEffect on didMount.`)
    try {
      let sample = window.L.map;
      let map = window.L.map("map").setView([51.505, -0.09], 13);
      initMap(map);
      console.info(`%c Leaflet map succesfully initialized`, 'color:green')
    } catch {
      console.debug(`There was an error`);

    }
  }, [(window as any).L])

  const initMap = (map) => {
    console.info("Running initMap()")
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    window.L.marker([51.5, -0.09])
      .addTo(map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup()
  }

  return <div id="map" style={{ height: "360px" }}></div>
}

export default Leaflet
