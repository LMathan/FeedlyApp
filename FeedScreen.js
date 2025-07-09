import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { fetchGlobalFeed, fetchPersonalizedFeed } from './services';
import PostCard from './PostCard';

export default function FeedScreen({ user }) {
  const [feedType, setFeedType] = useState('global');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, [feedType]);

  async function loadPosts() {
    const data =
      feedType === 'global'
        ? await fetchGlobalFeed()
        : await fetchPersonalizedFeed(user.id);
    setPosts(data);
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button title="Global Feed" onPress={() => setFeedType('global')} />
        <Button title="Personalized Feed" onPress={() => setFeedType('personalized')} />
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
}
