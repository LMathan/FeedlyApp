import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { fetchGlobalFeed } from './services';
import PostCard from './PostCard';

export default function GlobalFeedScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const { user } = route.params;

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchGlobalFeed();
      setPosts(data);
    };
    loadPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddPost', { user })}
        >
          <Text style={styles.buttonText}>➕ Add Post</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#555' }]}
          onPress={() => navigation.navigate('PersonalizedFeed', { user })}
        >
          <Text style={styles.buttonText}>⭐ My Feed</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PostCard post={item} currentUser={user} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f9f9f9' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 0.48,
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
