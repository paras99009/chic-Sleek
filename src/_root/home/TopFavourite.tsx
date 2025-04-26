
import { Models } from 'appwrite'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { topProductsFavourite } from '../../lib/appwrite/api'
import GridPostList from '../../components/GridPostList'

function TopFavourite() {

        const [places, setPlaces] = useState<Models.Document[]>([])
        const [loading, setLoading] = useState(false)
      
        useEffect(() => {
            setLoading(true)
          const fetchPlaces = async () => {
            try {
              const response = await topProductsFavourite()
              if (response && response.documents) {
                setPlaces(response.documents)
              }
            } catch (error) {
              console.error("Failed to fetch places", error)
            } finally {
              setLoading(false)
            }
          }
      
          fetchPlaces()
        }, [])

    return (
        <div className="top-suggested-section container py-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader className="animate-spin text-primary" size={32} />
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
              <GridPostList post={places}/>
            </div>
          )}
        </div>
      );
      
}

export default TopFavourite;
