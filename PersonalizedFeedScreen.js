import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchPersonalizedFeed } from './services';
import PostCard from './PostCard';

export default function PersonalizedFeedScreen({ navigation, route }) {
  const { user } = route.params;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchPersonalizedFeed(user.id);
      setPosts(data);
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👤 Personalized Feed</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
      />
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('GlobalFeed', { user })}
      >
        <Text style={styles.navText}>← Back to Global Feed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  navButton: {
    padding: 14,
    backgroundColor: '#1e90ff',
    marginTop: 10,
    borderRadius: 6
  },
  navText: { color: '#fff', fontSize: 16, textAlign: 'center' }
});
