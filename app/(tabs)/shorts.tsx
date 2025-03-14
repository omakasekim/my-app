import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Platform,
  ActivityIndicator,
  Modal,
  Alert,
  ViewToken
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import * as ImagePicker from "expo-image-picker";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const { width, height } = Dimensions.get("window");

interface ShortItem {
  id: string;
  username: string;
  date: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  isFollowing: boolean;
  videoUri: string;
  audioTitle: string;
  userAvatar: string;
}


// Mock data for shorts videos
const SHORTS_DATA: ShortItem[] = [
  {
    id: "1",
    username: "@ecowarrior",
    date: "28 Jan",
    title: "Plastic-free grocery shopping",
    description:
      "Check out how I shop without using any plastic bags or packaging. #ecofriendly #zerowaste",
    likes: 38000,
    comments: 735,
    shares: 7800,
    isFollowing: false,
    videoUri:
      "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    audioTitle: "Original sound - ecowarrior",
    userAvatar: "https://randomuser.me/api/portraits/women/43.jpg",
  },
  {
    id: "2",
    username: "@greenlife",
    date: "15 Feb",
    title: "DIY Compost Bin",
    description:
      "Made this simple compost bin from recycled materials. So easy to do at home! #compost #gardening #sustainability",
    likes: 24500,
    comments: 412,
    shares: 3200,
    isFollowing: true,
    videoUri:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-watch-with-the-stopwatch-running-32808-large.mp4",
    audioTitle: "Original sound - greenlife",
    userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    username: "@ecotips",
    date: "3 Mar",
    title: "Energy saving hacks",
    description:
      "These simple changes reduced my electricity bill by 30%! Try them today. #energysaving #ecotips #sustainable",
    likes: 52300,
    comments: 891,
    shares: 12400,
    isFollowing: false,
    videoUri:
      "https://assets.mixkit.co/videos/preview/mixkit-young-woman-taking-notes-in-her-notebook-4595-large.mp4",
    audioTitle: "Original sound - ecotips",
    userAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

// ==================== ShortsPlayer Component ====================
interface ShortsPlayerProps {
  uri: string;
  isActive: boolean;
  style?: any;
}

function ShortsPlayer({ uri, isActive, style }: ShortsPlayerProps) {
  const colorScheme = useColorScheme();
  const videoRef = useRef<Video>(null);

  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayIcon, setShowPlayIcon] = useState(false);

  // Handle video playback based on active state
  useEffect(() => {
    if (isActive) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [isActive]);

  // Play video function
  const playVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  // Pause video function
  const pauseVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  // Toggle play/pause
  const togglePlayPause = async () => {
    if (isPlaying) {
      await pauseVideo();
      setShowPlayIcon(true);
      setTimeout(() => setShowPlayIcon(false), 1500);
    } else {
      await playVideo();
    }
  };

  // Handle video load
  const onLoad = (status: AVPlaybackStatus) => {
    setIsLoading(false);
    setStatus(status);
    if (isActive) {
      playVideo();
    }
  };

  // Handle playback status update
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setStatus(status);
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);

      // Loop video when it ends
      if (status.didJustFinish) {
        videoRef.current?.replayAsync();
      }
    }
  };

  return (
    <View style={[styles.playerContainer, style]}>
      <TouchableWithoutFeedback onPress={togglePlayPause}>
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri }}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            isLooping
            onLoad={onLoad}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            useNativeControls={false}
            shouldPlay={false}
          />

          {isLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator
                size="large"
                color={Colors[colorScheme!].tint}
              />
            </View>
          )}

          {showPlayIcon && (
            <View style={styles.playIconContainer}>
              <IconSymbol
                name={isPlaying ? "pause.circle.fill" : "play.circle.fill"}
                size={80}
                color="rgba(255, 255, 255, 0.8)"
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

// ==================== ShortsControls Component ====================
interface ShortsControlsProps {
  likes: number;
  comments: number;
  shares: number;
  videoId: string;
}

function ShortsControls({
  likes,
  comments,
  shares,
  videoId,
}: ShortsControlsProps) {
  const colorScheme = useColorScheme();

  const [likeCount, setLikeCount] = useState(likes);
  const [commentCount, setCommentCount] = useState(comments);
  const [shareCount, setShareCount] = useState(shares);
  const [isLiked, setIsLiked] = useState(false);

  // Format numbers for display (e.g., 1200 -> 1.2K)
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Handle like button press
  const handleLike = useCallback(() => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setIsLiked((prev) => {
      if (prev) {
        setLikeCount(likeCount - 1);
        return false;
      } else {
        setLikeCount(likeCount + 1);
        return true;
      }
    });
  }, [likeCount]);

  // Handle comment button press
  const handleComment = useCallback(() => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // In a real app, this would open a comment modal
    alert("Comment functionality would be implemented here");
  }, []);

  // Handle share button press
  const handleShare = useCallback(() => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setShareCount(shareCount + 1);
    // In a real app, this would open the share sheet
    alert("Share functionality would be implemented here");
  }, [shareCount]);

  // Handle menu button press
  const handleMenu = useCallback(() => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // In a real app, this would open a menu with options
    alert("Menu functionality would be implemented here");
  }, []);

  return (
    <View style={styles.controlsContainer}>
      {/* Like button */}
      <TouchableOpacity
        style={styles.controlButton}
        onPress={handleLike}
        activeOpacity={0.7}
      >
        <IconSymbol
          name={isLiked ? "heart.fill" : "heart"}
          size={24}
          color={
            isLiked
              ? Colors[colorScheme!].tint
              : colorScheme === "dark"
                ? "#ccc"
                : "#666"
          }
        />
        <ThemedText style={styles.controlText}>
          {formatNumber(likeCount)}
        </ThemedText>
      </TouchableOpacity>

      {/* Comment button */}
      <TouchableOpacity
        style={styles.controlButton}
        onPress={handleComment}
        activeOpacity={0.7}
      >
        <IconSymbol
          name="text.bubble"
          size={24}
          color={colorScheme === "dark" ? "#ccc" : "#666"}
        />
        <ThemedText style={styles.controlText}>
          {formatNumber(commentCount)}
        </ThemedText>
      </TouchableOpacity>

      {/* Share button */}
      <TouchableOpacity
        style={styles.controlButton}
        onPress={handleShare}
        activeOpacity={0.7}
      >
        <IconSymbol
          name="arrowshape.turn.up.right"
          size={24}
          color={colorScheme === "dark" ? "#ccc" : "#666"}
        />
        <ThemedText style={styles.controlText}>
          {formatNumber(shareCount)}
        </ThemedText>
      </TouchableOpacity>

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Menu button */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleMenu}
        activeOpacity={0.7}
      >
        <IconSymbol
          name="ellipsis"
          size={24}
          color={colorScheme === "dark" ? "#ccc" : "#666"}
        />
      </TouchableOpacity>

      {/* Share button (alternative) */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleShare}
        activeOpacity={0.7}
      >
        <IconSymbol
          name="square.and.arrow.up"
          size={24}
          color={colorScheme === "dark" ? "#ccc" : "#666"}
        />
      </TouchableOpacity>
    </View>
  );
}

