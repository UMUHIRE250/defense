import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function App() {
  const [houseData, setHouseData] = useState(null);

  useEffect(() => {
    fetchHouseData();
  }, []);

  const fetchHouseData = async () => {
    try {
      const response = await fetch('http://10.2.2.0:5000/api/house');
      const data = await response.json();
      setHouseData(data);
    } catch (error) {
      console.error('Error fetching house data:', error);
    }
  };

  const renderHouseData = () => {
    if (!houseData) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={styles.houseContainer}>
        {Object.entries(houseData).map(([floor, rooms]) => (
          <View key={floor} style={styles.floorContainer}>
            <Text style={styles.floorText}>{floor}</Text>
            {Object.entries(rooms).map(([room, details]) => (
              <View key={room} style={styles.roomContainer}>
                <Text style={styles.roomText}>{room}</Text>
                <Text>{details.details}</Text>
                <Text>{details.color}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>xBeacon Agaciro house navigation system</Text>
      {renderHouseData()}
      <Button title="Refresh" onPress={fetchHouseData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  houseContainer: {
    width: '100%',
  },
  floorContainer: {
    marginBottom: 20,
  },
  floorText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  roomContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  roomText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
