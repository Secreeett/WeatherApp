import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome from Expo vector-icons
import * as Location from 'expo-location'; // Import Location from Expo

const backgroundImg = require("./assets/2.jpg");

const HomeScreen = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(null); // State to store current location
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Get user's current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , second: '2-digit'});
  };

  const handleMapPress = () => {
    if (location) {
      navigation.navigate("MapView", {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } else {
      // Handle case where location is not yet available
      alert("Location information is not available yet. Please try again later.");
    }
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.overlay}>
          <Text style={styles.date}>{formatDate(currentTime)}</Text>
          <Text style={styles.time}>{formatTime(currentTime)}</Text>
          <Text style={styles.heading}>Welcome to Weather Forecast and Map Viewing</Text>
          <Text style={styles.subHeading}>
            Get real-time weather updates for any city.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Search")}>
            <Text style={styles.buttonText}>Search City</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.miniMapButton} onPress={handleMapPress}>
        <FontAwesome name="globe" size={50} color="white" />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: "center",
    width: '100%',
  },
  date: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  time: {
    fontSize: 22,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 20,
    marginBottom: 30,
    color: "white",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  miniMapButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
