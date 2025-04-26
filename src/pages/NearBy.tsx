import React, { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import "bootstrap/dist/css/bootstrap.min.css";

// Define types for location and dermatologist
interface Location {
  lat: number;
  lng: number;
}

interface Dermatologist {
  id: number;
  name: string;
  clinic: string;
  address: string;
  contact: string;
  location: Location;
  image: string;
}


    const dermatologists: Dermatologist[] = [
        {
          id: 1,
          name: "Fortune Clinics",
          clinic: "Skin Cure Clinic",
          address: "Fortune Hospital, 41, Sharda Nagar Rd, Q Block, Sharda Nagar, Kanpur",
          contact: "088814 00900",
          location: { lat: 26.4499, lng: 80.3319 }, // Coordinates for Sharda Nagar, Kanpur
          image: "https://lh3.googleusercontent.com/p/AF1QipOH8Fx7GaVHmn5f3Qa7hQSJsEVRYZ5wbXCyP7lK=s680-w680-h510",
        },
        {
          id: 2,
          name: "Dr. Pawan Singh",
          clinic: "Glow Skin Care",
          address: "Near Rave Moti, in front of Ram Misthan Bhandar, Moti Vihar Society, Rawat Pur, Kanpur",
          contact: "093696 45682",
          location: { lat: 26.4674, lng: 80.3465 }, // Coordinates for Rawat Pur, Kanpur
          image: "https://lh3.googleusercontent.com/p/AF1QipO8_zJGFoR8ab8H0KCCsKU5t8XMQLXnXfucB9f_=s680-w680-h510",
        },
        {
          id: 3,
          name: "Dr. Prasun Sachan",
          clinic: "Healthy Skin Centre",
          address: "Rawatpur Gaon near Namak Factory Chauraha Omar Vaishya School Lane, Kanpur",
          contact: "063876 44484",
          location: { lat: 26.5107, lng: 80.2939 }, // Coordinates for Rawatpur Gaon, Kanpur
          image: "https://lh3.googleusercontent.com/p/AF1QipPZAYlLJiGHgA8jvPRhsCKlKvwXmJ3O5s1CI6J3=s680-w680-h510",
        },
      ];
      

const Nearby = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const defaultCenter: Location = { lat: 26.4983, lng: 80.2658 }; // Center of Kanpur

  return (
    <APIProvider apiKey="AIzaSyAyQDaDdNGlJzC1lOSI6oz71AFsNSUl7zc">
      <div className="container-fluid py-4" >
        <div className="row">
          {/* Header */}
          <div className="col-12 mb-4">
            <h3 className="text-start fw-bold">Nearby Dermatologist</h3>
          </div>

          {/* Left Side: Dermatologist Cards */}
          <div
            className="col-lg-4 col-md-6"
            style={{
              maxHeight: "100vh",
              overflowY: "scroll",
              paddingRight: "15px",
              scrollbarWidth: "none" 
            }}
           
          >
            {dermatologists.map((derm) => (
              <div
                key={derm.id}
                className="card mb-3"
                style={{
                  cursor: "pointer",
                  width: "90%",
                  margin: "0 auto",
                }}
                onClick={() => setSelectedLocation(derm.location)}
              >
                <img
                  src={derm.image}
                  className="card-img-top"
                  alt={derm.name}
                  style={{ height: "120px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: "1rem" }}>
                    {derm.name}
                  </h5>
                  <p
                    className="card-text"
                    style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}
                  >
                    {derm.address}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: "0.8rem", color: "gray" }}
                  >
                    {derm.contact}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Map */}
          <div className="col-lg-8 col-md-6">
            <div
              className="map-container border rounded"
              style={{
                height: "100vh",
                position: "sticky",
                top: 0,
              }}
            >
              <Map
                center={selectedLocation || defaultCenter}
                zoom={16}
                style={{ width: "100%", height: "100%" }}
              >
                {dermatologists.map((derm) => (
                  <Marker
                    key={derm.id}
                    position={derm.location || defaultCenter}
                    title={derm.name}
                  />
                ))}
              </Map>
            </div>
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

export default Nearby;
