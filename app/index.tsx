// // // import React, { useState, useEffect } from 'react';
// // // import { NavigationContainer } from '@react-navigation/native';
// // // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // // import { createStackNavigator } from '@react-navigation/stack';
// // // import { Ionicons } from '@expo/vector-icons';
// // // import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ScrollView, TextInput, Button } from 'react-native';
// // // import * as ImagePicker from 'expo-image-picker';
// // // import { LineChart } from 'react-native-chart-kit';
// // // import { initializeApp } from 'firebase/app';
// // // import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// // // import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
// // // import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// // // const firebaseConfig = {
// // //   apiKey: "YOUR_API_KEY",
// // //   authDomain: "YOUR_PROJECT.firebaseapp.com",
// // //   projectId: "YOUR_PROJECT_ID",
// // //   storageBucket: "YOUR_PROJECT.appspot.com",
// // //   messagingSenderId: "YOUR_SENDER_ID",
// // //   appId: "YOUR_APP_ID"
// // // };

// // // const app = initializeApp(firebaseConfig);
// // // const auth = getAuth(app);
// // // const db = getFirestore(app);
// // // const storage = getStorage(app);

// // // const Tab = createBottomTabNavigator();
// // // const Stack = createStackNavigator();

// // // function MainTabs() {
// // //   return (
// // //     <Tab.Navigator>
// // //       <Tab.Screen name="Home" component={HomeScreen} />
// // //       <Tab.Screen name="Eco-Points" component={PointsScreen} />
// // //       <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
// // //       <Tab.Screen name="Impact Tracker" component={ImpactTrackerScreen} />
// // //       <Tab.Screen name="Profile" component={ProfileScreen} />
// // //     </Tab.Navigator>
// // //   );
// // // }

// // // export default function App() {
// // //   return (
// // //     <NavigationContainer>
// // //       <Stack.Navigator>
// // //         <Stack.Screen name="Main" component={MainTabs} />
// // //       </Stack.Navigator>
// // //     </NavigationContainer>
// // //   );
// // // }

// // // const HomeScreen: React.FC = () => (
// // //   <ScrollView style={styles.container}>
// // //     <Text style={styles.title}>Eco-Feed & Community Challenges</Text>
// // //   </ScrollView>
// // // );

// // // const PointsScreen: React.FC = () => {
// // //   const [points, setPoints] = useState<number>(100);
// // //   const [image, setImage] = useState<string | null>(null);

// // //   const pickImage = async () => {
// // //     let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 1 });
// // //     if (!result.canceled) {
// // //       setImage(result.assets[0].uri);
// // //       setPoints(points + 50);
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.title}>Your Eco-Points</Text>
// // //       <Text style={styles.points}>{points} Points</Text>
// // //       <TouchableOpacity style={styles.button} onPress={pickImage}>
// // //         <Text style={styles.buttonText}>Upload Proof (Receipt, Image)</Text>
// // //       </TouchableOpacity>
// // //       {image && <Image source={{ uri: image }} style={styles.receiptImage} />}
// // //     </View>
// // //   );
// // // };

// // // const MarketplaceScreen: React.FC = () => {
// // //   const [items, setItems] = useState<{ id: string; name: string; price: number; imageUrl: string; }[]>([]);
// // //   useEffect(() => {
// // //     const fetchItems = async () => {
// // //       const querySnapshot = await getDocs(collection(db, "marketplace"));
// // //       setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as { name: string; price: number; imageUrl: string }) })));
// // //     };
// // //     fetchItems();
// // //   }, []);

// // //   return (
// // //     <ScrollView style={styles.container}>
// // //       <Text style={styles.title}>Sustainable Marketplace</Text>
// // //       {items.map((item) => (
// // //         <View key={item.id} style={styles.card}>
// // //           <Text>{item.name} - {item.price} Points</Text>
// // //           <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />
// // //         </View>
// // //       ))}
// // //     </ScrollView>
// // //   );
// // // };

// // // const ImpactTrackerScreen: React.FC = () => {
// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.title}>Your Impact Tracker</Text>
// // //     </View>
// // //   );
// // // };

// // // const ProfileScreen: React.FC = () => {
// // //   const [profile, setProfile] = useState<{ displayName: string; bio: string; profilePic: string }>({ displayName: '', bio: '', profilePic: '' });
// // //   useEffect(() => {
// // //     const fetchProfile = async () => {
// // //       const user = auth.currentUser;
// // //       if (!user) return;
// // //       const userDoc = await getDoc(doc(db, "users", user.uid));
// // //       if (userDoc.exists()) {
// // //         setProfile(userDoc.data() as { displayName: string; bio: string; profilePic: string });
// // //       }
// // //     };
// // //     fetchProfile();
// // //   }, []);

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text>{profile.displayName}</Text>
// // //       <Image source={{ uri: profile.profilePic }} style={{ width: 100, height: 100, borderRadius: 50 }} />
// // //       <Text>{profile.bio}</Text>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, padding: 20 },
// // //   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
// // //   card: { backgroundColor: '#e0f7fa', padding: 15, marginVertical: 8, borderRadius: 10 },
// // //   button: { backgroundColor: '#0288d1', padding: 10, borderRadius: 5, marginTop: 10 },
// // //   buttonText: { color: '#fff', textAlign: 'center' },
// // //   receiptImage: { width: 200, height: 200, marginTop: 10 },
// // //   points: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
// // // });
// // // index.tsx

// // // index.tsx
// // import React, { useState, useEffect, createContext, useContext } from 'react';
// // import { Text, View, Button, TextInput, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, Switch, Alert } from 'react-native';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { Slot } from 'expo-router';
// // import * as ImagePicker from 'expo-image-picker';
// // import * as Notifications from 'expo-notifications';

// // // If TypeScript still complains about expo-notifications,
// // // create a file "expo-notifications.d.ts" in your project root with:
// // // declare module 'expo-notifications';

// // // Firebase v9 modular imports
// // import { initializeApp } from 'firebase/app';
// // import {
// //   getAuth,
// //   onAuthStateChanged,
// //   signInWithEmailAndPassword,
// //   createUserWithEmailAndPassword,
// //   signOut,
// // } from 'firebase/auth';
// // import {
// //   getFirestore,
// //   doc,
// //   setDoc,
// //   getDoc,
// //   collection,
// //   query,
// //   onSnapshot,
// //   orderBy,
// //   addDoc,
// //   serverTimestamp,
// //   updateDoc,
// //   increment,
// //   where,
// // } from 'firebase/firestore';
// // import {
// //   getStorage,
// //   ref,
// //   uploadBytes,
// //   getDownloadURL,
// // } from 'firebase/storage';

// // /* ===================== Firebase Configuration ===================== */
// // // Replace these values with your own Firebase project configuration
// // const firebaseConfig = {
// //   apiKey: "YOUR_API_KEY",
// //   authDomain: "your-project-id.firebaseapp.com",
// //   projectId: "your-project-id",
// //   storageBucket: "your-project-id.appspot.com",
// //   messagingSenderId: "your-messagingSenderId",
// //   appId: "your-app-id",
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);
// // const db   = getFirestore(app);
// // const storage = getStorage(app);

// // /* ===================== Auth Context & Provider ===================== */
// // interface UserProfile {
// //   name: string;
// //   email: string;
// //   points: number;
// //   badges?: string[];
// //   impact?: { carbon: number; water: number; waste: number };
// //   notifyChallenges?: boolean;
// //   expoPushToken?: string;
// // }

// // interface AuthContextType {
// //   user: any;
// //   profile: UserProfile | null;
// //   setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
// // }

