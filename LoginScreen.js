import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from './supabase';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLoginOrRegister = async () => {
    if (!username || !password) {
      Alert.alert('Missing Fields', 'Please enter both username and password');
      return;
    }

    if (isRegistering) {
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username);

      if (checkError) {
        Alert.alert('Database Error', checkError.message);
        return;
      }

      if (existingUser.length > 0) {
        Alert.alert('Username Taken', 'This username is already registered.');
        return;
      }

      const { data: newUser, error } = await supabase
        .from('users')
        .insert([{ username, password }])
        .select()
        .single();

      if (error) {
        Alert.alert('Registration Error', error.message);
      } else {
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('GlobalFeed', { user: newUser });
      }
    } else {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !user) {
        Alert.alert('Login Failed', 'Invalid username or password');
        return;
      }

      navigation.navigate('GlobalFeed', { user });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Register' : 'Login'}</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLoginOrRegister}>
        <Text style={styles.buttonText}>
          {isRegistering ? 'Register' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.toggleText}>
          {isRegistering
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    color: '#000',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  toggleText: {
    textAlign: 'center',
    color: '#1e90ff',
    fontSize: 14,
  },
});