// ==================== ShortsUploadButton Component ====================
interface ShortsUploadButtonProps {
  style?: any;
}

function ShortsUploadButton({ style }: ShortsUploadButtonProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Open upload options modal
  const handleOpenUploadOptions = useCallback(() => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setModalVisible(true);
  }, []);

  // Close upload options modal
  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  // Pick video from library
  const pickVideo = useCallback(async () => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to your media library to upload videos.",
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 60,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        handleVideoUpload(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking video:", error);
      Alert.alert("Error", "Failed to pick video. Please try again.");
    }

    setModalVisible(false);
  }, []);

  // Record new video
  const recordVideo = useCallback(async () => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to your camera to record videos.",
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 60,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        handleVideoUpload(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error recording video:", error);
      Alert.alert("Error", "Failed to record video. Please try again.");
    }

    setModalVisible(false);
  }, []);

  // Handle video upload
  const handleVideoUpload = useCallback(
    async (videoUri: string) => {
      setIsUploading(true);

      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        Alert.alert(
          "Upload Successful",
          "Your video has been uploaded and will be processed shortly.",
          [
            {
              text: "View Profile",
              onPress: () => router.push("/(tabs)/profile "as any),
            },
            {
              text: "OK",
              style: "cancel",
            },
          ],
        );
      }, 2000);

      // In a real app, this would upload the video to a server
      // const formData = new FormData();
      // formData.append('video', {
      //   uri: videoUri,
      //   type: 'video/mp4',
      //   name: 'upload.mp4',
      // });
      //
      // try {
      //   const response = await fetch('https://your-api.com/upload', {
      //     method: 'POST',
      //     body: formData,
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });
      //
      //   const data = await response.json();
      //   // Handle response
      // } catch (error) {
      //   console.error('Error uploading video:', error);
      //   Alert.alert('Error', 'Failed to upload video. Please try again.');
      // }
    },
    [router],
  );

  return (
    <>
      <TouchableOpacity
        style={[styles.uploadButton, style]}
        onPress={handleOpenUploadOptions}
        activeOpacity={0.8}
      >
        <IconSymbol name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Upload Options Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <BlurView
            intensity={90}
            tint={colorScheme === "dark" ? "dark" : "light"}
            style={styles.blurView}
          >
            <ThemedView style={styles.modalContent}>
              <ThemedText style={styles.modalTitle}>Create a Short</ThemedText>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={pickVideo}
                activeOpacity={0.7}
              >
                <IconSymbol
                  name="photo.on.rectangle"
                  size={24}
                  color={colorScheme === "dark" ? "#fff" : "#333"}
                />
                <ThemedText style={styles.modalOptionText}>
                  Upload from Gallery
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={recordVideo}
                activeOpacity={0.7}
              >
                <IconSymbol
                  name="camera"
                  size={24}
                  color={colorScheme === "dark" ? "#fff" : "#333"}
                />
                <ThemedText style={styles.modalOptionText}>
                  Record New Video
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCloseModal}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </BlurView>
        </View>
      </Modal>

      {/* Upload Loading Indicator */}
      {isUploading && (
        <View style={styles.uploadingOverlay}>
          <ThemedView style={styles.uploadingContainer}>
            <ActivityIndicator size="large" color={Colors[colorScheme!].tint} />
            <ThemedText style={styles.uploadingText}>
              Uploading video...
            </ThemedText>
          </ThemedView>
        </View>
      )}
    </>
  );
}

