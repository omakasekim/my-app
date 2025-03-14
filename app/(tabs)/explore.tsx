import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ScrollView, TextInput, Button } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { LineChart } from 'react-native-chart-kit';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT.appspot.com",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function MainTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Eco-Points" component={PointsScreen} />
//       <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
//       <Tab.Screen name="Impact Tracker" component={ImpactTrackerScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Main" component={MainTabs} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const HomeScreen: React.FC = () => (
//   <ScrollView style={styles.container}>
//     <Text style={styles.title}>Eco-Feed & Community Challenges</Text>
//   </ScrollView>
// );

// const PointsScreen: React.FC = () => {
//   const [points, setPoints] = useState<number>(100);
//   const [image, setImage] = useState<string | null>(null);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 1 });
//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       setPoints(points + 50);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Your Eco-Points</Text>
//       <Text style={styles.points}>{points} Points</Text>
//       <TouchableOpacity style={styles.button} onPress={pickImage}>
//         <Text style={styles.buttonText}>Upload Proof (Receipt, Image)</Text>
//       </TouchableOpacity>
//       {image && <Image source={{ uri: image }} style={styles.receiptImage} />}
//     </View>
//   );
// };

// const MarketplaceScreen: React.FC = () => {
//   const [items, setItems] = useState<{ id: string; name: string; price: number; imageUrl: string; }[]>([]);
//   useEffect(() => {
//     const fetchItems = async () => {
//       const querySnapshot = await getDocs(collection(db, "marketplace"));
//       setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as { name: string; price: number; imageUrl: string }) })));
//     };
//     fetchItems();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Sustainable Marketplace</Text>
//       {items.map((item) => (
//         <View key={item.id} style={styles.card}>
//           <Text>{item.name} - {item.price} Points</Text>
//           <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const ImpactTrackerScreen: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Your Impact Tracker</Text>
//     </View>
//   );
// };

// const ProfileScreen: React.FC = () => {
//   const [profile, setProfile] = useState<{ displayName: string; bio: string; profilePic: string }>({ displayName: '', bio: '', profilePic: '' });
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const user = auth.currentUser;
//       if (!user) return;
//       const userDoc = await getDoc(doc(db, "users", user.uid));
//       if (userDoc.exists()) {
//         setProfile(userDoc.data() as { displayName: string; bio: string; profilePic: string });
//       }
//     };
//     fetchProfile();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>{profile.displayName}</Text>
//       <Image source={{ uri: profile.profilePic }} style={{ width: 100, height: 100, borderRadius: 50 }} />
//       <Text>{profile.bio}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
//   card: { backgroundColor: '#e0f7fa', padding: 15, marginVertical: 8, borderRadius: 10 },
//   button: { backgroundColor: '#0288d1', padding: 10, borderRadius: 5, marginTop: 10 },
//   buttonText: { color: '#fff', textAlign: 'center' },
//   receiptImage: { width: 200, height: 200, marginTop: 10 },
//   points: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
// });
