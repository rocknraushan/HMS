
export type BufferType = {
  data: number[];
  type: 'Buffer';
};

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return `${distance.toFixed(2)} km`;
  };
  

  
  
  export function bufferToImageUrl(buffer: BufferType): string {
    if (!buffer || !Array.isArray(buffer.data)) {
      throw new Error('Invalid buffer object');
    }
  
    return String.fromCharCode(...buffer.data);
  }
  