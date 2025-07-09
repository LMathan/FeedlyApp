import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import AddPostScreen from './AddPostScreen';
import GlobalFeedScreen from './GlobalFeedScreen';
import LoginScreen from './LoginScreen';
import PersonalizedFeedScreen from './PersonalizedFeedScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="GlobalFeed" component={GlobalFeedScreen} />
        <Stack.Screen name="PersonalizedFeed" component={PersonalizedFeedScreen} />
        <Stack.Screen name="AddPost" component={AddPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
