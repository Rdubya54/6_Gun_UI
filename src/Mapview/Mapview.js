import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import './Mapview.css';
import Map from "../Map/Map";
import { TileLayer, VectorLayer } from "../Layers";
import { osm, vector } from "../Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import CircularProgress from '../Widgets/Spinner'



function MapView() {

    const [center, setCenter] = useState([-90.68451, 38.878656]);
    const [zoom, setZoom] = useState(13);

    const [isLoading, setLoading] = useState(true)
    const [geojsonObject, setGeoJson] = useState();


    const getData = () => {
        fetch('Data/blinds.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json()
            })
            .then(function (myJson) {
                setGeoJson(myJson)
                //delay loading just to see spinner
                setTimeout(() => { setLoading(false); }, 2000);

            });
    }
    useEffect(() => {
        getData()
    }, [])


    if (isLoading) {
        return (
            <div>
                <Map center={fromLonLat(center)} zoom={zoom}>
                    <TileLayer
                        source={osm()}
                        zIndex={0}
                    />
                    <CircularProgress />
                </Map>
            </div>
        )

    }

    return (
        <div>
            <Map center={fromLonLat(center)} zoom={zoom}>
                <TileLayer
                    source={osm()}
                    zIndex={0}
                />
                <VectorLayer
                    source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
                />
            </Map>
        </div>
    );
}

export default MapView;