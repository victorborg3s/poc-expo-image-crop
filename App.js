import React, { useState } from 'react';
import {
  Button,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  Text,
} from 'react-native';
import ImageEditor from 'expo-image-cropper';
import * as ImagePicker from 'expo-image-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default function App() {
  const { width } = useWindowDimensions()
  const [imageUri, setImageUri] = useState(null);
  const [croppedImageUri, setCroppedImageUri] = useState(null)

  const pickImage = async () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    })
      .then((result) => {
        if (!result?.cancelled) {
          setImageUri(result.uri);
        }
      })
      .catch(console.error);
  };

  return (
    <View style={styles.container}>
      <Text>{imageUri ?? 'nenhum arquivo'}</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri, height: 200, width: width - 20 }} />}
      {imageUri && (
        <ImageEditor
          imageUri={imageUri}
          fixedAspectRatio={2 / 3}
          minimumCropDimensions={{
            width: 50,
            height: 50,
          }}
          onEditingCancel={() => {
            setImageUri(null);
          }}
          onEditingComplete={(image) => {
            console.log(image)
            setCroppedImageUri(image)
            setImageUri(null);
          }}
        />
      )}
      {
        croppedImageUri && (
          <Image source={croppedImageUri} />
        )
      }
    </View>
  );
}
