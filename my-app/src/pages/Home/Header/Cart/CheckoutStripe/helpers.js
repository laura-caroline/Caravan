import { Alert } from 'react-native';

const API_URL = 'https://expo-stripe-server-example.glitch.me'

export async function fetchPublishableKey(){
  try {
    const response = await fetch(
      `${API_URL}/stripe-key?paymentMethod=`
    );

    const { publishableKey } = await response.json();
    console.log(publishableKey)
    return publishableKey;
    
  } catch (e) {
    console.warn('Unable to fetch publishable key. Is your server running?');
    Alert.alert(
      'Error',
      'Unable to fetch publishable key. Is your server running?'
    );
    return null;
  }
}