// // const AuthContext = createContext<AuthContextType>({
// //   user: null,
// //   profile: null,
// //   setProfile: () => {},
// // });

// // const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// //   const [user, setUser] = useState<any>(null);
// //   const [profile, setProfile] = useState<UserProfile | null>(null);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, async (u) => {
// //       if (u) {
// //         setUser(u);
// //         const profileRef = doc(db, 'users', u.uid);
// //         const profileSnap = await getDoc(profileRef);
// //         if (profileSnap.exists()) {
// //           setProfile(profileSnap.data() as UserProfile);
// //         } else {
// //           setProfile(null);
// //         }
// //       } else {
// //         setUser(null);
// //         setProfile(null);
// //       }
// //     });
// //     return unsubscribe;
// //   }, []);

// //   return (
// //     <AuthContext.Provider value={{ user, profile, setProfile }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // /* ===================== Authentication Screens ===================== */
// // // --- Login Screen ---
// // function LoginScreen({ navigation }: NativeStackScreenProps<any>) {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');

// //   const handleLogin = () => {
// //     signInWithEmailAndPassword(auth, email, password).catch((err) =>
// //       Alert.alert('Login Error', err.message)
// //     );
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Login</Text>
// //       <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
// //       <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
// //       <Button title="Login" onPress={handleLogin} />
// //       <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
// //     </View>
// //   );
// // }

// // // --- Register Screen ---
// // function RegisterScreen({ navigation }: NativeStackScreenProps<any>) {
// //   const [name, setName] = useState('');
// //   const [email, setEmail]     = useState('');
// //   const [password, setPassword] = useState('');

// //   const handleRegister = async () => {
// //     try {
// //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// //       const user = userCredential.user;
// //       // Create Firestore user profile
// //       await setDoc(doc(db, 'users', user.uid), {
// //         name,
// //         email,
// //         points: 0,
// //         badges: [],
// //         impact: { carbon: 0, water: 0, waste: 0 },
// //         notifyChallenges: true,
// //         expoPushToken: '',
// //       });
// //     } catch (err: any) {
// //       Alert.alert('Registration Error', err.message);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Register</Text>
// //       <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
// //       <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
// //       <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
// //       <Button title="Register" onPress={handleRegister} />
// //       <Button title="Back to Login" onPress={() => navigation.goBack()} />
// //     </View>
// //   );
// // }

// // /* ===================== Main App Screens ===================== */
// // // --- Home Screen (Eco-Feed & Daily Challenge) ---
// // function HomeScreen({ navigation }: NativeStackScreenProps<any>) {
// //   const [feedItems, setFeedItems] = useState<any[]>([]);
// //   const [dailyChallenge, setDailyChallenge] = useState<any>(null);

// //   useEffect(() => {
// //     const unsubscribeFeed = onSnapshot(collection(db, 'feed'), (snapshot) => {
// //       const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// //       setFeedItems(items);
// //     });
// //     const challengeDoc = doc(db, 'dailyChallenges', 'current');
// //     const unsubscribeChallenge = onSnapshot(challengeDoc, (docSnap) => {
// //       if (docSnap.exists()) {
// //         setDailyChallenge(docSnap.data());
// //       }
// //     });
// //     return () => {
// //       unsubscribeFeed();
// //       unsubscribeChallenge();
// //     };
// //   }, []);

// //   return (
// //     <ScrollView style={styles.container}>
// //       {dailyChallenge && (
// //         <View style={styles.card}>
// //           <Text style={styles.title}>Today's Challenge</Text>
// //           <Text>{dailyChallenge.title}</Text>
// //           <Text>Earn {dailyChallenge.points} points</Text>
// //           <Button title="Complete Challenge" onPress={() => navigation.navigate('Challenge', { challenge: dailyChallenge })} />
// //         </View>
// //       )}
// //       <Text style={styles.title}>Eco-Feed</Text>
// //       {feedItems.map((item) => (
// //         <View key={item.id} style={styles.card}>
// //           <Text style={styles.cardTitle}>{item.title}</Text>
// //           <Text>{item.description}</Text>
// //         </View>
// //       ))}
// //     </ScrollView>
// //   );
// // }

// // // --- Challenge Screen (for completing a daily challenge) ---
// // function ChallengeScreen({ route, navigation }: NativeStackScreenProps<any>) {
// //   // Explicitly cast route.params to include the 'challenge' property
// //   const { challenge } = route.params as { challenge: any };
// //   const { user } = useContext(AuthContext);
// //   const [image, setImage] = useState<string | null>(null);
// //   const [uploading, setUploading] = useState(false);

// //   const pickImage = async () => {
// //     let result = await ImagePicker.launchCameraAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //       allowsEditing: true,
// //       quality: 0.8,
// //     });
// //     if (!result.canceled) {
// //       setImage(result.assets[0].uri);
// //     }
// //   };

// //   const handleSubmitChallenge = async () => {
// //     if (!image) {
// //       Alert.alert("Please take a photo as proof");
// //       return;
// //     }
// //     setUploading(true);
// //     try {
// //       // Convert image URI to blob
// //       const response = await fetch(image);
// //       const blob = await response.blob();
// //       const filename = `${Date.now()}_challenge.jpg`;
// //       const storageRef = ref(storage, `verifications/${user.uid}/${filename}`);
// //       await uploadBytes(storageRef, blob);
// //       const photoURL = await getDownloadURL(storageRef);
// //       // Record the action in Firestore
// //       await addDoc(collection(db, 'actions'), {
// //         userId: user.uid,
// //         description: challenge.title,
// //         pointsEarned: challenge.points,
// //         photoURL,
// //         verified: true,
// //         timestamp: serverTimestamp(),
// //       });
// //       // Update user's points
// //       await updateDoc(doc(db, 'users', user.uid), {
// //         points: increment(challenge.points),
// //       });
// //       Alert.alert("Success", "Challenge completed! Points awarded.");
// //       navigation.goBack();
// //     } catch (err: any) {
// //       Alert.alert("Error", err.message);
// //     }
// //     setUploading(false);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Complete Challenge</Text>
// //       <Text>{challenge.title}</Text>
// //       <Text>Earn {challenge.points} points</Text>
// //       <Button title="Take Photo" onPress={pickImage} />
// //       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginVertical: 10 }} />}
// //       {uploading ? <Text>Uploading...</Text> : <Button title="Submit Challenge" onPress={handleSubmitChallenge} />}
// //     </View>
// //   );
// // }

// // // --- Marketplace Screen ---
// // function MarketplaceScreen({ navigation }: NativeStackScreenProps<any>) {
// //   const [products, setProducts] = useState<any[]>([]);

// //   useEffect(() => {
// //     const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
// //       const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// //       setProducts(list);
// //     });
// //     return unsubscribe;
// //   }, []);

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Text style={styles.title}>Reward Marketplace</Text>
// //       {products.map((product) => (
// //         <TouchableOpacity key={product.id} style={styles.card} onPress={() => navigation.navigate('ProductDetails', { product })}>
// //           <Text style={styles.cardTitle}>{product.name}</Text>
// //           <Text>Cost: {product.pointsCost} points</Text>
// //         </TouchableOpacity>
// //       ))}
// //     </ScrollView>
// //   );
// // }

// // // --- Product Details Screen ---
// // function ProductDetailsScreen({ route, navigation }: NativeStackScreenProps<any>) {
// //   // Explicitly cast route.params to include the 'product' property
// //   const { product } = route.params as { product: any };
// //   const { user, profile } = useContext(AuthContext);

