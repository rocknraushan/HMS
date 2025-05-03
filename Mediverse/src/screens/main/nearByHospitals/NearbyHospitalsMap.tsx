import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  SafeAreaView,
  PermissionsAndroid
} from 'react-native';
import MapView, { Marker, Region, Callout } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { calculateDistance } from '../../../utils/commonFunction';
const { width } = Dimensions.get('window');
const GOOGLE_API_KEY = 'AIzaSyBMznm-jJXo1zOwHyFkQz8WgwEKegN7BsQ';

type Place = {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  lat: number;
  lng: number;
  distance: string;
  type: string;
  image: string;
};

const NearbyHospitalsMap: React.FC = () => {
  const skipFetchRef = useRef(false);
  const mapRef = useRef<MapView>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedType, setSelectedType] = useState('hospital');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 28.5672,
    longitude: 77.2100,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [cachedPlaces, setCachedPlaces] = useState<Record<string, Place[]>>({});

  const isRegionSignificantlyDifferent = (r1: Region, r2: Region) => {
    const latDiff = Math.abs(r1.latitude - r2.latitude);
    const lngDiff = Math.abs(r1.longitude - r2.longitude);
    return latDiff > 0.045 || lngDiff > 0.045; // ~5km threshold
  };
  
  useEffect(() => {
    const getCurrentLocation = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      }
  
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          };
          setRegion(newRegion);
          skipFetchRef.current = true;
          fetchNearbyPlaces(latitude, longitude, selectedType);
        },
        (error) => {
          console.log('Location error:', error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };
  
    getCurrentLocation();
  }, []);
  
  const onRegionChangeComplete = (newRegion: Region) => {
    if (skipFetchRef.current) {
      skipFetchRef.current = false;
      return;
    }
  
    if (!isRegionSignificantlyDifferent(region, newRegion)) {
      return; // Ignore small movements
    }
  
    setRegion(newRegion);
  };
  
  
  

  useEffect(() => {
    console.log("places",places.length)
  
    
  }, [places])
  

  useEffect(() => {
    // Skip fetch if flag is true
    if (skipFetchRef.current) {
      skipFetchRef.current = false; // Reset flag
      return;
    }
  
    if (region.latitude && region.longitude && selectedType) {
      fetchNearbyPlaces(region.latitude, region.longitude, selectedType);
    }
  }, [region.latitude, region.longitude, selectedType]);
  
  

  const fetchNearbyPlaces = async (lat: number, lng: number, type: string) => {
    const cacheKey = `${lat}-${lng}-${type}`;
    if (cachedPlaces[cacheKey]) {
      setPlaces(cachedPlaces[cacheKey]); // Use cached data if available
      return;
    }

    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        {
          params: {
            location: `${lat},${lng}`,
            radius: 5000,
            type,
            key: GOOGLE_API_KEY,
          },
        }
      );

      const results: Place[] = await Promise.all(
        response.data.results.map(async (place: any) => {
          const photoReference = place.photos?.[0]?.photo_reference;
          const distance = calculateDistance(lat, lng, region.latitude, region.longitude);
          const image = photoReference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`
            : 'https://via.placeholder.com/400x300';

          return {
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            rating: place.rating || 0,
            reviews: place.user_ratings_total || 0,
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            distance: distance?distance:'NA',
            type,
            image,
          };
        })
      );

      // Cache the fetched places
      setCachedPlaces((prev) => ({ ...prev, [cacheKey]: results }));
      setPlaces(results);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handlePlaceSelect = (data: any, details: any = null) => {
    skipFetchRef.current = true;
    if (details) {
      const { lat, lng } = details.geometry.location;
      const newRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    }
  };

  const handleCardPress = (place: Place) => {
    skipFetchRef.current = true; 
  
    const newRegion = {
      latitude: place.lat,
      longitude: place.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  
    setHighlightedId(place.id);
    mapRef.current?.animateToRegion(newRegion, 1000);
  };

  const filterTypes = ['hospital', 'clinic', 'pharmacy'];

  const MemoizedCard = React.memo(({ item, onPress }: { item: Place, onPress: () => void }) => (
    <TouchableOpacity activeOpacity={0.2} style={styles.card} onPress={onPress}>
      <FastImage
        source={{ uri: item.image, priority: FastImage.priority.high,cache:FastImage.cacheControl.immutable }}
        style={styles.cardImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardAddress}>{item.address}</Text>
      <Text style={styles.cardSub}>
        ⭐ {item.rating} ({item.reviews} Reviews)
      </Text>
      <Text style={styles.cardSub}>
        {item.distance} | {item.type}
      </Text>
    </TouchableOpacity>
  ));

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 0 }]}>
  <StatusBar hidden={true} translucent backgroundColor="transparent" />

  <GooglePlacesAutocomplete
    placeholder="Search hospitals or locations"
    fetchDetails
    onPress={handlePlaceSelect}
    query={{ key: GOOGLE_API_KEY, language: 'en' }}
    styles={{
      container: styles.searchContainer,
      textInput: styles.searchInput,
      textInputContainer: { backgroundColor: '#fff', borderRadius: 8 },
      description: { color: '#000' },
    }}
    textInputProps={{
      placeholderTextColor: '#000',
    }}
    enablePoweredByContainer={false}
  />

  <MapView
    ref={mapRef}
    style={styles.map}
    region={region}
    onRegionChangeComplete={onRegionChangeComplete}
  >
    {places.map((place) => (
      <Marker
        key={place.id}
        coordinate={{ latitude: place.lat, longitude: place.lng }}
        title={place.name}
        description={place.address}
        pinColor={highlightedId === place.id ? 'blue' : 'red'}
        onPress={() => {
          skipFetchRef.current = true;
          setHighlightedId(place.id);
        }}
      >
        <Callout>
          <View style={styles.tooltip}>
            <Text>{place.name}</Text>
            <Text>{place.address}</Text>
          </View>
        </Callout>
      </Marker>
    ))}
  </MapView>

  <View style={styles.cardList}>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MemoizedCard item={item} onPress={() => handleCardPress(item)} />
      )}
    />
  </View>
</SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    width: '90%',
    alignSelf: 'center',
    zIndex: 2,
  },
  searchInput: {
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#000',
    elevation: 4,
  },
  filterContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 120 : 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 2,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 16,
    marginHorizontal: 5,
  },
  selectedFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    color: '#333',
    fontSize: 13,
  },
  selectedFilterText: {
    color: '#fff',
  },
  cardList: {
    position: 'absolute',
    bottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 10,
    width: width * 0.8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    height:'auto',
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardAddress: { fontSize: 14, color: '#555' },
  cardSub: { fontSize: 12, color: '#777' },
  tooltip: {
    padding: 10,
  },
});

export default NearbyHospitalsMap;
