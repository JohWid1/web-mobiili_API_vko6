import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button } from 'react-native';
import useRandomCard from './hooks/getRandomCard';

const App = () => {
  const { card, loading, error, getRandomCard } = useRandomCard();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text>{error}</Text>
        <Button title="Try Again" onPress={getRandomCard} />
      </View>
    );
  }

  if (!card) {
    return <Text>No card data available</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{card.name}</Text>
      {card.image_uris && (
        <Image
          source={{ uri: card.image_uris.normal }}
          style={styles.cardImage}
          resizeMode="contain"
        />
      )}
      <Text style={styles.type}>{card.type_line}</Text>
      <Text style={styles.text}>{card.oracle_text}</Text>
      <Button title="Random card" onPress={getRandomCard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardImage: {
    width: 300,
    height: 420,
    marginBottom: 10,
  },
  type: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default App;
