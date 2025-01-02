import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer} from 'react-leaflet';
import React,{useState} from 'react';

const Map = ()=>{

    const mapStyle = {
        height: '100vh',
        width: '100%',
        margin: '0 auto',
    }

    return(
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="map_container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
                border: '2px solid #333',
                width: '100%',
                height: '100%',
                margin: '25px',
            }}>
                <MapContainer center={[37.8, -96]}
                    zoom={3} scrollWheelZoom={true} style={mapStyle}>
                    <TileLayer
                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </div>

    )
}
export default Map;