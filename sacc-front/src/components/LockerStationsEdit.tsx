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
          const data = await GetStation(id);
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
    }, [id]);
  
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
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <label htmlFor="thing_name" className="block text-sm font-bold text-gray-700">
                Thing Name:
                </label>
                <input
                type="text"
                id="thing_name"
                name="thing_name"
                value={editedStation.thing_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="shadow_name" className="block text-sm font-bold text-gray-700">
                Shadow Name:
                </label>
                <input
                type="text"
                id="shadow_name"
                name="shadow_name"
                value={editedStation.shadow_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-bold text-gray-700">
                Address:
                </label>
                <input
                type="text"
                id="address"
                name="address"
                value={editedStation.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="roleARN" className="block text-sm font-bold text-gray-700">
                Role ARN:
                </label>
                <input
                type="text"
                id="roleARN"
                name="roleARN"
                value={editedStation.roleARN}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="active" className="block text-sm font-bold text-gray-700">
                Active:
                </label>
                <input
                type="text"
                id="active"
                name="active"
                value={editedStation.active}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Save Changes
            </button>
            </form>

          )}
        </div>
      );
    };  
    
  
  export default EditStation;
  