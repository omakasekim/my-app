import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
  useWindowDimensions,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme"; //
import { Colors } from "@/constants/Colors"; //
import { IconSymbol } from "@/components/ui/IconSymbol";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);//
  const [modalVisible, setModalVisible] = useState(false);

  interface Badge {//
    id: number;
    name: string;
    description: string;
    icon: string;
    progress: number;
    dateEarned: string | null;
  }
  // Mock user data - in a real app, this would come from a context or API
  const userData = useMemo(
    () => ({
      name: "Alex Green",
      username: "@ecoalex",
      points: 1250,
      level: 8,
      joinDate: "March 2023",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8e55h9f9i9i7i4g9h9h6f9d5i9i4i7h9i7i4g9h9h6f9d5i9i4i7h9?placeholderIfAbsent=true",
    }),
    [],
  );

  const badgeData: Badge[] = useMemo(//
    () => [
      {
        id: 1,
        name: "Eco Warrior",
        description: "Completed 5 eco-friendly challenges",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a11d9b7e7e3f0c7d9d2b9a1e5e0f3d2e7e3f0c7d9d2b9a1e5e0f3d2?placeholderIfAbsent=true",
        progress: 100,
        dateEarned: "2023-06-15",
      },
      {
        id: 2,
        name: "Water Saver",
        description: "Reduced water usage by 20%",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b22e8c8f8f4f1d8e8e3c8a2f6f1f4e3f8f4f1d8e8e3c8a2f6f1f4e3?placeholderIfAbsent=true",
        progress: 100,
        dateEarned: "2023-07-22",
      },
      {
        id: 3,
        name: "Energy Master",
        description: "Used renewable energy for a month",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6c33f9d9g9g5g2e9f9f4d9b3g7g2g5f9g5g2e9f9f4d9b3g7g2g5f9?placeholderIfAbsent=true",
        progress: 75,
        dateEarned: null,
      },
      {
        id: 4,
        name: "Recycling Pro",
        description: "Recycled 100+ items",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7d44g8e8h8h6h3f8g8g5e8c4h8h3h6g8h6h3f8g8g5e8c4h8h3h6g8?placeholderIfAbsent=true",
        progress: 40,
        dateEarned: null,
      },
      {
        id: 5,
        name: "Community Leader",
        description: "Organized an eco-event",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9f66i9j9k9k8k5h9i9i7g9e6k9k5k8i9k8k5h9i9i7g9e6k9k5k8i9?placeholderIfAbsent=true",
        progress: 0,
        dateEarned: null,
      },
    ],
    [],
  );

  const handleBadgePress = useCallback((badge: Badge) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedBadge(badge);
    setModalVisible(true);
  }, []);

  const handleEditProfile = useCallback(() => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    Alert.alert("Edit Profile", "This would open the profile editor");
  }, []);

  const handleSettings = useCallback(() => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert("Settings", "This would open the settings screen");
  }, []);

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with settings button */}
        <View style={styles.headerRow}>
          <ThemedText style={styles.headerTitle}>Profile</ThemedText>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleSettings}
            activeOpacity={0.7}
          >
            <IconSymbol
              name="gearshape.fill"
              size={22}
              color={
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text
              }
            />
          </TouchableOpacity>
        </View>
