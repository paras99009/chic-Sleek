import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { getAllProduct } from '../../lib/appwrite/api';
import GridPostList from '../../components/GridPostList';
import { Models } from 'appwrite';

function AllSkin() {
    const [places, setPlaces] = useState<Models.Document[]>([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      const fetchPlaces = async () => {
        try {
          const response = await getAllProduct();
          if (response && response.documents) {
            setPlaces(response.documents);
          }
        } catch (error) {
          console.error('Failed to fetch places', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPlaces();
    }, []);
  
    return (
      <div className="container py-4">
        <h1 className="text-center mb-4 fw-bold display-4">Top Places this Month</h1>
        <div className="row g-4 justify-content-center">
          {loading ? (
            <div className="d-flex justify-content-center">
              <Loader className="spinner-border text-primary" role="status" />
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4'>
                <GridPostList post={places}/>

            </div>
            )
        }
        </div>
        </div>
        
    );
  }

export default AllSkin
