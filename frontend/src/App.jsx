import { useState, useRef } from "react"
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import SearchForm from "./SearchForm"

const MAPBOX_TOKEN = "pk.eyJ1IjoiaGluZGluYSIsImEiOiJjbWhxNTd1NXEwZDRyMmxxemU0OHhzNGk2In0.XHlACAI8QmlaBfFD5HH3CA"

// 🔹 Composant mis à jour avec des boutons au lieu d'un select, et positionné en haut à droite pour une meilleure ergonomie (inspiré de la version fournie)
const MapStyleSelector = ({ mapStyle, setMapStyle, mapStyles }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        backgroundColor: "white",
        padding: "12px",
        borderRadius: "12px",
        boxShadow: "0 2px 16px rgba(15, 94, 114, 0.12)",
        display: "flex",
        gap: "8px",
        zIndex: 1000,
      }}
    >
      {Object.entries(mapStyles).map(([key, style]) => (
        <button
          key={key}
          onClick={() => setMapStyle(key)}
          style={{
            padding: "8px 16px",
            backgroundColor: mapStyle === key ? "#0F5E72" : "transparent",
            color: mapStyle === key ? "white" : "#2C4A5C",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "bold",
            transition: "all 0.2s ease",
          }}
        >
          {style.name}
        </button>
      ))}
    </div>
  )
}

