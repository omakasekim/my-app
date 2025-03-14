import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import * as Haptics from "expo-haptics";

// Firebase imports
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Initialize Firebase (using placeholder config - replace with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase app if it hasn't been initialized yet
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  // App already initialized
  app = initializeApp(firebaseConfig, "impact-tracker");
}

const db = getFirestore(app);
const auth = getAuth(app);

export default function ImpactTrackerScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [impactData, setImpactData] = useState({
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
  const [newGoalModalVisible, setNewGoalModalVisible] = useState(false);
  const [newGoalText, setNewGoalText] = useState("");

  // Fetch user impact data from Firebase
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
        // Create initial impact data for new users
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
        {
          text: "Cancel",
          style: "cancel",
        },
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

              if (Platform.OS === "ios") {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success,
                );
              }
            } catch (error) {
              console.error("Error adding goal:", error);
              Alert.alert("Error", "Failed to add goal. Please try again.");
            }
          },
        },
      ],
      "plain-text",
    );
  };

  const handleCompleteGoal = async (goalId) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const user = auth.currentUser;
    if (!user) return;

    const userImpactRef = doc(db, "userImpact", user.uid);
    const updatedGoals = impactData.goals.map((goal) =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal,
    );

    try {
      await updateDoc(userImpactRef, {
        goals: updatedGoals,
        updatedAt: serverTimestamp(),
        // Increment eco stats when completing a goal
        co2Saved: increment(5),
        plasticsAvoided: increment(2),
      });

      if (Platform.OS === "ios") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error("Error updating goal:", error);
      Alert.alert("Error", "Failed to update goal. Please try again.");
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const user = auth.currentUser;
          if (!user) return;

          const userImpactRef = doc(db, "userImpact", user.uid);
          const updatedGoals = impactData.goals.filter(
            (goal) => goal.id !== goalId,
          );

          try {
            await updateDoc(userImpactRef, {
              goals: updatedGoals,
              updatedAt: serverTimestamp(),
            });
          } catch (error) {
            console.error("Error deleting goal:", error);
            Alert.alert("Error", "Failed to delete goal. Please try again.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Colors[colorScheme ?? "light"].tint}
          />
          <ThemedText style={styles.loadingText}>
            Loading impact data...
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Impact Tracker</ThemedText>
        </View>

        {/* Stats Container */}
        <View style={styles.statsContainer}>
          <ThemedView
            style={[
              styles.statCard,
              {
                backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "#ffffff",
              },
            ]}
          >
            <View style={styles.statIconContainer}>
              <IconSymbol name="leaf.fill" size={24} color="#4CAF50" />
            </View>
            <ThemedText style={styles.statLabel}>CO₂ Saved</ThemedText>
            <ThemedText style={styles.statValue}>
              {impactData.co2Saved}kg
            </ThemedText>
          </ThemedView>

          <ThemedView
            style={[
              styles.statCard,
              {
                backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "#ffffff",
              },
            ]}
          >
            <View style={styles.statIconContainer}>
              <IconSymbol name="trash.slash.fill" size={24} color="#4CAF50" />
            </View>
            <ThemedText style={styles.statLabel}>
              Single-use Plastics Avoided
            </ThemedText>
            <ThemedText style={styles.statValue}>
              {impactData.plasticsAvoided}
            </ThemedText>
          </ThemedView>
        </View>

        {/* Eco Level Section */}
        <View style={styles.ecoLevelSection}>
          <ThemedText style={styles.sectionLabel}>Eco Level</ThemedText>
          <View style={styles.levelIndicators}>
            {[1, 2, 3, 4, 5].map((level) => (
              <View
                key={`level-${level}`}
                style={[
                  styles.levelDot,
                  level <= impactData.ecoLevel
                    ? {
                        backgroundColor:
                          colorScheme === "dark" ? "#4CAF50" : "#4CAF50",
                      }
                    : {
                        backgroundColor:
                          colorScheme === "dark" ? "#444" : "#e0e0e0",
                      },
                ]}
              >
                {level === impactData.ecoLevel && (
                  <View
                    style={[
                      styles.levelLabel,
                      {
                        backgroundColor:
                          colorScheme === "dark" ? "#333" : "#fff",
                      },
                    ]}
                  >
                    <ThemedText style={styles.levelLabelText}>
                      Level {level}
                    </ThemedText>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Impact Summary */}
        <View style={styles.impactSummary}>
          <ThemedText style={styles.sectionLabel}>Impact Summary</ThemedText>
          <ThemedView
            style={[
              styles.highlightCard,
              {
                backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "#ffffff",
              },
            ]}
          >
            <ThemedText style={styles.highlightTitle}>
              This Week's Highlight
            </ThemedText>
            <View style={styles.chartContainer}>
              <View style={styles.chartBars}>
                {impactData.weeklyData.map((item, index) => (
                  <View key={`bar-${index}`} style={styles.barContainer}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${item.value}%`,
                          backgroundColor:
                            colorScheme === "dark" ? "#5cb85c" : "#4CAF50",
                        },
                      ]}
                    />
                    <ThemedText style={styles.barLabel}>{item.day}</ThemedText>
                  </View>
                ))}
              </View>
              <ThemedText style={styles.chartCaption}>
                {impactData.totalWeeklyCO2}kg CO₂ saved globally this week!
              </ThemedText>
            </View>
          </ThemedView>

          {/* Goals Section */}
          <View style={styles.goalsSection}>
            <View style={styles.goalsHeader}>
              <ThemedText style={styles.sectionLabel}>Your Goals</ThemedText>
              <TouchableOpacity
                style={[
                  styles.newGoalBtn,
                  {
                    backgroundColor:
                      colorScheme === "dark" ? "#4CAF50" : "#4CAF50",
                  },
                ]}
                onPress={handleAddNewGoal}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.newGoalBtnText}>
                  + New Goal
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Goals List */}
            {impactData.goals.length > 0 ? (
              <View style={styles.goalsList}>
                {impactData.goals.map((goal) => (
                  <ThemedView
                    key={goal.id}
                    style={[
                      styles.goalItem,
                      {
                        backgroundColor:
                          colorScheme === "dark" ? "#2a2a2a" : "#ffffff",
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={styles.goalCheckbox}
                      onPress={() => handleCompleteGoal(goal.id)}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          goal.completed
                            ? {
                                backgroundColor: "#4CAF50",
                                borderColor: "#4CAF50",
                              }
                            : {
                                backgroundColor: "transparent",
                                borderColor:
                                  colorScheme === "dark" ? "#666" : "#ccc",
                              },
                        ]}
                      >
                        {goal.completed && (
                          <IconSymbol name="checkmark" size={12} color="#fff" />
                        )}
                      </View>
                    </TouchableOpacity>
                    <ThemedText
                      style={[
                        styles.goalText,
                        goal.completed && styles.goalTextCompleted,
                      ]}
                    >
                      {goal.text}
                    </ThemedText>
                    <TouchableOpacity
                      style={styles.goalDeleteBtn}
                      onPress={() => handleDeleteGoal(goal.id)}
                    >
                      <IconSymbol
                        name="trash"
                        size={16}
                        color={colorScheme === "dark" ? "#999" : "#666"}
                      />
                    </TouchableOpacity>
                  </ThemedView>
                ))}
              </View>
            ) : (
              <ThemedView
                style={[
                  styles.emptyGoalsContainer,
                  {
                    backgroundColor:
                      colorScheme === "dark" ? "#2a2a2a" : "#ffffff",
                  },
                ]}
              >
                <ThemedText style={styles.emptyGoalsText}>
                  You don't have any goals yet. Tap "New Goal" to create one!
                </ThemedText>
              </ThemedView>
            )}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    padding: 16,
    borderRadius: 12,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "600",
  },
  ecoLevelSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
  },
  levelIndicators: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  levelDot: {
    width: 24,
    height: 24,
    borderRadius: 50,
    position: "relative",
  },
  levelLabel: {
    position: "absolute",
    top: -30,
    left: -18,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  levelLabelText: {
    fontSize: 12,
    fontWeight: "500",
  },
  impactSummary: {
    marginBottom: 24,
  },
  highlightCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  highlightTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  chartContainer: {
    marginTop: 16,
  },
  chartBars: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 150,
    alignItems: "flex-end",
    marginBottom: 16,
  },
  barContainer: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  bar: {
    width: 24,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
  },
  chartCaption: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
  },
  goalsSection: {
    marginBottom: 24,
  },
  goalsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  newGoalBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  newGoalBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  goalsList: {
    gap: 12,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  goalCheckbox: {
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  goalText: {
    flex: 1,
    fontSize: 14,
  },
  goalTextCompleted: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  goalDeleteBtn: {
    padding: 8,
  },
  emptyGoalsContainer: {
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyGoalsText: {
    textAlign: "center",
    color: "#888",
    fontSize: 14,
  },
});
