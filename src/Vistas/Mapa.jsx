  // Mapa.js
    import React, { useState, useEffect } from 'react';
    import { Map, GoogleApiWrapper, Marker, Polygon } from 'google-maps-react';
    import SideBarMapa from '../Componentes/SideBarMapa';
    import FiltroDatosMapa from '../Componentes/FiltroDatosMapa';
    import CapasDatos from '../Componentes/CapasDatos';
    import ModalDetallesRobos from '../Componentes/ModalDetallesRobos'
    import axios from 'axios'; // Importa axios para realizar solicitudes HTTP




    const Mapa = (props) => {
      const [activeLayer, setActiveLayer] = useState(null);
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [isLayerModalVisible, setIsLayerModalVisible] = useState(false);

      const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
      const [isCapasModalVisible, setIsCapasModalVisible] = useState(false);

      const [isSidebarOpen, setIsSidebarOpen1] = useState(false);

      const [showRobberyPolygon, setShowRobberyPolygon] = useState(false);
      const [selectedRobberyDetails, setSelectedRobberyDetails] = useState(null);
      const [showDetailsModal, setShowDetailsModal] = useState(false);
      const [robberyData, setRobberyData] = useState([]); // Estado para almacenar los datos de robos
      const [showAllCrimes, setShowAllCrimes] = useState(false);
      const [allCrimesData, setAllCrimesData] = useState([]);
      

      const [selectedDenunciaDetails, setSelectedDenunciaDetails] = useState(null);

      // Estado para controlar la visibilidad del modal de detalles de denuncia
      const [isDenunciaModalVisible, setIsDenunciaModalVisible] = useState(false);
    
    const style = {
      width: '100%',
      height: '100%'
    };


  
      // Función para obtener los datos de denuncias por robos desde el backend
      const fetchDenunciasData = async () => {
        try {
          const response = await axios.get('http://localhost:3002/api/denuncias');
          const filteredData = response.data.filter(d => d.ubicacionActual && typeof d.ubicacionActual.latitude === 'number' && typeof d.ubicacionActual.longitude === 'number');
          setAllCrimesData(filteredData.map(d => ({ lat: d.ubicacionActual.latitude, lng: d.ubicacionActual.longitude })));
        } catch (error) {
          console.error('Error al obtener datos', error);
        }
      };
      useEffect(() => {
        if (showRobberyPolygon) {
          fetchDenunciasData();
        }
      }, [showRobberyPolygon]);
    
      useEffect(() => {
        if (showAllCrimes) {
          fetchDenunciasData();
        }
      }, [showAllCrimes, selectedDenunciaDetails]);
      
      // Agrega este console.log para verificar los datos de denuncia
      console.log("Datos de denuncia:", selectedDenunciaDetails);
      
    

    const handleToggleLayer = (layerName, isVisible) => {
      if (layerName === "Todos los Delitos") {
        setShowAllCrimes(isVisible);
      }
    }



  const onPolygonClick = () => {
    // Simulamos la obtención de datos de robos
    const simulatedRobberyData = [
      { id: 1, description: "Robo en tienda de electrónicos", date: "2021-08-15" },
      { id: 2, description: "Robo de bicicleta en parque central", date: "2021-08-20" },
      // ... más datos
    ];
    setSelectedRobberyDetails(simulatedRobberyData);
    setShowDetailsModal(true);
  }

  const handleToggleRobbery = (isVisible) => {
    setShowRobberyPolygon(isVisible);
  };

  const robberyCoordinates = [
    { lat: -27.366576, lng: -70.331580 },
    { lat: -27.366576, lng: -70.341580 },
    { lat: -27.376576, lng: -70.341580 },
    { lat: -27.376576, lng: -70.331580 }
  ];
  const handleOpenFilterModal = () => {
    setIsFilterModalVisible(true);
    setIsCapasModalVisible(false);
  };

  const handleOpenCapasModal = () => {
    setIsCapasModalVisible(true);
    setIsFilterModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsFilterModalVisible(false);
    setIsCapasModalVisible(false);
  };

  const onMapReady = (mapProps, map) => {
    // Configura los controles del mapa
  };

  const bounds = new props.google.maps.LatLngBounds();
  bounds.extend({ lat: -27.366576, lng: -70.331580 });
  bounds.extend({ lat: -27.396576, lng: -70.361580 });

  const delitosData = [
    { lat: -27.370576, lng: -70.335580 },
    { lat: -27.372576, lng: -70.337580 },
  ];

  const renderMarkers = (data) => {
    return data.map((coord, index) => (
      <Marker
        key={index}
        position={coord}
        visible={activeLayer === null || activeLayer === data}
        onClick={() => handleMarkerClick(data[index])} // Agregar evento onClick
      />
    ));
  };

  const handleMarkerClick = (denuncia) => {
    // Aquí puedes mostrar el modal con los detalles de la denuncia
    setSelectedDenunciaDetails(denuncia);
    setIsModalVisible(true);
  };

  const toggleSidebarMapa = () => {
    setIsSidebarOpen1(!isSidebarOpen);
  };

  return (
    <div className="map-container">
    <div style={style}>
      <Map
        google={props.google}
        style={style}
        initialCenter={{ lat: -27.366576, lng: -70.331580 }}
        bounds={bounds}
        onReady={onMapReady}
      >
        {showAllCrimes && renderMarkers(allCrimesData)}
        <SideBarMapa isOpen={isSidebarOpen} onClose={toggleSidebarMapa} />
        <SideBarMapa onOpenModal={handleOpenFilterModal} onOpenModalCapas={handleOpenCapasModal} />
        <FiltroDatosMapa isVisible={isFilterModalVisible} onClose={handleCloseModal} />
        <CapasDatos isVisible={isCapasModalVisible} onClose={() => setIsCapasModalVisible(false)} onToggleLayer={handleToggleLayer} />

        <ModalDetallesRobos isVisible={showDetailsModal} onClose={() => setShowDetailsModal(false)} details={selectedRobberyDetails} />

        {showRobberyPolygon && (
          <Polygon
            paths={robberyCoordinates}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35}
            onClick={onPolygonClick}
          />
        )}

         {/* Modal para mostrar detalles de denuncia */}
        {/* Modal para mostrar detalles de denuncia */}
        {isModalVisible && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-button" onClick={() => setIsModalVisible(false)}>
        X
      </button>
      <h2>Detalles de Denuncia</h2>
      {selectedDenunciaDetails && ( // Verifica si se han seleccionado detalles de denuncia
        <div>
          <p><strong>Descripción:</strong> {selectedDenunciaDetails.descripcion}</p>
          <p><strong>Fecha:</strong> {selectedDenunciaDetails.fecha}</p>
          <p><strong>Otro Campo:</strong> {selectedDenunciaDetails.otroCampo}</p>
          {/* Agrega otros campos de detalles aquí */}
        </div>
      )}
    </div>
  </div>
)}
        </Map>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBRaqbsHq9LmqM19j_XKaGqw1QAAH2pUWw'
})(Mapa);
