import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import {
    Container,
    ButtonStatus,
    Photo,
} from './styles'
export default function ImageSelected({selectedImage, defaultImage}) {
  const [image, setImage] = useState(null);
  const navigation = useNavigation()

  useEffect(()=>{
    const unsubscribe = navigation.addListener('blur', ()=>{
      return setImage(null)
    })
    
  },[navigation])

  useEffect(()=>{
    if(defaultImage && !image ){
      return setImage(defaultImage)
    }
  },[defaultImage])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.cancelled){
      selectedImage(result)
      setImage(result.uri);
    }
  };
  return (
    <Container>
        {!image && (
            <ButtonStatus title="Selecione uma imagem" onPress={pickImage} />
        )}
        {image && (
          <TouchableOpacity style={{width: '100%'}}onPress={pickImage}>
            <Photo 
              onPress={pickImage} 
              source={{ uri: image }}style={{ width: '100%', height: 235 }} 
            />
          </TouchableOpacity>
          
        )}
    </Container>
  );
}