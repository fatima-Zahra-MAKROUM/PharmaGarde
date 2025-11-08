import React from 'react';

const SearchForm = ({
  enabledCriteria,
  setEnabledCriteria,
  searchLocation,
  setSearchLocation,
  searchMedicine,
  setSearchMedicine,
  searchDistance,
  setSearchDistance,
  showSearchForm,
  setShowSearchForm,
  toggleCriteria,
  handleSearch,
  pharmacyType,
  setPharmacyType,
  geolocateRef,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(15, 94, 114, 0.15)",
        zIndex: 1000,
        maxWidth: "420px",
        maxHeight: "85vh",
        overflow: "auto",
      }}
    >
      <div
        style={{
          padding: "20px",
          borderBottom: showSearchForm ? "2px solid #E8ECEF" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "bold",
              color: "#0F5E72",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>🔍</span> Recherche Multi-critères
          </h2>
          <button
            onClick={() => setShowSearchForm(!showSearchForm)}
            style={{
              padding: "6px 12px",
              backgroundColor: "#F0FFFE",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#0F5E72",
            }}
          >
            {showSearchForm ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {showSearchForm && (
        <div style={{ padding: "20px" }}>
          <div
            style={{
              backgroundColor: "#E8F6F4",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "12px",
              color: "#0F5E72",
              border: "1px solid #B8E3DD",
            }}
          >
            💡 <strong>Combinez vos critères :</strong> Activez un ou plusieurs filtres pour affiner votre recherche
          </div>

          {/* Critère 1: Localisation */}
          <div
            style={{
              marginBottom: "15px",
              border: enabledCriteria.localisation ? "2px solid #15B4A8" : "2px solid #E8ECEF",
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: enabledCriteria.localisation ? "#F0FFFE" : "#F8FAFB",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: enabledCriteria.localisation ? "12px" : "0",
              }}
            >
              <label
                style={{
                  fontWeight: "bold",
                  color: "#0F5E72",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
                onClick={() => toggleCriteria("localisation")}
              >
                <span style={{ fontSize: "20px" }}>📍</span>
                <span>Par Localisation</span>
              </label>
              <input
                type="checkbox"
                checked={enabledCriteria.localisation}
                onChange={() => toggleCriteria("localisation")}
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  accentColor: "#15B4A8",
                }}
              />
            </div>
            {enabledCriteria.localisation && (
              <div>
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Ex: Casablanca, Bd Mohammed V"
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "14px",
                    border: "2px solid #E8ECEF",
                    borderRadius: "8px",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#2C4A5C",
                  }}
                />
                <button
                  onClick={() => {
                    geolocateRef.current.trigger()
                    setSearchLocation("Position actuelle")
                  }}
                  style={{
                    marginTop: "8px",
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#15B4A8",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "13px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#0F9B93")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#15B4A8")}
                >
                  📍 Utiliser ma position actuelle
                </button>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    fontSize: "11px",
                    color: "#7F95A3",
                  }}
                >
                  💡 Ou utilisez la géolocalisation sur la carte
                </p>
              </div>
            )}
          </div>

          {/* Critère 2: Médicament */}
          <div
            style={{
              marginBottom: "15px",
              border: enabledCriteria.medicament ? "2px solid #15B4A8" : "2px solid #E8ECEF",
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: enabledCriteria.medicament ? "#F0FFFE" : "#F8FAFB",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: enabledCriteria.medicament ? "12px" : "0",
              }}
            >
              <label
                style={{
                  fontWeight: "bold",
                  color: "#0F5E72",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
                onClick={() => toggleCriteria("medicament")}
              >
                <span style={{ fontSize: "20px" }}>💊</span>
                <span>Par Médicament</span>
              </label>
              <input
                type="checkbox"
                checked={enabledCriteria.medicament}
                onChange={() => toggleCriteria("medicament")}
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  accentColor: "#15B4A8",
                }}
              />
            </div>
            {enabledCriteria.medicament && (
              <div>
                <input
                  type="text"
                  value={searchMedicine}
                  onChange={(e) => setSearchMedicine(e.target.value)}
                  placeholder="Ex: Paracétamol, Doliprane..."
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "14px",
                    border: "2px solid #E8ECEF",
                    borderRadius: "8px",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#2C4A5C",
                  }}
                />
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#7F95A3", width: "100%" }}>Suggestions :</span>
                  {["Paracétamol", "Doliprane", "Aspirine", "Ibuprofène"].map((med) => (
                    <button
                      key={med}
                      onClick={() => setSearchMedicine(med)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: searchMedicine === med ? "#15B4A8" : "white",
                        color: searchMedicine === med ? "white" : "#15B4A8",
                        border: "1px solid #15B4A8",
                        borderRadius: "15px",
                        cursor: "pointer",
                        fontSize: "11px",
                        fontWeight: "500",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {med}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Critère 3: Distance */}
          <div
            style={{
              marginBottom: "15px",
              border: enabledCriteria.distance ? "2px solid #15B4A8" : "2px solid #E8ECEF",
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: enabledCriteria.distance ? "#F0FFFE" : "#F8FAFB",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: enabledCriteria.distance ? "12px" : "0",
              }}
            >
              <label
                style={{
                  fontWeight: "bold",
                  color: "#0F5E72",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
                onClick={() => toggleCriteria("distance")}
              >
                <span style={{ fontSize: "20px" }}>📏</span>
                <span>Par Distance</span>
              </label>
              <input
                type="checkbox"
                checked={enabledCriteria.distance}
                onChange={() => toggleCriteria("distance")}
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  accentColor: "#15B4A8",
                }}
              />
            </div>
            {enabledCriteria.distance && (
              <div>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={searchDistance}
                  onChange={(e) => setSearchDistance(e.target.value)}
                  placeholder="Entrez le rayon en km"
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "14px",
                    border: "2px solid #E8ECEF",
                    borderRadius: "8px",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#2C4A5C",
                  }}
                />
              </div>
            )}
          </div>

          {/* Critère 4: Type de pharmacie */}
          <div
            style={{
              marginBottom: "20px",
              border: enabledCriteria.type_pharmacie ? "2px solid #15B4A8" : "2px solid #E8ECEF",
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: enabledCriteria.type_pharmacie ? "#F0FFFE" : "#F8FAFB",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: enabledCriteria.type_pharmacie ? "12px" : "0",
              }}
            >
              <label
                style={{
                  fontWeight: "bold",
                  color: "#0F5E72",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
                onClick={() => toggleCriteria("type_pharmacie")}
              >
                <span style={{ fontSize: "20px" }}>🏥</span>
                <span>Par Type de Pharmacie</span>
              </label>
              <input
                type="checkbox"
                checked={enabledCriteria.type_pharmacie}
                onChange={() => toggleCriteria("type_pharmacie")}
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  accentColor: "#15B4A8",
                }}
              />
            </div>
            {enabledCriteria.type_pharmacie && (
              <select
                value={pharmacyType}
                onChange={(e) => setPharmacyType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "14px",
                  border: "2px solid #E8ECEF",
                  borderRadius: "8px",
                  outline: "none",
                  boxSizing: "border-box",
                  color: "#2C4A5C",
                }}
              >
                <option value="all">Toutes les pharmacies</option>
                <option value="guard">Seulement de garde</option>
              </select>
            )}
          </div>

          {/* Résumé des critères actifs */}
          {(enabledCriteria.localisation ||
            enabledCriteria.medicament ||
            enabledCriteria.distance ||
            enabledCriteria.type_pharmacie) && (
            <div
              style={{
                backgroundColor: "#FFF8E8",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px",
                border: "1px solid #FFE8B6",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "6px", color: "#8B6F47" }}>
                🎯 Critères actifs :
              </div>
              <div style={{ fontSize: "11px", color: "#8B6F47" }}>
                {enabledCriteria.localisation && <div>✓ Recherche par localisation</div>}
                {enabledCriteria.medicament && <div>✓ Filtrage par médicament</div>}
                {enabledCriteria.distance && <div>✓ Limite de distance ({searchDistance} km)</div>}
                {enabledCriteria.type_pharmacie && (
                  <div>✓ Type de pharmacie : {pharmacyType === "all" ? "Toutes" : "De garde seulement"}</div>
                )}
              </div>
            </div>
          )}

          {/* Boutons */}
          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <button
              onClick={() => {
                setSearchLocation("")
                setSearchMedicine("")
                setSearchDistance("5")
                setPharmacyType("all")
                setEnabledCriteria({
                  localisation: true,
                  medicament: false,
                  distance: false,
                  type_pharmacie: false,
                })
              }}
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: "#F0FFFE",
                border: "2px solid #E8ECEF",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "bold",
                color: "#0F5E72",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => (e.target.style.borderColor = "#15B4A8")}
              onMouseOut={(e) => (e.target.style.borderColor = "#E8ECEF")}
            >
              🔄 Reset
            </button>
            <button
              onClick={handleSearch}
              style={{
                flex: 2,
                padding: "12px",
                backgroundColor: "#15B4A8",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "bold",
                color: "white",
                boxShadow: "0 4px 12px rgba(21, 180, 168, 0.25)",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0F9B93")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#15B4A8")}
            >
              🔍 Rechercher
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchForm