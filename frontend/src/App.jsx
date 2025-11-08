import { useState, useRef } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Votre token Mapbox
const MAPBOX_TOKEN = 'pk.eyJ1IjoiaGluZGluYSIsImEiOiJjbWhxNTd1NXEwZDRyMmxxemU0OHhzNGk2In0.XHlACAI8QmlaBfFD5HH3CA';

function App() {
  const [viewState, setViewState] = useState({
    longitude: -7.5898,
    latitude: 33.5731,
    zoom: 13
  });
  
  const [mapStyle, setMapStyle] = useState('streets-v12');
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef();

  // Données des pharmacies
  const pharmacies = [
    {
      id: 1,
      name: 'Pharmacie Centrale',
      longitude: -7.5898,
      latitude: 33.5731,
      isGuard: true,
      address: '123 Bd Mohammed V, Casablanca',
      phone: '0522-123456',
      hours: '24h/24',
      stock: ['Paracétamol', 'Aspirine', 'Doliprane'],
      distance: '0.5 km'
    },
    {
      id: 2,
      name: 'Pharmacie Al Amal',
      longitude: -7.5998,
      latitude: 33.5831,
      isGuard: false,
      address: '45 Rue des FAR, Casablanca',
      phone: '0522-234567',
      hours: '8h-20h',
      stock: ['Paracétamol', 'Ibuprofène'],
      distance: '1.2 km'
    },
    {
      id: 3,
      name: 'Pharmacie Anfa',
      longitude: -7.6098,
      latitude: 33.5631,
      isGuard: true,
      address: '78 Bd Anfa, Casablanca',
      phone: '0522-345678',
      hours: '24h/24',
      stock: ['Doliprane', 'Amoxicilline', 'Vitamine C'],
      distance: '2.1 km'
    },
    {
      id: 4,
      name: 'Pharmacie Maarif',
      longitude: -7.6200,
      latitude: 33.5700,
      isGuard: false,
      address: '12 Rue Maarif, Casablanca',
      phone: '0522-456789',
      hours: '9h-21h',
      stock: ['Aspirine', 'Vitamine C', 'Sirop'],
      distance: '2.8 km'
    }
  ];

  // Styles de carte
  const mapStyles = {
    'streets-v12': { 
      name: '🗺️ Streets', 
      value: 'mapbox://styles/mapbox/streets-v12' 
    },
    'light-v11': { 
      name: '☀️ Light', 
      value: 'mapbox://styles/mapbox/light-v11' 
    },
    'dark-v11': { 
      name: '🌙 Dark', 
      value: 'mapbox://styles/mapbox/dark-v11' 
    },
    'satellite-streets-v12': { 
      name: '🛰️ Satellite', 
      value: 'mapbox://styles/mapbox/satellite-streets-v12' 
    }
  };

  const handleGeolocate = (e) => {
    setUserLocation({
      longitude: e.coords.longitude,
      latitude: e.coords.latitude
    });
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f5f7fa'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#1a1a2e',
        color: 'white',
        padding: '20px 30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
          💊 PharmaGarde
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
          Trouvez les pharmacies de garde près de vous
        </p>
      </header>

      {/* Sélecteur de style */}
      <div style={{
        padding: '15px 20px',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <span style={{ fontWeight: 'bold', color: '#1a1a2e' }}>
          Style de carte :
        </span>
        {Object.entries(mapStyles).map(([key, style]) => (
          <button
            key={key}
            onClick={() => setMapStyle(key)}
            style={{
              padding: '10px 18px',
              backgroundColor: mapStyle === key ? '#16c79a' : '#ecf0f1',
              color: mapStyle === key ? 'white' : '#1a1a2e',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: mapStyle === key ? 'bold' : 'normal',
              whiteSpace: 'nowrap'
            }}
          >
            {style.name}
          </button>
        ))}
      </div>

      {/* Carte */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle={mapStyles[mapStyle].value}
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ width: '100%', height: '100%' }}
          ref={mapRef}
        >
          <NavigationControl position="top-right" />
          <GeolocateControl
            position="top-right"
            trackUserLocation
            onGeolocate={handleGeolocate}
            showUserHeading
          />

          {userLocation && (
            <Marker
              longitude={userLocation.longitude}
              latitude={userLocation.latitude}
              anchor="bottom"
            >
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#3498db',
                border: '3px solid white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }} />
            </Marker>
          )}

          {pharmacies.map(pharmacy => (
            <Marker
              key={pharmacy.id}
              longitude={pharmacy.longitude}
              latitude={pharmacy.latitude}
              anchor="bottom"
              onClick={e => {
                e.originalEvent.stopPropagation();
                setSelectedPharmacy(pharmacy);
              }}
            >
              <div style={{
                fontSize: '40px',
                cursor: 'pointer',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                transform: selectedPharmacy?.id === pharmacy.id ? 'scale(1.2)' : 'scale(1)'
              }}>
                {pharmacy.isGuard ? '🔴' : '🟢'}
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
              <div style={{ padding: '10px', minWidth: '280px' }}>
                <h3 style={{ 
                  margin: '0 0 12px 0', 
                  color: selectedPharmacy.isGuard ? '#e74c3c' : '#1a1a2e',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  {selectedPharmacy.name}
                </h3>
                
                {selectedPharmacy.isGuard && (
                  <div style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    display: 'inline-block',
                    marginBottom: '12px'
                  }}>
                    🚨 PHARMACIE DE GARDE
                  </div>
                )}

                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '8px',
                  fontSize: '14px',
                  marginBottom: '12px'
                }}>
                  <div><span>📍</span> {selectedPharmacy.address}</div>
                  <div><span>📞</span> {selectedPharmacy.phone}</div>
                  <div><span>🕒</span> {selectedPharmacy.hours}</div>
                  <div><span>📏</span> <strong style={{ color: '#16c79a' }}>{selectedPharmacy.distance}</strong></div>
                </div>

                <div style={{ 
                  backgroundColor: '#f8f9fa', 
                  padding: '10px', 
                  borderRadius: '6px',
                  marginBottom: '12px'
                }}>
                  <strong style={{ fontSize: '13px' }}>💊 Médicaments :</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                    {selectedPharmacy.stock.map((med, idx) => (
                      <span key={idx} style={{
                        backgroundColor: '#16c79a',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        {med}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedPharmacy.latitude},${selectedPharmacy.longitude}`, '_blank');
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  🧭 Obtenir l'itinéraire
                </button>
              </div>
            </Popup>
          )}
        </Map>

        {/* Statistiques */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold' }}>
            📊 Statistiques
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#fef5e7', borderRadius: '6px' }}>
              <span>Total</span>
              <strong>{pharmacies.length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#fadbd8', borderRadius: '6px' }}>
              <span>De garde</span>
              <strong style={{ color: '#e74c3c' }}>{pharmacies.filter(p => p.isGuard).length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#d5f4e6', borderRadius: '6px' }}>
              <span>Ouvertes</span>
              <strong style={{ color: '#16c79a' }}>{pharmacies.filter(p => !p.isGuard).length}</strong>
            </div>
          </div>
        </div>

        {/* Légende */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          backgroundColor: 'white',
          padding: '18px',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 'bold' }}>
            🗺️ Légende
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>🔴</span>
              <span>Pharmacie de garde</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>🟢</span>
              <span>Pharmacie ouverte</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#3498db',
                border: '2px solid white'
              }} />
              <span>Votre position</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;