// ==================== Main ShortsScreen Component ====================
export default function ShortsScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [shortsData, setShortsData] = useState(SHORTS_DATA);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<{
    [key: string]: boolean;
  }>({});

  // Handle video change when scrolling

  const onViewableItemsChanged = useRef(
    (info: { viewableItems: ViewToken<ShortItem>[]; changed: ViewToken<ShortItem>[] }) => {
      if (info.viewableItems.length > 0 && info.viewableItems[0].index != null) {
        setCurrentIndex(info.viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  // Toggle follow status
  const handleFollow = useCallback((id: string) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setShortsData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFollowing: !item.isFollowing } : item,
      ),
    );
  }, []);

  // Toggle description expansion
  const toggleDescription = useCallback((id: string) => {
    setIsDescriptionExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  // Navigation handlers
  const handleBack = useCallback(() => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  }, [router]);

  const handleSearch = useCallback(() => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    // Navigate to search or implement search functionality
    alert("Search functionality would be implemented here");
  }, []);

  // Render each shorts item
  const renderItem = useCallback(
    ({ item, index }: {item:ShortItem; index: number}) => {
      const isActive = index === currentIndex;
      const isExpanded = isDescriptionExpanded[item.id!] || false;

      return (
        <View style={styles.shortsItem}>
          <ShortsPlayer
            uri={item.videoUri}
            isActive={isActive}
            style={styles.videoPlayer}
          />

          <View
            style={[
              styles.contentContainer,
              {
                paddingTop: insets.top + 60,
                paddingBottom: insets.bottom + 20,
              },
            ]}
          >
            {/* User info section */}
            <View style={styles.userInfoContainer}>
              <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
              <ThemedText style={styles.username}>{item.username}</ThemedText>
              <ThemedText style={styles.date}>| {item.date}</ThemedText>
              <TouchableOpacity
                style={[
                  styles.followButton,
                  item.isFollowing ? styles.followingButton : {},
                ]}
                onPress={() => handleFollow(item.id)}
                activeOpacity={0.8}
              >
                <ThemedText
                  style={[
                    styles.followButtonText,
                    item.isFollowing ? styles.followingButtonText : {},
                  ]}
                >
                  {item.isFollowing ? "Following" : "Follow"}
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Video title section */}
            <View style={styles.titleContainer}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <TouchableOpacity
                style={styles.watchNowButton}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.watchNowText}>Watch Now</ThemedText>
              </TouchableOpacity>
            </View>

            {/* Video description section */}
            <TouchableOpacity
              style={styles.descriptionContainer}
              onPress={() => toggleDescription(item.id)}
              activeOpacity={0.9}
            >
              <ThemedText
                style={styles.description}
                numberOfLines={isExpanded ? undefined : 1}
              >
                {item.description}
              </ThemedText>
              {!isExpanded && (
                <ThemedText style={styles.moreText}>more</ThemedText>
              )}
            </TouchableOpacity>

            {/* Interaction controls */}
            <ShortsControls
              likes={item.likes}
              comments={item.comments}
              shares={item.shares}
              videoId={item.id}
            />

            {/* Audio section */}
            <View style={styles.audioSection}>
              <IconSymbol
                name="music.note"
                size={16}
                color={colorScheme === "dark" ? "#ccc" : "#666"}
              />
              <ThemedText style={styles.audioTitle}>
                {item.audioTitle}
              </ThemedText>
            </View>

            {/* Progress bar */}
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    backgroundColor:
                      colorScheme === "dark" ? "#444" : "#e0e0e0",
                  },
                ]}
              >
                <View
                  style={[
                    styles.progress,
                    {
                      width: "30%",
                      backgroundColor:
                        colorScheme === "dark"
                          ? Colors.dark.tint
                          : Colors.light.tint,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
      );
    },
    [
      currentIndex,
      colorScheme,
      handleFollow,
      isDescriptionExpanded,
      insets,
      toggleDescription,
    ],
  );

  return (
    <View style={styles.container}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      {/* Header */}
      <BlurView
        intensity={80}
        tint={colorScheme === "dark" ? "dark" : "light"}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <IconSymbol
            name="chevron.left"
            size={24}
            color={colorScheme === "dark" ? "#fff" : "#333"}
          />
        </TouchableOpacity>

        <ThemedText style={styles.headerTitle}>Shorts</ThemedText>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleSearch}
          activeOpacity={0.7}
        >
          <IconSymbol
            name="magnifyingglass"
            size={24}
            color={colorScheme === "dark" ? "#fff" : "#333"}
          />
        </TouchableOpacity>
      </BlurView>

      {/* Shorts FlatList */}
      <FlatList
        ref={flatListRef}
        data={shortsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={true}
      />

      {/* Upload button */}
      <ShortsUploadButton style={{ bottom: insets.bottom + 70 }} />

      {/* Loading indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors[colorScheme!].tint} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  shortsItem: {
    width,
    height,
    backgroundColor: "#000",
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 20,
  },

  // User info styles
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    fontSize: 14,
    fontWeight: "500",
  },
  date: {
    fontSize: 14,
    color: "#999",
    marginLeft: 4,
  },
  followButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#666",
    marginLeft: "auto",
  },
  followingButton: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  followButtonText: {
    fontSize: 14,
    color: "#666",
  },
  followingButtonText: {
    color: "#fff",
  },

  // Title and description styles
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },
  watchNowButton: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  watchNowText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  descriptionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: "#999",
  },
  moreText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },

  // Audio and progress bar styles
  audioSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  audioTitle: {
    fontSize: 14,
    color: "#999",
    marginLeft: 8,
  },
  progressBarContainer: {
    width: "100%",
    marginTop: 10,
  },
  progressBar: {
    height: 3,
    width: "100%",
    borderRadius: 1.5,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderRadius: 1.5,
  },

  // Video player styles
  videoPlayer: {
    ...StyleSheet.absoluteFillObject,
  },
  playerContainer: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  playIconContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },

  // Controls styles
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  controlButton: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 20,
  },
  controlText: {
    fontSize: 14,
    marginTop: 4,
    color: "#999",
  },
  iconButton: {
    marginLeft: 10,
  },
  spacer: {
    flex: 1,
  },

  // Upload button styles
  uploadButton: {
    position: "absolute",
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 100,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 15,
  },
  cancelButton: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(150, 150, 150, 0.1)",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1000,
  },
  uploadingContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  uploadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
