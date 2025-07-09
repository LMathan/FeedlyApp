import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { supabase } from './supabase';

export default function AddPostScreen({ navigation, route }) {
  const { user } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handlePost = async () => {
    if (!title || !description) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      title,
      description,
      tags: tags.split(',').map((tag) => tag.trim()),
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Post created!');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <TextInput
        placeholder="Tags (comma separated)"
        value={tags}
        onChangeText={setTags}
        style={styles.input}
      />
      <Button title="Post" onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    color: '#000',
    backgroundColor: '#fff',
  },
});