// //   const handleRedeem = async () => {
// //     if ((profile?.points || 0) < product.pointsCost) {
// //       Alert.alert("Insufficient Points", "You do not have enough points to redeem this item.");
// //       return;
// //     }
// //     try {
// //       await updateDoc(doc(db, 'users', user.uid), {
// //         points: increment(-product.pointsCost),
// //       });
// //       await addDoc(collection(db, 'redemptions'), {
// //         userId: user.uid,
// //         productId: product.id,
// //         pointsUsed: product.pointsCost,
// //         timestamp: serverTimestamp(),
// //       });
// //       Alert.alert("Success", "Redemption successful!");
// //       navigation.goBack();
// //     } catch (err: any) {
// //       Alert.alert("Error", err.message);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>{product.name}</Text>
// //       <Text>{product.description}</Text>
// //       <Text>Cost: {product.pointsCost} points</Text>
// //       <Button title="Redeem" onPress={handleRedeem} />
// //     </View>
// //   );
// // }

// // // --- Impact Screen ---
// // function ImpactScreen() {
// //   const { profile } = useContext(AuthContext);
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>My Impact</Text>
// //       {profile ? (
// //         <View>
// //           <Text>Carbon saved: {profile.impact?.carbon || 0} kg</Text>
// //           <Text>Water saved: {profile.impact?.water || 0} L</Text>
// //           <Text>Waste reduced: {profile.impact?.waste || 0} kg</Text>
// //           <Text>Total Points: {profile.points}</Text>
// //         </View>
// //       ) : (
// //         <Text>Loading...</Text>
// //       )}
// //     </View>
// //   );
// // }

// // // --- Profile Screen ---
// // function ProfileScreen() {
// //   const { user, profile } = useContext(AuthContext);
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Profile</Text>
// //       {profile ? (
// //         <View>
// //           <Text>Name: {profile.name}</Text>
// //           <Text>Email: {profile.email}</Text>
// //           <Text>Points: {profile.points}</Text>
// //         </View>
// //       ) : (
// //         <Text>Loading...</Text>
// //       )}
// //       <Button title="Logout" onPress={() => signOut(auth)} />
// //     </View>
// //   );
// // }

// // /* ===================== Navigation Setup ===================== */
// // const Stack = createNativeStackNavigator();
// // const Tab = createBottomTabNavigator();

// // // --- Auth Stack (Login/Register) ---
// // function AuthStack() {
// //   return (
// //     <Stack.Navigator>
// //       <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
// //       <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
// //     </Stack.Navigator>
// //   );
// // }

// // // --- Main Tab Navigator ---
// // function MainTabs() {
// //   return (
// //     <Tab.Navigator>
// //       <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
// //       <Tab.Screen name="Marketplace" component={MarketplaceScreen} options={{ headerShown: false }} />
// //       <Tab.Screen name="Impact" component={ImpactScreen} options={{ headerShown: false }} />
// //       <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
// //     </Tab.Navigator>
// //   );
// // }

// // // --- Root Navigator ---
// // function RootNavigator() {
// //   const { user } = useContext(AuthContext);
// //   return (
// //     <Stack.Navigator>
// //       {user ? (
// //         <>
// //           <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
// //           <Stack.Screen name="Challenge" component={ChallengeScreen} options={{ title: 'Challenge' }} />
// //           <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
// //         </>
// //       ) : (
// //         <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
// //       )}
// //     </Stack.Navigator>
// //   );
// // }

// // /* ===================== App Component ===================== */
// // const App = () => {
// //   // Request notification permissions and get push token (simplified)
// //   useEffect(() => {
// //     (async () => {
// //       const { status } = await Notifications.requestPermissionsAsync();
// //       if (status === 'granted') {
// //         const tokenResponse = await Notifications.getExpoPushTokenAsync();
// //         // In a full implementation, save token to Firestore for the current user
// //         console.log('Expo Push Token:', tokenResponse.data);
// //       }
// //     })();
// //   }, []);

// // return  <Slot />;
// // };

// // export default App;

// // /* ===================== Styles ===================== */
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: '#f0f9f0',
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     padding: 10,
// //     marginVertical: 8,
// //     borderRadius: 4,
// //     backgroundColor: '#fff',
// //   },
// //   title: {
// //     fontSize: 24,
// //     marginVertical: 10,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// //   card: {
// //     backgroundColor: '#fff',
// //     padding: 15,
// //     marginVertical: 8,
// //     borderRadius: 6,
// //     elevation: 2,
// //   },
// //   cardTitle: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //   },
// // });
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Platform,
//   StatusBar,
//   FlatList,
//   Alert,
//   useWindowDimensions,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useRouter } from "expo-router";
// import * as Haptics from "expo-haptics";

// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import { Colors } from "@/constants/Colors";

// // Firebase imports
// import { initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   collection,
//   doc,
//   getDoc,
//   setDoc,
//   updateDoc,
//   onSnapshot,
//   query,
//   orderBy,
//   limit,
//   serverTimestamp,
//   increment,
// } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// // Initialize Firebase (using placeholder config - replace with your actual config)
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT.appspot.com",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

// // Initialize Firebase app if it hasn't been initialized yet
// let app;
// try {
//   app = initializeApp(firebaseConfig);
// } catch (error) {
//   // App already initialized
//   app = initializeApp(firebaseConfig, "eco-app");
// }

// const db = getFirestore(app);
// const auth = getAuth(app);

// export default function HomeScreen() {
//   const colorScheme = useColorScheme();
//   const insets = useSafeAreaInsets();
//   const router = useRouter();
//   const { width } = useWindowDimensions();

//   // State variables
//   const [loading, setLoading] = useState(true);
//   const [userData, setUserData] = useState({
//     name: "Guest",
//     points: 0,
//   });
//   const [showNotification, setShowNotification] = useState(true);
//   const [bestSellers, setBestSellers] = useState([
//     {
//       id: "1",
//       name: "Soft Jacket",
//       points: 250,
//       image:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/8e55h9f9i9i7i4g9h9h6f9d5i9i4i7h9i7i4g9h9h6f9d5i9i4i7h9?placeholderIfAbsent=true",
//       isFavorite: false,
//     },
//     {
//       id: "2",
//       name: "Organic cotton pants",
//       points: 400,
//       image:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/5b22e8c8f8f4f1d8e8e3c8a2f6f1f4e3f8f4f1d8e8e3c8a2f6f1f4e3?placeholderIfAbsent=true",
//       isFavorite: false,
//     },
//     {
//       id: "3",
//       name: "Eco Backpack",
//       points: 320,
//       image:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/6c33f9d9g9g5g2e9f9f4d9b3g7g2g5f9g5g2e9f9f4d9b3g7g2g5f9?placeholderIfAbsent=true",
//       isFavorite: true,
//     },
//     {
//       id: "4",
//       name: "Bamboo Toothbrush",
//       points: 150,
//       image:
//         "https://cdn.builder.io/api/v1/image/assets/TEMP/7d44g8e8h8h6h3f8g8g5e8c4h8h3h6g8h6h3f8g8g5e8c4h8h3h6g8?placeholderIfAbsent=true",
//       isFavorite: false,
//     },
//   ]);

//   const [dailyChallenges, setDailyChallenges] = useState([
//     {
//       id: "1",
//       title: "Use a reusable water bottle",
//       description: "Avoid single-use plastics today!",
//       points: 50,
//       icon: "drop.fill",
//       completed: false,
//     },
//     {
//       id: "2",
//       title: "Walk or bike instead of driving",
//       description: "Reduce your carbon footprint",
//       points: 75,
//       icon: "figure.walk",
//       completed: false,
//     },
//     {
//       id: "3",
//       title: "Eat a plant-based meal",
//       description: "Reduce your environmental impact",
//       points: 60,
//       icon: "leaf.fill",
//       completed: false,
//     },
//   ]);

