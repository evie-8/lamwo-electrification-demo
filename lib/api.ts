import axios from "axios";

/**
 * The function fetches villages from an API based on search criteria, page number, and category.
 * @param [search] - The `search` parameter in the `fetchVillages` function is used to specify a search
 * query to filter the villages. If a search query is provided, only villages matching the search query
 * will be returned. If no search query is provided, all villages will be returned.
 * @param [page=1] - The `page` parameter in the `fetchVillages` function is used to specify the page
 * number of results to retrieve from the API. It defaults to 1 if not provided. This parameter is
 * typically used for pagination, allowing you to fetch different sets of data based on the page
 * number.
 * @param [category] - The `category` parameter in the `fetchVillages` function is used to filter
 * villages based on a specific category. If a category is provided, only villages belonging to that
 * category will be fetched. If no category is provided, all villages will be fetched regardless of
 * their category.
 * @returns The function `fetchVillages` is returning the data array from the response if it exists. If
 * the response contains data, it will log the total number of pages and return the data array. If
 * there is an error during the fetch, it will log an error message and return `null`.
 */
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
  
/**
 * The function `getTotalPages` makes an asynchronous request to fetch the total number of pages for a
 * given category.
 * @param [category] - The `getTotalPages` function is an asynchronous function that fetches the total
 * number of pages for a given category from an API endpoint. The `category` parameter is optional and
 * can be passed to filter the pages based on a specific category.
 * @returns The function `getTotalPages` is returning the total number of pages for a given category.
 * It makes an asynchronous request to the `/api/pages` endpoint with an optional category parameter.
 * If the request is successful, it logs the total number of pages to the console and returns the
 * `totalPages` value from the response data. If there is an error during the request, it logs an
 * error message
 */
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