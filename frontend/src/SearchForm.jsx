// SearchForm.jsx
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
  mapStyle,
  setMapStyle,
  mapStyles
}) => {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      zIndex: 1000,
      maxWidth: '420px',
      maxHeight: '85vh',
      overflow: 'auto'
    }}>
      <div style={{
        padding: '20px',
        borderBottom: showSearchForm ? '2px solid #ecf0f1' : 'none'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1a1a2e',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>🔍</span> Recherche Multi-critères
          </h2>
          <button
            onClick={() => setShowSearchForm(!showSearchForm)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#ecf0f1',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#1a1a2e'
            }}
          >
            {showSearchForm ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {showSearchForm && (
        <div style={{ padding: '20px' }}>
          {/* Info badge */}
          <div style={{
            backgroundColor: '#e8f5e9',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '12px',
            color: '#2e7d32',
            border: '1px solid #81c784'
          }}>
            💡 <strong>Combinez vos critères :</strong> Activez un ou plusieurs filtres pour affiner votre recherche
          </div>

          {/* Critère 1: Localisation */}
          <div style={{
            marginBottom: '15px',
            border: enabledCriteria.localisation ? '2px solid #16c79a' : '2px solid #e0e0e0',
            borderRadius: '10px',
            padding: '15px',
            backgroundColor: enabledCriteria.localisation ? '#f0fdf4' : '#f8f9fa',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: enabledCriteria.localisation ? '12px' : '0'
            }}>
              <label style={{
                fontWeight: 'bold',
                color: '#1a1a2e',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }} onClick={() => toggleCriteria('localisation')}>
                <span style={{ fontSize: '20px' }}>📍</span>
                <span>Par Localisation</span>
              </label>
              <input
                type="checkbox"
                checked={enabledCriteria.localisation}
                onChange={() => toggleCriteria('localisation')}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  accentColor: '#16c79a'
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
                    width: '100%',
                    padding: '12px',
                    fontSize: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <p style={{
                  margin: '8px 0 0 0',
                  fontSize: '11px',
                  color: '#7f8c8d'
                }}>
                  💡 Ou utilisez la géolocalisation sur la carte
                </p>
              </div>
            )}
          </div>

          {/* Critère 2: Médicament */}
          <div style={{
            marginBottom: '15px',
            border: enabledCriteria.medicament ? '2px solid #16c79a' : '2px solid #e0e0e0',
            borderRadius: '10px',
            padding: '15px',
            backgroundColor: enabledCriteria.medicament ? '#f0fdf4' : '#f8f9fa',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: enabledCriteria.medicament ? '12px' : '0'
            }}>
              <label style={{
                fontWeight: 'bold',
                color: '#1a1a2e',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }} onClick={() => toggleCriteria('medicament')}>
                <span style={{ fontSize: '20px' }}>💊</span>
                <span>Par Médicament</span>
              </label>
              <input
                type="checkbox"
                checked={enabledCriteria.medicament}
                onChange={() => toggleCriteria('medicament')}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  accentColor: '#16c79a'
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
                    width: '100%',
                    padding: '12px',
                    fontSize: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <div style={{
                  marginTop: '10px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  <span style={{ fontSize: '11px', color: '#7f8c8d', width: '100%' }}>
                    Suggestions :
                  </span>
                  {['Paracétamol', 'Doliprane', 'Aspirine', 'Ibuprofène'].map((med) => (
                    <button
                      key={med}
                      onClick={() => setSearchMedicine(med)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: searchMedicine === med ? '#16c79a' : 'white',
                        color: searchMedicine === med ? 'white' : '#16c79a',
                        border: '1px solid #16c79a',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: '500'
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
          <div style={{
            marginBottom: '20px',
            border: enabledCriteria.distance ? '2px solid #16c79a' : '2px solid #e0e0e0',
            borderRadius: '10px',
            padding: '15px',
            backgroundColor: enabledCriteria.distance ? '#f0fdf4' : '#f8f9fa',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: enabledCriteria.distance ? '12px' : '0'
            }}>
              <label style={{
                fontWeight: 'bold',
                color: '#1a1a2e',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }} onClick={() => toggleCriteria('distance')}>
                <span style={{ fontSize: '20px' }}>📏</span>
                <span>Par Distance</span>
              </label>
              <input
                type="checkbox"
                checked={enabledCriteria.distance}
                onChange={() => toggleCriteria('distance')}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  accentColor: '#16c79a'
                }}
              />
            </div>
            {enabledCriteria.distance && (
              <div>
                <div style={{
                  fontSize: '13px',
                  color: '#1a1a2e',
                  marginBottom: '8px'
                }}>
                  Rayon maximum : <strong style={{ color: '#16c79a' }}>{searchDistance} km</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={searchDistance}
                  onChange={(e) => setSearchDistance(e.target.value)}
                  style={{
                    width: '100%',
                    cursor: 'pointer',
                    accentColor: '#16c79a'
                  }}
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  color: '#7f8c8d',
                  marginTop: '5px'
                }}>
                  <span>1 km</span>
                  <span>10 km</span>
                  <span>20 km</span>
                </div>
              </div>
            )}
          </div>

          {/* Résumé des critères actifs */}
          {(enabledCriteria.localisation || enabledCriteria.medicament || enabledCriteria.distance) && (
            <div style={{
              backgroundColor: '#fff3cd',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '15px',
              border: '1px solid #ffc107'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#856404' }}>
                🎯 Critères actifs :
              </div>
              <div style={{ fontSize: '11px', color: '#856404' }}>
                {enabledCriteria.localisation && <div>✓ Recherche par localisation</div>}
                {enabledCriteria.medicament && <div>✓ Filtrage par médicament</div>}
                {enabledCriteria.distance && <div>✓ Limite de distance ({searchDistance} km)</div>}
              </div>
            </div>
          )}

          {/* Boutons */}
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            <button
              onClick={() => {
                setSearchLocation('');
                setSearchMedicine('');
                setSearchDistance('5');
                setEnabledCriteria({
                  localisation: true,
                  medicament: false,
                  distance: false
                });
              }}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#ecf0f1',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#1a1a2e'
              }}
            >
              🔄 Reset
            </button>
            <button
              onClick={handleSearch}
              style={{
                flex: 2,
                padding: '12px',
                backgroundColor: '#16c79a',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold',
                color: 'white',
                boxShadow: '0 4px 12px rgba(22, 199, 154, 0.3)'
              }}
            >
              🔍 Rechercher
            </button>
          </div>

          {/* Style selector */}
          <div style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#1a1a2e',
              fontSize: '12px'
            }}>
              🗺️ Style de carte
            </label>
            <select
              value={mapStyle}
              onChange={(e) => setMapStyle(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '13px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              {Object.entries(mapStyles).map(([key, style]) => (
                <option key={key} value={key}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;