//   const [currentChallenge, setCurrentChallenge] = useState(dailyChallenges[0]);

//   // Fetch user data from Firebase
//   useEffect(() => {
//     const user = auth.currentUser;
//     if (!user) {
//       setLoading(false);
//       return;
//     }

//     const userRef = doc(db, "users", user.uid);
//     const unsubscribe = onSnapshot(userRef, (docSnap) => {
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         setUserData({
//           name: data.name || "User",
//           points: data.points || 0,
//         });
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Fetch products from Firebase
//   useEffect(() => {
//     const productsRef = collection(db, "products");
//     const q = query(productsRef, orderBy("popularity", "desc"), limit(4));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const productsData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         name: doc.data().name,
//         points: doc.data().pointsCost,
//         image:
//           doc.data().imageUrl ||
//           "https://cdn.builder.io/api/v1/image/assets/TEMP/8e55h9f9i9i7i4g9h9h6f9d5i9i4i7h9i7i4g9h9h6f9d5i9i4i7h9?placeholderIfAbsent=true",
//         isFavorite: false,
//       }));

//       if (productsData.length > 0) {
//         setBestSellers(productsData);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Fetch challenges from Firebase
//   useEffect(() => {
//     const challengesRef = collection(db, "challenges");
//     const q = query(challengesRef, orderBy("createdAt", "desc"), limit(3));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const challengesData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         title: doc.data().title,
//         description: doc.data().description,
//         points: doc.data().points,
//         icon: doc.data().icon || "leaf.fill",
//         completed: false,
//       }));

//       if (challengesData.length > 0) {
//         setDailyChallenges(challengesData);
//         setCurrentChallenge(challengesData[0]);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Handle toggling favorite status
//   const toggleFavorite = useCallback((id) => {
//     if (Platform.OS === "ios") {
//       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     }

//     setBestSellers((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === id
//           ? { ...product, isFavorite: !product.isFavorite }
//           : product,
//       ),
//     );

//     // In a real app, you would update this in Firebase
//     const user = auth.currentUser;
//     if (user) {
//       const userFavoritesRef = doc(db, "userFavorites", user.uid);
//       // This is simplified - in a real app you'd check if the document exists first
//       updateDoc(userFavoritesRef, {
//         [`products.${id}`]: true,
//         updatedAt: serverTimestamp(),
//       }).catch((error) => {
//         // If document doesn't exist, create it
//         setDoc(userFavoritesRef, {
//           [`products.${id}`]: true,
//           updatedAt: serverTimestamp(),
//         });
//       });
//     }
//   }, []);

//   // Handle adding to cart
//   const addToCart = useCallback((product) => {
//     if (Platform.OS === "ios") {
//       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//     }

//     Alert.alert("Add to Cart", `Add ${product.name} to your cart?`, [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Add",
//         onPress: () => {
//           // In a real app, you would update the cart in Firebase
//           Alert.alert("Success", `${product.name} added to cart!`);
//         },
//       },
//     ]);
//   }, []);

//   // Handle starting a challenge
//   const startChallenge = useCallback(
//     (challenge) => {
//       if (Platform.OS === "ios") {
//         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//       }

//       Alert.alert(
//         "Start Challenge",
//         `Start the "${challenge.title}" challenge?`,
//         [
//           {
//             text: "Cancel",
//             style: "cancel",
//           },
//           {
//             text: "Start",
//             onPress: () => {
//               // Navigate to challenge screen
//               router.push({
//                 pathname: "/impact",
//                 params: { challengeId: challenge.id },
//               });
//             },
//           },
//         ],
//       );
//     },
//     [router],
//   );

//   // Handle navigation to all products
//   const navigateToAllProducts = useCallback(() => {
//     if (Platform.OS === "ios") {
//       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     }
//     router.push("/explore");
//   }, [router]);

//   // Handle navigation to eco items
//   const navigateToEcoItems = useCallback(() => {
//     if (Platform.OS === "ios") {
//       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     }
//     router.push("/explore");
//   }, [router]);

//   // Render product item
//   const renderProductItem = useCallback(
//     ({ item }) => (
//       <ThemedView
//         style={[
//           styles.productCard,
//           { backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "#f5f5f5" },
//         ]}
//       >
//         <View style={styles.actionButtons}>
//           <TouchableOpacity
//             style={[
//               styles.actionButton,
//               { backgroundColor: colorScheme === "dark" ? "#444" : "#fff" },
//             ]}
//             onPress={() => addToCart(item)}
//             activeOpacity={0.7}
//           >
//             <IconSymbol
//               name="cart.fill"
//               size={16}
//               color={colorScheme === "dark" ? "#fff" : Colors.light.tint}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.actionButton,
//               { backgroundColor: colorScheme === "dark" ? "#444" : "#fff" },
//             ]}
//             onPress={() => toggleFavorite(item.id)}
//             activeOpacity={0.7}
//           >
//             <IconSymbol
//               name={item.isFavorite ? "heart.fill" : "heart"}
//               size={16}
//               color={
//                 item.isFavorite
//                   ? "#ff3b30"
//                   : colorScheme === "dark"
//                     ? "#fff"
//                     : "#666"
//               }
//             />
//           </TouchableOpacity>
//         </View>

//         <Image
//           source={{ uri: item.image }}
//           style={styles.productImage}
//           resizeMode="cover"
//         />

//         <ThemedText style={styles.productPoints}>{item.points} pts</ThemedText>

//         <ThemedText
//           style={styles.productName}
//           lightColor="#666"
//           darkColor="#aaa"
//         >
//           {item.name}
//         </ThemedText>
//       </ThemedView>
//     ),
//     [colorScheme, addToCart, toggleFavorite],
//   );

//   return (
//     <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
//       <StatusBar
//         barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
//       />

//       {/* Header */}
//       <View style={styles.header}>
//         <ThemedText style={styles.headerTime}>
//           {new Date().getHours().toString().padStart(2, "0")}:
//           {new Date().getMinutes().toString().padStart(2, "0")}
//         </ThemedText>
//         <View style={styles.headerIcons}>
//           <IconSymbol
//             name="wifi"
//             size={16}
//             color={colorScheme === "dark" ? "#fff" : "#000"}
//           />
//           <IconSymbol
//             name="battery.100"
//             size={16}
//             color={colorScheme === "dark" ? "#fff" : "#000"}
//           />
//           <IconSymbol
//             name="antenna.radiowaves.left.and.right"
//             size={16}
//             color={colorScheme === "dark" ? "#fff" : "#000"}
//           />
//         </View>
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={[
//           styles.scrollContent,
//           { paddingBottom: insets.bottom + 80 },
//         ]}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Best Sellers Section */}
//         <View style={styles.sectionHeader}>
//           <ThemedText style={styles.sectionTitle}>Best Seller</ThemedText>
//           <TouchableOpacity onPress={navigateToAllProducts} activeOpacity={0.7}>
//             <ThemedText
//               style={styles.viewAll}
//               lightColor="#666"
//               darkColor="#aaa"
//             >
//               view all
//             </ThemedText>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={bestSellers}
//           renderItem={renderProductItem}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.productGrid}
//           ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
//         />

//         {/* Notification Banner */}
//         {showNotification && (
//           <ThemedView
//             style={[
//               styles.notificationBanner,
//               {
//                 backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "#f5f5f5",
//               },
//             ]}
//           >
//             <View style={styles.notificationContent}>
//               <IconSymbol
//                 name="checkmark.circle.fill"
//                 size={24}
//                 color="#4CAF50"
//               />
//               <View style={styles.notificationText}>
//                 <ThemedText style={styles.notificationTitle}>
//                   Great job!
//                 </ThemedText>
//                 <ThemedText style={styles.notificationPoints}>
//                   +50 points!
//                 </ThemedText>
//               </View>
//             </View>
//             <TouchableOpacity
//               onPress={() => setShowNotification(false)}
//               hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
//             >
//               <ThemedText
//                 style={styles.closeButton}
//                 lightColor="#666"
//                 darkColor="#aaa"
//               >
//                 ×
//               </ThemedText>
//             </TouchableOpacity>
//           </ThemedView>
//         )}

//         {/* Eco Button */}
//         <TouchableOpacity
//           style={[
//             styles.ecoButton,
//             {
//               backgroundColor:
//                 colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
//             },
//           ]}
//           onPress={navigateToEcoItems}
//           activeOpacity={0.8}
//         >
//           <ThemedText style={styles.ecoButtonText}>Browse eco-items</ThemedText>
//         </TouchableOpacity>

//         {/* Challenges Section */}
//         <View style={styles.challengesSection}>
//           <ThemedText style={styles.challengesSectionTitle}>
//             Daily Challenges
//           </ThemedText>

//           <ThemedView
//             style={[
//               styles.challengeCard,
//               {
//                 backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "#f5f5f5",
//               },
//             ]}
//           >
//             <View
//               style={[
//                 styles.challengeIcon,
//                 {
//                   backgroundColor:
//                     colorScheme === "dark"
//                       ? Colors.dark.tint
//                       : Colors.light.tint,
//                 },
//               ]}
//             >
//               <IconSymbol name={currentChallenge.icon} size={20} color="#fff" />
//             </View>

//             <View style={styles.challengeContent}>
//               <ThemedText style={styles.challengeTitle}>
//                 {currentChallenge.title}
//               </ThemedText>
//               <ThemedText
//                 style={styles.challengeSubtext}
//                 lightColor="#666"
//                 darkColor="#aaa"
//               >
//                 {currentChallenge.description}
//               </ThemedText>
//             </View>

//             <View style={styles.pointsBadge}>
//               <ThemedText style={styles.pointsBadgeText}>
//                 +{currentChallenge.points} pts
//               </ThemedText>
//             </View>
//           </ThemedView>

//           <TouchableOpacity
//             style={[
//               styles.startChallengeButton,
//               {
//                 backgroundColor:
//                   colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
//               },
//             ]}
//             onPress={() => startChallenge(currentChallenge)}
//             activeOpacity={0.8}
//           >
//             <ThemedText style={styles.startChallengeButtonText}>
//               Start Challenge
//             </ThemedText>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 20,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     alignItems: "center",
//   },
//   headerTime: {
//     fontWeight: "500",
//   },
//   headerIcons: {
//     flexDirection: "row",
//     gap: 5,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   viewAll: {
//     fontSize: 14,
//   },
//   productGrid: {
//     paddingBottom: 10,
//   },
//   productCard: {
//     borderRadius: 12,
//     padding: 15,
//     width: 160,
//     height: 200,
//     position: "relative",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   actionButtons: {
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 10,
//   },
//   actionButton: {
//     borderRadius: 50,
//     width: 32,
//     height: 32,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   productImage: {
//     width: 130,
//     height: 100,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   productPoints: {
//     fontWeight: "500",
//     marginBottom: 5,
//   },
//   productName: {
//     fontSize: 14,
//   },
//   notificationBanner: {
//     borderRadius: 12,
//     padding: 15,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   notificationContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   notificationText: {
//     justifyContent: "center",
//   },
//   notificationTitle: {
//     fontWeight: "500",
//   },
//   notificationPoints: {
//     fontSize: 14,
//   },
//   closeButton: {
//     fontSize: 20,
//   },
//   ecoButton: {
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   ecoButtonText: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "500",
//   },
//   challengesSection: {
//     marginTop: 10,
//   },
//   challengesSectionTitle: {
//     fontWeight: "600",
//     marginBottom: 15,
//     fontSize: 18,
//   },
//   challengeCard: {
//     borderRadius: 12,
//     padding: 15,
//     flexDirection: "row",
//     alignItems: "center",
//     position: "relative",
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   challengeIcon: {
//     borderRadius: 50,
//     width: 40,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 15,
//   },
//   challengeContent: {
//     flex: 1,
//   },
//   challengeTitle: {
//     fontWeight: "500",
//     marginBottom: 5,
//   },
//   challengeSubtext: {
//     fontSize: 14,
//   },
//   pointsBadge: {
//     position: "absolute",
//     right: 15,
//     top: 15,
//   },
//   pointsBadgeText: {
//     fontWeight: "500",
//   },
//   startChallengeButton: {
//     padding: 15,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   startChallengeButtonText: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "500",
//   },
// });
// index.tsx

// index.tsx

import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from "react";
import {
  Alert,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import * as Haptics from "expo-haptics";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/* ----------------------------------------------
   Minimal color constants (customize as needed)
   ---------------------------------------------- */
const Colors = {
  light: {
    text: "#000",
    background: "#fff",
    tint: "#0288d1",
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: "#0288d1",
  },
};

const { width, height } = Dimensions.get("window");

/* ------------------------------------------------------------------
   Firebase v9 modular imports
   ------------------------------------------------------------------ */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  updateDoc,
  increment,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// ----------- REPLACE THESE WITH YOUR REAL FIREBASE CONFIG --------------
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
// ------------------------------------------------------------------------

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.log("Firebase already initialized or error: ", error);
  app = initializeApp(firebaseConfig, "my-app");
}
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* ------------------------------------------------------------------
   Auth Context & Provider
   ------------------------------------------------------------------ */
interface UserProfile {
  name: string;
  email: string;
  points: number;
  badges?: string[];
  impact?: { carbon: number; water: number; waste: number };
  notifyChallenges?: boolean;
  expoPushToken?: string;
}

interface AuthContextType {
  user: any;
  profile: UserProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  setProfile: () => {},
});

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const profileRef = doc(db, "users", u.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          setProfile(profileSnap.data() as UserProfile);
        } else {
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ------------------------------------------------------------------
   Auth Screens (Login & Register)
   ------------------------------------------------------------------ */
function LoginScreen({ navigation }: NativeStackScreenProps<any>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      Alert.alert("Login Error", err.message)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
        <Text style={styles.authButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.authButton, { backgroundColor: "#888" }]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.authButtonText}>Go to Register</Text>
      </TouchableOpacity>
    </View>
  );
}

function RegisterScreen({ navigation }: NativeStackScreenProps<any>) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Create Firestore user profile
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        points: 0,
        badges: [],
        impact: { carbon: 0, water: 0, waste: 0 },
        notifyChallenges: true,
        expoPushToken: "",
      });
      Alert.alert("Success", "Registration completed!");
    } catch (err: any) {
      Alert.alert("Registration Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Register</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.authButton} onPress={handleRegister}>
        <Text style={styles.authButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.authButton, { backgroundColor: "#888" }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.authButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ------------------------------------------------------------------
   Home Screen
   ------------------------------------------------------------------ */
function HomeScreen({ navigation }: NativeStackScreenProps<any>) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ name: "Guest", points: 0 });
  const [showNotification, setShowNotification] = useState(true);
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<any>(null);

  useEffect(() => {
    // Example data
    setBestSellers([
      {
        id: "1",
        name: "Soft Jacket",
        points: 250,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/8e55h9f9i9i7i4g9h9h6f9d5i9i4i7h9i7i4g9h9h6f9d5i9i4i7h9",
        isFavorite: false,
      },
      {
        id: "2",
        name: "Organic cotton pants",
        points: 400,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/5b22e8c8f8f4f1d8e8e3c8a2f6f1f4e3f8f4f1d8e8e3c8a2f6f1f4e3",
        isFavorite: false,
      },
    ]);
    setCurrentChallenge({
      id: "1",
      title: "Use a reusable water bottle",
      description: "Avoid single-use plastics today!",
      points: 50,
    });

    // Mock user data
    setTimeout(() => {
      setUserData({ name: "Alex", points: 1250 });
      setLoading(false);
    }, 1000);
  }, []);

  const toggleFavorite = (id: string) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setBestSellers((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const addToCart = (product: any) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    Alert.alert("Add to Cart", `Add ${product.name} to your cart?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Add",
        onPress: () => {
          Alert.alert("Success", `${product.name} added to cart!`);
        },
      },
    ]);
  };

  const startChallenge = (challenge: any) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    navigation.navigate("Challenge", { challenge });
  };

  if (loading) {
    return (
      <View style={styles.centeredScreen}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
        <Text style={{ marginTop: 10 }}>Loading Home...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.homeContainer, { paddingTop: insets.top }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="auto" />
      {showNotification && (
        <View style={styles.notificationBanner}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <View style={{ marginLeft: 8 }}>
              <Text style={{ fontWeight: "500" }}>Great job!</Text>
              <Text>+50 points!</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setShowNotification(false)}>
            <Text style={{ fontSize: 20 }}>×</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentChallenge && (
        <View style={styles.card}>
          <Text style={styles.screenTitle}>Today's Challenge</Text>
          <Text>{currentChallenge.title}</Text>
          <Text>Earn {currentChallenge.points} points</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => startChallenge(currentChallenge)}
          >
            <Text style={styles.buttonText}>Complete Challenge</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={[styles.screenTitle, { marginTop: 20 }]}>Best Sellers</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {bestSellers.map((item) => (
          <View key={item.id} style={styles.productCard}>
            {/* Row with cart & heart */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={styles.circleButton}
                onPress={() => addToCart(item)}
              >
                <Ionicons name="cart" size={18} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.circleButton}
                onPress={() => toggleFavorite(item.id)}
              >
                <Ionicons
                  name={item.isFavorite ? "heart" : "heart-outline"}
                  size={18}
                  color={item.isFavorite ? "#f55" : "#666"}
                />
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 80, marginVertical: 10 }}
            />
            <Text style={styles.productPoints}>{item.points} pts</Text>
            <Text style={{ fontSize: 14 }}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

/* ------------------------------------------------------------------
   Challenge Screen
   ------------------------------------------------------------------ */
function ChallengeScreen({ route, navigation }: NativeStackScreenProps<any>) {
  const { challenge } = route.params || {};
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmitChallenge = async () => {
    if (!challenge) {
      Alert.alert("Error", "No challenge data found");
      return;
    }
    if (!image) {
      Alert.alert("Please take a photo as proof");
      return;
    }
    if (!user) {
      Alert.alert("Error", "No user found");
      return;
    }
    setUploading(true);
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const filename = `${Date.now()}_challenge.jpg`;
      const storageRef = ref(storage, `verifications/${user.uid}/${filename}`);
      await uploadBytes(storageRef, blob);
      const photoURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "actions"), {
        userId: user.uid,
        description: challenge.title,
        pointsEarned: challenge.points,
        photoURL,
        verified: true,
        timestamp: serverTimestamp(),
      });
      await updateDoc(doc(db, "users", user.uid), {
        points: increment(challenge.points),
      });
      Alert.alert("Success", "Challenge completed! Points awarded.");
      navigation.goBack();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
    setUploading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Complete Challenge</Text>
      {challenge && (
        <>
          <Text style={{ marginVertical: 5 }}>{challenge.title}</Text>
          <Text>Earn {challenge.points} points</Text>
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginVertical: 10 }}
        />
      )}
      {uploading ? (
        <Text>Uploading...</Text>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmitChallenge}>
          <Text style={styles.buttonText}>Submit Challenge</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* ------------------------------------------------------------------
   Eco-Points Screen
   ------------------------------------------------------------------ */
function EcoPointsScreen() {
  const [points, setPoints] = useState<number>(100);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
      setPoints((prev) => prev + 50);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Your Eco-Points</Text>
      <Text style={styles.points}>{points} Points</Text>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Proof (Receipt, Image)</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.receiptImage} />}
    </View>
  );
}

/* ------------------------------------------------------------------
   Marketplace Screen
   ------------------------------------------------------------------ */
function MarketplaceScreen({ navigation }: NativeStackScreenProps<any>) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Suppose we have a "products" collection in Firestore
    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy("popularity", "desc"), limit(8));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        pointsCost: doc.data().pointsCost,
        imageUrl: doc.data().imageUrl,
        description: doc.data().description ?? "",
      }));
      setProducts(list);
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Reward Marketplace</Text>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.card}
          onPress={() => navigation.navigate("ProductDetails", { product })}
        >
          <Text style={styles.cardTitle}>
            {product.name} - {product.pointsCost} pts
          </Text>
          {product.imageUrl ? (
            <Image
              source={{ uri: product.imageUrl }}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <View style={styles.fallbackImg} />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function ProductDetailsScreen({ route, navigation }: NativeStackScreenProps<any>) {
  const { user, profile } = useContext(AuthContext);
  const { product } = route.params || {};

  const handleRedeem = async () => {
    if (!product) {
      Alert.alert("Error", "No product data found");
      return;
    }
    if (!profile || (profile.points || 0) < product.pointsCost) {
      Alert.alert(
        "Insufficient Points",
        "You do not have enough points to redeem this item."
      );
      return;
    }
    try {
      await updateDoc(doc(db, "users", user.uid), {
        points: increment(-product.pointsCost),
      });
      await addDoc(collection(db, "redemptions"), {
        userId: user.uid,
        productId: product.id,
        pointsUsed: product.pointsCost,
        timestamp: serverTimestamp(),
      });
      Alert.alert("Success", "Redemption successful!");
      navigation.goBack();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  if (!product) {
    return (
      <View style={styles.centeredScreen}>
        <Text>No product data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>Cost: {product.pointsCost} points</Text>
      <TouchableOpacity style={styles.button} onPress={handleRedeem}>
        <Text style={styles.buttonText}>Redeem</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ------------------------------------------------------------------
   Impact Screen
   ------------------------------------------------------------------ */
function ImpactScreen() {
  const [loading, setLoading] = useState(true);
  const [impactData, setImpactData] = useState<any>({
    co2Saved: 0,
    plasticsAvoided: 0,
    ecoLevel: 1,
    weeklyData: [
      { day: "MON", value: 30 },
      { day: "TUE", value: 50 },
      { day: "WED", value: 35 },
      { day: "THU", value: 25 },
      { day: "FRI", value: 60 },
    ],
    totalWeeklyCO2: 500,
    goals: [],
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }
    const userImpactRef = doc(db, "userImpact", user.uid);
    const unsubscribe = onSnapshot(userImpactRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setImpactData({
          co2Saved: data.co2Saved || 0,
          plasticsAvoided: data.plasticsAvoided || 0,
          ecoLevel: data.ecoLevel || 1,
          weeklyData: data.weeklyData || impactData.weeklyData,
          totalWeeklyCO2: data.totalWeeklyCO2 || 500,
          goals: data.goals || [],
        });
      } else {
        // If doc not exist, create it
        setDoc(userImpactRef, {
          co2Saved: 15,
          plasticsAvoided: 20,
          ecoLevel: 3,
          weeklyData: impactData.weeklyData,
          totalWeeklyCO2: 500,
          goals: [],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddNewGoal = () => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    Alert.prompt(
      "Add New Goal",
      "What environmental goal would you like to set?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Add",
          onPress: async (goalText) => {
            if (!goalText || goalText.trim() === "") return;
            const user = auth.currentUser;
            if (!user) return;
            const userImpactRef = doc(db, "userImpact", user.uid);
            const newGoal = {
              id: Date.now().toString(),
              text: goalText.trim(),
              completed: false,
              createdAt: new Date().toISOString(),
            };
            try {
              await updateDoc(userImpactRef, {
                goals: [...impactData.goals, newGoal],
                updatedAt: serverTimestamp(),
              });
            } catch (error) {
              Alert.alert("Error", "Failed to add goal. Please try again.");
            }
          },
        },
      ],
      "plain-text"
    );
  };

  const handleCompleteGoal = async (goalId: string) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const user = auth.currentUser;
    if (!user) return;
    const userImpactRef = doc(db, "userImpact", user.uid);
    const updatedGoals = impactData.goals.map((g: any) =>
      g.id === goalId ? { ...g, completed: !g.completed } : g
    );
    try {
      await updateDoc(userImpactRef, {
        goals: updatedGoals,
        updatedAt: serverTimestamp(),
        co2Saved: increment(5),
        plasticsAvoided: increment(2),
      });
    } catch (error) {
      Alert.alert("Error", "Failed to update goal. Please try again.");
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const user = auth.currentUser;
          if (!user) return;
          const userImpactRef = doc(db, "userImpact", user.uid);
          const updatedGoals = impactData.goals.filter(
            (g: any) => g.id !== goalId
          );
          try {
            await updateDoc(userImpactRef, {
              goals: updatedGoals,
              updatedAt: serverTimestamp(),
            });
          } catch (err) {
            Alert.alert("Error", "Failed to delete goal. Please try again.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centeredScreen}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
        <Text style={{ marginTop: 10 }}>Loading Impact Data ...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.screenTitle}>Impact Tracker</Text>
      {/* Stats */}
      <View style={styles.statsContainerRow}>
        <View style={styles.statCard}>
          <Ionicons name="leaf" size={24} color="#4CAF50" />
          <Text style={styles.statLabel}>CO₂ Saved</Text>
          <Text style={styles.statValue}>{impactData.co2Saved} kg</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="trash" size={24} color="#4CAF50" />
          <Text style={styles.statLabel}>Plastics Avoided</Text>
          <Text style={styles.statValue}>{impactData.plasticsAvoided}</Text>
        </View>
      </View>

      {/* Eco Level */}
      <Text style={styles.sectionLabel}>Eco Level</Text>
      <View style={styles.levelIndicators}>
        {[1, 2, 3, 4, 5].map((lvl) => (
          <View
            key={`level-${lvl}`}
            style={[
              styles.levelDot,
              lvl <= impactData.ecoLevel
                ? { backgroundColor: "#4CAF50" }
                : { backgroundColor: "#e0e0e0" },
            ]}
          />
        ))}
      </View>

      {/* Weekly Summary */}
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>This Week's Highlight</Text>
        <View style={styles.chartContainer}>
          <View style={styles.chartBars}>
            {impactData.weeklyData.map((item: any, idx: number) => (
              <View key={idx} style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    { height: `${item.value}%`, backgroundColor: "#4CAF50" },
                  ]}
                />
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.chartCaption}>
            {impactData.totalWeeklyCO2} kg CO₂ saved globally this week!
          </Text>
        </View>
      </View>

      {/* Goals */}
      <View style={{ marginTop: 20 }}>
        <View style={styles.goalsHeaderRow}>
          <Text style={styles.sectionLabel}>Your Goals</Text>
          <TouchableOpacity style={styles.newGoalBtn} onPress={handleAddNewGoal}>
            <Text style={{ color: "#fff" }}>+ New Goal</Text>
          </TouchableOpacity>
        </View>

        {impactData.goals && impactData.goals.length > 0 ? (
          impactData.goals.map((goal: any) => (
            <View key={goal.id} style={styles.goalItem}>
              <TouchableOpacity
                onPress={() => handleCompleteGoal(goal.id)}
                style={{ marginRight: 8 }}
              >
                <View
                  style={[
                    styles.checkbox,
                    goal.completed
                      ? { backgroundColor: "#4CAF50", borderColor: "#4CAF50" }
                      : {},
                  ]}
                >
                  {goal.completed && (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  )}
                </View>
              </TouchableOpacity>
              <Text
                style={[
                  styles.goalText,
                  goal.completed && styles.goalTextCompleted,
                ]}
              >
                {goal.text}
              </Text>
              <TouchableOpacity
                style={{ marginLeft: "auto" }}
                onPress={() => handleDeleteGoal(goal.id)}
              >
                <Ionicons name="trash" size={18} color="#888" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={[styles.card, { alignItems: "center" }]}>
            <Text style={{ color: "#888" }}>
              No goals yet. Tap +New Goal to add one!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

/* ------------------------------------------------------------------
   Profile Screen
   ------------------------------------------------------------------ */
function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [badges, setBadges] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>({
    name: "Alex Green",
    username: "@ecoalex",
    points: 1250,
    level: 8,
    joinDate: "March 2023",
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8e55h9f9i9i7i4g9h9h6f9d5i9i4i7h9i7i4g9h9h6f9d5i9i4i7h9",
  });

  useEffect(() => {
    setBadges([
      {
        id: 1,
        name: "Eco Warrior",
        description: "Completed 5 eco-friendly challenges",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a11d9b7e7e3f0c7d9d2b9a1e5e0f3d2e7e3f0c7d9d2b9a1e5e0f3d2",
        progress: 100,
        dateEarned: "2023-06-15",
      },
      {
        id: 2,
        name: "Water Saver",
        description: "Reduced water usage by 20%",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b22e8c8f8f4f1d8e8e3c8a2f6f1f4e3f8f4f1d8e8e3c8a2f6f1f4e3",
        progress: 100,
        dateEarned: "2023-07-22",
      },
    ]);
  }, []);

  const handleBadgePress = (badge: any) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedBadge(badge);
    setModalVisible(true);
  };

  const handleEditProfile = () => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    Alert.alert("Edit Profile", "This would open the profile editor");
  };

  const handleSettings = () => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert("Settings", "This would open the settings screen");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View style={styles.headerRow}>
          <Text style={styles.screenTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
            <Ionicons name="settings" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeaderRow}>
            <Image source={{ uri: userData.avatar }} style={styles.profileAvatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userHandle}>{userData.username}</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{userData.points}</Text>
                  <Text style={styles.statLabel}>Points</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{userData.level}</Text>
                  <Text style={styles.statLabel}>Level</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
            activeOpacity={0.8}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>
          Badges & Achievements
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10 }}
        >
          {badges.map((badge) => (
            <TouchableOpacity
              key={badge.id}
              style={[styles.badgeItem, { opacity: badge.progress > 0 ? 1 : 0.6 }]}
              onPress={() => handleBadgePress(badge)}
              activeOpacity={0.9}
            >
              <View style={styles.badgeIconContainer}>
                <Image source={{ uri: badge.icon }} style={styles.badgeIcon} />
                {badge.progress < 100 && (
                  <View style={styles.progressRing}>
                    <View
                      style={[styles.progressFill, { width: `${badge.progress}%` }]}
                    />
                  </View>
                )}
              </View>
              <Text style={styles.badgeName}>{badge.name}</Text>
              <Text numberOfLines={2} style={styles.badgeDescription}>
                {badge.description}
              </Text>
              {badge.dateEarned && (
                <View style={styles.earnedBadge}>
                  <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
                  <Text style={styles.earnedText}>Earned</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Recent Activity</Text>
        <View style={styles.activityContainer}>
          {[1, 2].map((item) => (
            <View key={item} style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Ionicons
                  name={item === 1 ? "leaf" : "water"}
                  size={20}
                  color="#4CAF50"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.activityTitle}>
                  {item === 1
                    ? "Completed Plant a Tree Challenge"
                    : "Saved 5 gallons of water"}
                </Text>
                <Text style={styles.activityDate}>
                  {item === 1 ? "2 days ago" : "1 week ago"}
                </Text>
              </View>
              <Text style={styles.activityPoints}>
                +{item === 1 ? "50" : "30"}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Badge Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedBadge && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedBadge.name}</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close-circle" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBadgeContainer}>
                  <Image
                    source={{ uri: selectedBadge.icon }}
                    style={styles.modalBadgeIcon}
                  />
                </View>

                <Text style={styles.modalDescription}>
                  {selectedBadge.description}
                </Text>

                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>
                    Progress: {selectedBadge.progress}%
                  </Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${selectedBadge.progress}%` },
                      ]}
                    />
                  </View>
                </View>

                {selectedBadge.dateEarned ? (
                  <Text style={styles.earnedDate}>
                    Earned on:{" "}
                    {new Date(selectedBadge.dateEarned).toLocaleDateString()}
                  </Text>
                ) : (
                  <Text style={styles.notEarnedText}>
                    Keep going to earn this badge!
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    setModalVisible(false);
                    Alert.alert(
                      "Badge Details",
                      `More about the "${selectedBadge.name}" badge...`
                    );
                  }}
                >
                  <Text style={styles.actionButtonText}>
                    {selectedBadge.progress < 100
                      ? "See How to Earn"
                      : "Share Achievement"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ------------------------------------------------------------------
   Shorts Screen (Optional)
   ------------------------------------------------------------------ */
function ShortsScreen() {
  const [shortsData, setShortsData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setShortsData([
      {
        id: "1",
        username: "@ecowarrior",
        date: "28 Jan",
        title: "Plastic-free grocery shopping",
        videoUri:
          "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
      },
      {
        id: "2",
        username: "@greenlife",
        date: "15 Feb",
        title: "DIY Compost Bin",
        videoUri:
          "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-watch-with-the-stopwatch-running-32808-large.mp4",
      },
    ]);
  }, []);

  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems[0]?.index != null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
        data={shortsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ShortsPlayer uri={item.videoUri} isActive={index === currentIndex} />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        snapToInterval={height}
        decelerationRate="fast"
      />
    </View>
  );
}

function ShortsPlayer({
  uri,
  isActive,
}: {
  uri: string;
  isActive: boolean;
}) {
  const videoRef = React.useRef<Video>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isActive) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [isActive]);

  const playVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };
  const pauseVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const onLoad = (status: AVPlaybackStatus) => {
    setIsLoading(false);
    if (isActive) {
      playVideo();
    }
  };
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        videoRef.current?.replayAsync();
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={isPlaying ? pauseVideo : playVideo}>
      <View style={{ width, height, backgroundColor: "#000" }}>
        <Video
          ref={videoRef}
          source={{ uri }}
          style={{ width, height }}
          resizeMode={ResizeMode.COVER}
          isLooping
          onLoad={onLoad}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