function App() {
  const [viewState, setViewState] = useState({
    longitude: -7.5898,
    latitude: 33.5731,
    zoom: 13,
  })

  const [mapStyle, setMapStyle] = useState("streets-v12")
  const [selectedPharmacy, setSelectedPharmacy] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const mapRef = useRef()
  const geolocateRef = useRef()

  const [enabledCriteria, setEnabledCriteria] = useState({
    localisation: true,
    medicament: false,
    distance: false,
    type_pharmacie: false,
  })

  const [searchLocation, setSearchLocation] = useState("")
  const [searchMedicine, setSearchMedicine] = useState("")
  const [searchDistance, setSearchDistance] = useState("5")
  const [showSearchForm, setShowSearchForm] = useState(true)
  const [pharmacyType, setPharmacyType] = useState("all")

  const pharmacies = [
    {
      id: 1,
      name: "Pharmacie Centrale",
      longitude: -7.5898,
      latitude: 33.5731,
      isGuard: true,
      address: "123 Bd Mohammed V, Casablanca",
      phone: "0522-123456",
      hours: "24h/24",
      stock: ["Paracétamol", "Aspirine", "Doliprane"],
      distance: "0.5 km",
    },
    {
      id: 2,
      name: "Pharmacie Al Amal",
      longitude: -7.5998,
      latitude: 33.5831,
      isGuard: false,
      address: "45 Rue des FAR, Casablanca",
      phone: "0522-234567",
      hours: "8h-20h",
      stock: ["Paracétamol", "Ibuprofène"],
      distance: "1.2 km",
    },
    {
      id: 3,
      name: "Pharmacie Anfa",
      longitude: -7.6098,
      latitude: 33.5631,
      isGuard: true,
      address: "78 Bd Anfa, Casablanca",
      phone: "0522-345678",
      hours: "24h/24",
      stock: ["Doliprane", "Amoxicilline", "Vitamine C"],
      distance: "2.1 km",
    },
    {
      id: 4,
      name: "Pharmacie Maarif",
      longitude: -7.62,
      latitude: 33.57,
      isGuard: false,
      address: "12 Rue Maarif, Casablanca",
      phone: "0522-456789",
      hours: "9h-21h",
      stock: ["Aspirine", "Vitamine C", "Sirop"],
      distance: "2.8 km",
    },
  ]

  const onlyGuard = enabledCriteria.type_pharmacie && pharmacyType === "guard"
  const filteredPharmacies = pharmacies.filter((pharmacy) => !onlyGuard || pharmacy.isGuard)

  const mapStyles = {
    "streets-v12": { name: "🗺️ Streets", value: "mapbox://styles/mapbox/streets-v12" },
    "light-v11": { name: "☀️ Light", value: "mapbox://styles/mapbox/light-v11" },
    "dark-v11": { name: "🌙 Dark", value: "mapbox://styles/mapbox/dark-v11" },
    "satellite-streets-v12": { name: "🛰️ Satellite", value: "mapbox://styles/mapbox/satellite-streets-v12" },
  }

  const handleGeolocate = (e) => {
    const lng = e.coords.longitude
    const lat = e.coords.latitude
    setUserLocation({ longitude: lng, latitude: lat })
    setViewState({ ...viewState, longitude: lng, latitude: lat })
  }

  const toggleCriteria = (criteria) => {
    setEnabledCriteria((prev) => ({ ...prev, [criteria]: !prev[criteria] }))
  }

  const handleSearch = () => {
    const activeCriteria = {
      localisation: enabledCriteria.localisation ? searchLocation : null,
      medicament: enabledCriteria.medicament ? searchMedicine : null,
      distance: enabledCriteria.distance ? searchDistance : null,
      type_pharmacie: enabledCriteria.type_pharmacie ? pharmacyType : null,
    }
    console.log("Recherche avec critères actifs:", activeCriteria)
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F8FAFB",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#0F5E72",
          color: "white",
          padding: "20px 30px",
          boxShadow: "0 2px 12px rgba(15, 94, 114, 0.15)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "bold" }}>💊 PharmaGarde</h1>
        <p style={{ margin: "5px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
          Trouvez les pharmacies de garde près de vous
        </p>
      </header>

      {/* Carte */}
      <div style={{ flex: 1, position: "relative" }}>
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle={mapStyles[mapStyle].value}
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ width: "100%", height: "100%" }}
          ref={mapRef}
        >
          <NavigationControl position="bottom-right" />
          <GeolocateControl
            ref={geolocateRef}
            position="bottom-right"
            trackUserLocation
            onGeolocate={handleGeolocate}
            showUserHeading
          />

          {userLocation && (
            <Marker longitude={userLocation.longitude} latitude={userLocation.latitude} anchor="bottom">
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "#15B4A8",
                  border: "3px solid white",
                  boxShadow: "0 2px 8px rgba(21, 180, 168, 0.3)",
                }}
              />
            </Marker>
          )}

          {filteredPharmacies.map((pharmacy) => (
            <Marker
              key={pharmacy.id}
              longitude={pharmacy.longitude}
              latitude={pharmacy.latitude}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation()
                setSelectedPharmacy(pharmacy)
              }}
            >
              <div
                style={{
                  fontSize: "40px",
                  cursor: "pointer",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  transform: selectedPharmacy?.id === pharmacy.id ? "scale(1.2)" : "scale(1)",
                }}
              >
                {pharmacy.isGuard ? "🔴" : "🟢"}
              </div>
            </Marker>
          ))}

          {selectedPharmacy && (
            <Popup
              longitude={selectedPharmacy.longitude}
              latitude={selectedPharmacy.latitude}
              anchor="bottom"
              onClose={() => setSelectedPharmacy(null)}
              closeButton={true}
              closeOnClick={false}
              maxWidth="350px"
            >
              <div style={{ padding: "10px", minWidth: "280px" }}>
                <h3
                  style={{
                    margin: "0 0 12px 0",
                    color: selectedPharmacy.isGuard ? "#E85D5D" : "#0F5E72",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {selectedPharmacy.name}
                </h3>
                {selectedPharmacy.isGuard && (
                  <div
                    style={{
                      backgroundColor: "#E85D5D",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      display: "inline-block",
                      marginBottom: "12px",
                    }}
                  >
                    🚨 PHARMACIE DE GARDE
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    fontSize: "14px",
                    marginBottom: "12px",
                    color: "#2C4A5C",
                  }}
                >
                  <div>📍 {selectedPharmacy.address}</div>
                  <div>📞 {selectedPharmacy.phone}</div>
                  <div>🕒 {selectedPharmacy.hours}</div>
                  <div>
                    📏 <strong style={{ color: "#15B4A8" }}>{selectedPharmacy.distance}</strong>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#F0FFFE",
                    padding: "10px",
                    borderRadius: "6px",
                    marginBottom: "12px",
                    borderLeft: "4px solid #15B4A8",
                  }}
                >
                  <strong style={{ fontSize: "13px", color: "#0F5E72" }}>💊 Médicaments :</strong>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
                    {selectedPharmacy.stock.map((med, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: "#15B4A8",
                          color: "white",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${selectedPharmacy.latitude},${selectedPharmacy.longitude}`,
                      "_blank",
                    )
                  }}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#15B4A8",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#0F9B93")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#15B4A8")}
                >
                  🧭 Obtenir l'itinéraire
                </button>
              </div>
            </Popup>
          )}
        </Map>

        {/* Formulaire de recherche */}
        <SearchForm
          enabledCriteria={enabledCriteria}
          setEnabledCriteria={setEnabledCriteria}
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          searchMedicine={searchMedicine}
          setSearchMedicine={setSearchMedicine}
          searchDistance={searchDistance}
          setSearchDistance={setSearchDistance}
          showSearchForm={showSearchForm}
          setShowSearchForm={setShowSearchForm}
          toggleCriteria={toggleCriteria}
          handleSearch={handleSearch}
          pharmacyType={pharmacyType}
          setPharmacyType={setPharmacyType}
          geolocateRef={geolocateRef}
        />

        {/* Sélecteur de style de carte mis à jour */}
        <MapStyleSelector mapStyle={mapStyle} setMapStyle={setMapStyle} mapStyles={mapStyles} />

        {/* Statistiques */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 2px 16px rgba(15, 94, 114, 0.12)",
            zIndex: 1000,
            borderTop: "4px solid #15B4A8",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", fontWeight: "bold", color: "#0F5E72" }}>📊 Stats</h4>
          <div style={{ display: "flex", gap: "15px", fontSize: "13px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#0F5E72" }}>{filteredPharmacies.length}</div>
              <div style={{ fontSize: "11px", color: "#7F95A3" }}>Total</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#E85D5D" }}>
                {filteredPharmacies.filter((p) => p.isGuard).length}
              </div>
              <div style={{ fontSize: "11px", color: "#7F95A3" }}>Garde</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#15B4A8" }}>
                {filteredPharmacies.filter((p) => !p.isGuard).length}
              </div>
              <div style={{ fontSize: "11px", color: "#7F95A3" }}>Ouvertes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App