import  { useEffect, useState } from "react";
import {  Loader } from "lucide-react";
import {   topSuggestedProducts } from "../../lib/appwrite/api";
import GridPostList from "../../components/GridPostList";


type Products = {
    $id: string; // Unique identifier for the product
    name: string; // Name of the product
    skinType: string[]; // Skin type(s) associated with the product
    productUrl: string; // URL to purchase the product
    price: string; // Price of the product
    imageUrl: string; // Image URL of the product
    tags?: string[];
};

const TopSuggested = () => {
  const [places, setPlaces] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await topSuggestedProducts();
        const dummy = [];
        const usedIndexes = new Set();
  
        if (Array.isArray(data) && data.length > 0) {
          while (dummy.length < 3 && usedIndexes.size < data.length) {
            const randomIndex = Math.floor(Math.random() * data.length);
            if (!usedIndexes.has(randomIndex)) {
              usedIndexes.add(randomIndex);
              dummy.push(data[randomIndex]);
            }
          }
        }
  
        setPlaces(dummy);
      } catch (error) {
        console.error("Failed to fetch suggested places:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPlaces();
  }, []);

  return (
    <div className="top-suggested-section w-full py-10 px-5">

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <GridPostList post={places}/>
        </div>
      )}
    </div>
  );
  
};

export default TopSuggested;