/* ------------------------------------------------------------------
   Navigation
   ------------------------------------------------------------------ */
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.light.tint,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="EcoPoints"
        component={EcoPointsScreen}
        options={{
          tabBarLabel: "Eco-Points",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{
          tabBarLabel: "Marketplace",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Impact"
        component={ImpactScreen}
        options={{
          tabBarLabel: "Impact",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="earth" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Challenge" component={ChallengeScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          {/* Optional Shorts */}
          <Stack.Screen
            name="Shorts"
            component={ShortsScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

/* ------------------------------------------------------------------
   Main App
   ------------------------------------------------------------------ */
export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        const tokenResponse = await Notifications.getExpoPushTokenAsync();
        console.log("Expo Push Token:", tokenResponse.data);
      }
    })();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

/* ------------------------------------------------------------------
   Styles
   ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centeredScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  homeContainer: {
    flex: 1,
    backgroundColor: "#f0f9f0",
    paddingHorizontal: 20,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginBottom: 12,
    width: "100%",
  },
  authButton: {
    backgroundColor: "#0288d1",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  authButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#e0f7fa",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#0288d1",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
  },
  points: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  receiptImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    alignSelf: "center",
  },
  notificationBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#dff0d8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: "#fff",
    width: 150,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
  },
  actionButtonsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    gap: 8,
  },
  circleButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  productPoints: {
    fontWeight: "700",
  },
  cardTitle: {
    fontWeight: "600",
    marginBottom: 10,
  },
  fallbackImg: {
    width: 100,
    height: 100,
    backgroundColor: "#ccc",
  },

  // Impact
  statsContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  statCard: {
    backgroundColor: "#fff",
    flex: 0.48,
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginVertical: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "left",
  },
  levelIndicators: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  levelDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  chartContainer: {
    marginTop: 10,
  },
  chartBars: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 120,
    alignItems: "flex-end",
  },
  barContainer: {
    alignItems: "center",
    width: 24,
  },
  bar: {
    width: 20,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barLabel: {
    marginTop: 4,
    fontSize: 10,
  },
  chartCaption: {
    marginTop: 12,
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
  goalsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  newGoalBtn: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  goalItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  goalText: {
    fontSize: 14,
    flex: 1,
  },
  goalTextCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },

  // Profile
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingsButton: {
    padding: 8,
  },
  profileCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  profileHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
  },
  userHandle: {
    fontSize: 14,
    color: "#828282",
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  editButton: {
    backgroundColor: "#0288d1",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  badgeItem: {
    width: 140,
    marginRight: 12,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 12,
    height: 180,
    justifyContent: "space-between",
  },
  badgeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },
  badgeIcon: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  progressRing: {
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0288d1",
  },
  badgeName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  badgeDescription: {
    fontSize: 12,
    textAlign: "center",
    color: "#828282",
  },
  earnedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(76,175,80,0.1)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  earnedText: {
    fontSize: 10,
    color: "#4CAF50",
    marginLeft: 4,
  },
  activityContainer: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 10,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activityIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(46,125,50,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  activityDate: {
    fontSize: 12,
    color: "#828282",
  },
  activityPoints: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4CAF50",
    marginLeft: 8,
  },

  // Badge Detail Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 340,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  closeButton: {
    padding: 4,
  },
  modalBadgeContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  modalBadgeIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  modalDescription: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#0288d1",
  },
  earnedDate: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 16,
    fontStyle: "italic",
  },
  notEarnedText: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 16,
    fontStyle: "italic",
    color: "#828282",
  },
  actionButton: {
    backgroundColor: "#0288d1",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  // Shorts
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
