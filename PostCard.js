import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { isFollowing, toggleFollow } from './services';

export default function PostCard({ post, currentUser }) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    async function checkFollow() {
      if (currentUser?.id !== post.user_id) {
        const isFollowed = await isFollowing(currentUser.id, post.user_id);
        setFollowing(isFollowed);
      }
    }
    checkFollow();
  }, [currentUser, post.user_id]);

  const handleToggle = async () => {
    await toggleFollow(currentUser.id, post.user_id, !following);
    setFollowing(!following);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.desc}>{post.description}</Text>
      <Text style={styles.tags}>#{post.tags?.join(' #')}</Text>
      <View style={styles.row}>
        <Text style={styles.meta}>by {post.username}</Text>
        {currentUser?.id !== post.user_id && (
          <TouchableOpacity onPress={handleToggle} style={styles.followBtn}>
            <Text style={styles.followText}>{following ? 'Unfollow' : 'Follow'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  desc: { marginVertical: 6 },
  tags: { color: '#555', fontStyle: 'italic' },
  meta: { fontSize: 12, color: '#999' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  followBtn: {
    backgroundColor: '#1e90ff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  followText: {
    color: '#fff',
    fontSize: 12,
  },
});