///
        {/* User Profile Card */}
        <ThemedView style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: userData.avatar }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <ThemedText style={styles.userName}>{userData.name}</ThemedText>
              <ThemedText style={styles.userHandle}>
                {userData.username}
              </ThemedText>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>
                    {userData.points}
                  </ThemedText>
                  <ThemedText style={styles.statLabel}>Points</ThemedText>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>
                    {userData.level}
                  </ThemedText>
                  <ThemedText style={styles.statLabel}>Level</ThemedText>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.editButtonText}>Edit Profile</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Badges Section */}
        <View style={styles.section}>
          <ThemedText
            type="defaultSemiBold"
            style={styles.sectionTitle}
            lightColor={Colors.light.text}
            darkColor={Colors.dark.text}
          >
            Badges & Achievements
          </ThemedText>

          <ThemedView style={styles.badgesContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.badgesScrollContent}
              decelerationRate="fast"
              snapToInterval={width > 500 ? 170 : 150}
              snapToAlignment="center"
            >
              {badgeData.map((badge) => (
                <TouchableOpacity
                  key={badge.id}
                  style={[
                    styles.badgeItem,
                    { opacity: badge.progress > 0 ? 1 : 0.6 },
                  ]}
                  onPress={() => handleBadgePress(badge)}
                  activeOpacity={0.9}
                >
                  <View style={styles.badgeIconContainer}>
                    <Image
                      source={{ uri: badge.icon }}
                      style={styles.badgeIcon}
                    />
                    {badge.progress < 100 && (
                      <View style={styles.progressRing}>
                        <View
                          style={[
                            styles.progressFill,
                            { width: `${badge.progress}%` },
                          ]}
                        />
                      </View>
                    )}
                  </View>
                  <ThemedText style={styles.badgeName}>{badge.name}</ThemedText>
                  <ThemedText style={styles.badgeDescription} numberOfLines={2}>
                    {badge.description}
                  </ThemedText>
                  {badge.dateEarned && (
                    <View style={styles.earnedBadge}>
                      <IconSymbol
                        name="checkmark.circle.fill"
                        size={14}
                        color="#4CAF50"
                      />
                      <ThemedText style={styles.earnedText}>Earned</ThemedText>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </ThemedView>
        </View>

        {/* Activity Section */}
        <View style={styles.section}>
          <ThemedText
            type="defaultSemiBold"
            style={styles.sectionTitle}
            lightColor={Colors.light.text}
            darkColor={Colors.dark.text}
          >
            Recent Activity
          </ThemedText>

          <ThemedView style={styles.activityContainer}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.activityItem}>
                <View style={styles.activityIconContainer}>
                  <IconSymbol
                    name={
                      item === 1
                        ? "leaf.fill"
                        : item === 2
                          ? "drop.fill"
                          : "trash.fill"
                    }
                    size={20}
                    color={colorScheme === "dark" ? "#fff" : "#2E7D32"}
                  />
                </View>
                <View style={styles.activityContent}>
                  <ThemedText style={styles.activityTitle}>
                    {item === 1
                      ? "Completed Plant a Tree Challenge"
                      : item === 2
                        ? "Saved 5 gallons of water"
                        : "Recycled 10 items"}
                  </ThemedText>
                  <ThemedText style={styles.activityDate}>
                    {item === 1
                      ? "2 days ago"
                      : item === 2
                        ? "1 week ago"
                        : "2 weeks ago"}
                  </ThemedText>
                </View>
                <ThemedText style={styles.activityPoints}>
                  +{item === 1 ? "50" : item === 2 ? "30" : "25"}
                </ThemedText>
              </View>
            ))}
          </ThemedView>
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
          <ThemedView style={styles.modalContent}>
            {selectedBadge && (
              <>
                <View style={styles.modalHeader}>
                  <ThemedText style={styles.modalTitle}>
                    {selectedBadge.name}
                  </ThemedText>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <IconSymbol
                      name="xmark.circle.fill"
                      size={24}
                      color={colorScheme === "dark" ? "#aaa" : "#666"}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBadgeContainer}>
                  <Image
                    source={{ uri: selectedBadge.icon }}
                    style={styles.modalBadgeIcon}
                  />
                </View>

                <ThemedText style={styles.modalDescription}>
                  {selectedBadge.description}
                </ThemedText>

                <View style={styles.progressContainer}>
                  <ThemedText style={styles.progressText}>
                    Progress: {selectedBadge.progress}%
                  </ThemedText>
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
                  <ThemedText style={styles.earnedDate}>
                    Earned on:{" "}
                    {new Date(selectedBadge.dateEarned).toLocaleDateString()}
                  </ThemedText>
                ) : (
                  <ThemedText style={styles.notEarnedText}>
                    Keep going to earn this badge!
                  </ThemedText>
                )}

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    setModalVisible(false);
                    Alert.alert(
                      "Badge Details",
                      `This would show more details about the ${selectedBadge.name} badge and how to earn it.`,
                    );
                  }}
                >
                  <ThemedText style={styles.actionButtonText}>
                    {selectedBadge.progress < 100
                      ? "See How to Earn"
                      : "Share Achievement"}
                  </ThemedText>
                </TouchableOpacity>
              </>
            )}
          </ThemedView>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  settingsButton: {
    padding: 8,
  },
  profileCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 14,
    color: "#828282",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 12,
    color: "#828282",
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  editButton: {
    backgroundColor: Colors.light.tint,
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
  section: {
    marginBottom: 24,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "600",
  },
  badgesContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  badgesScrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  badgeItem: {
    width: 140,
    marginHorizontal: 8,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 180,
    justifyContent: "space-between",
  },
  badgeIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    position: "relative",
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
    backgroundColor: Colors.light.tint,
  },
  badgeIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  badgeName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 12,
    textAlign: "center",
    color: "#828282",
    height: 32,
  },
  earnedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  earnedText: {
    fontSize: 10,
    color: "#4CAF50",
    marginLeft: 4,
    fontWeight: "500",
  },
  activityContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(46, 125, 50, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    color: "#828282",
  },
  activityPoints: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4CAF50",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 340,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  closeButton: {
    padding: 4,
  },
  modalBadgeContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  modalBadgeIcon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.light.tint,
  },
  earnedDate: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  notEarnedText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
    color: "#828282",
  },
  actionButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
