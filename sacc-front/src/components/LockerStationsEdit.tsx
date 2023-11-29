import React, { useState, useEffect } from 'react';
import configData from "../services/config.json";
import {  GetStation } from "../services/StationService";


const EditStation = ({ id }: { id: number }) => {
    const [editedStation, setEditedStation] = useState({
      id: '',
      thing_name: '',
      shadow_name: '',
      address: '',
      roleARN: '',
      active: '',
    });
    const [loading, setLoading] = useState(true);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedStation((prevStation) => ({
          ...prevStation,
          [name]: value,
        }));
      };
  
    useEffect(() => {
      const fetchStation = async () => {
        try {
          const data = await GetStation(editedStation.id);
          console.log(data);
          console.log("Fetched station:", data);
          setEditedStation(data);
        } catch (error) {
          console.error("Error fetching station:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchStation();
    }, [editedStation.id]);
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateStationData();
      };
      
  
    const updateStationData = async () => {
      try {
        const response = await fetch(`${configData.SACC_URL}/station/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedStation),
        });
  
        if (response.ok) {
          console.log('Station updated successfully.');
        } else {
          console.error('Failed to update station:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating station:', error);
      }
    };
    return (
        <div>
          <h1>Edit Station</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
            <label>
                Thing Name:
                <input
                type="text"
                name="thing_name"
                value={editedStation.thing_name}
                onChange={handleInputChange}
                />
            </label>
            <label>
                Shadow Name:
                <input
                type="text"
                name="shadow_name"
                value={editedStation.shadow_name}
                onChange={handleInputChange}
                />
            </label>
            <label>
                Address:
                <input
                type="text"
                name="address"
                value={editedStation.address}
                onChange={handleInputChange}
                />
            </label>
            <label>
                Role ARN:
                <input
                type="text"
                name="roleARN"
                value={editedStation.roleARN}
                onChange={handleInputChange}
                />
            </label>
            <label>
                Active:
                <input
                type="text" 
                name="active"
                value={editedStation.active}
                onChange={handleInputChange}
                />
            </label>
          <button type="submit">Save Changes</button>
        </form>
          )}
        </div>
      );
    };  
    
  
  export default EditStation;
  