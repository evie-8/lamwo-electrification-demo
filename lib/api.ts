import axios from "axios";

export const fetchVillages = async (search = "", page = 1, category = "") => {
    try {
      const response = await axios.get(
        `/api/villages`, 
        {
          params: {
            page,
            search: search || undefined,
            category: category || undefined,
          }
        }
      );
  
      if (response.data) {
        console.log("data", response.data.totalPages);
        return response.data.data;
      }
    } catch (error) {
      console.error("Failed to fetch villages", error);
      return null;
    }
  };
  
  export const getTotalPages = async (category = "") => {
      try {
        const response = await axios.get(
          `/api/pages`, 
          {
            params: {
             
              category: category || undefined,
            }
          }
        );
    
        if (response.data) {
          console.log("Total pages", response.data.totalPages);
          return response.data.totalPages;
        }
      } catch (error) {
        console.error("Failed to fetch total Pages", error);
        return null;
      }
    };