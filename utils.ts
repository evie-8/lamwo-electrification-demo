/**
 * The function `measureCoordDistance` calculates the distance between two coordinates on Earth given
 * their latitude and longitude values.
 * @param {number} lat1 - `lat1` is the latitude of the first coordinate point in degrees.
 * @param {number} lon1 - Longitude of the first coordinate
 * @param {number} lat2 - Latitude of the second point
 * @param {number} lon2 - Longitude of the second coordinate
 * @param {string} unit - The `unit` parameter in the `measureCoordDistance` function is used to
 * specify the unit of measurement for the distance calculation. It can take the following values:
 * @returns The `measureCoordDistance` function calculates the distance between two sets of coordinates
 * (latitude and longitude) using the Haversine formula. The function returns the distance in
 * kilometers if the `unit` parameter is set to "K", in nautical miles if set to "N", or in miles if
 * not specified.
 */
export const measureCoordDistance = (
    lat1:  number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: string
  ) => {
   
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * lat2) / 180;
      const theta = lon1 - lon2;
      const radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      if (unit === "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }