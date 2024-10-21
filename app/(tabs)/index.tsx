import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { MessagesData } from "@/data/index"; // Ensure this path is correct

const TabOneScreen = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // snap points
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand(); // Expands the bottom sheet
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close(); // Closes the bottom sheet
  };

  // Render item function for FlatList
  const renderItem = ({ item }: { item: { id: string; fullName: string } }) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageText}>{item.fullName}</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <Button title="Open Bottom Sheet" onPress={openBottomSheet} />
      <Button title="Close Bottom Sheet" onPress={closeBottomSheet} />
      <BottomSheet
        ref={bottomSheetRef}
        index={3} // Start at closed
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>Awesome 🎉</Text>
          <FlatList
            data={MessagesData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id} // Assuming 'id' is a string
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent} // To add padding/margin
          />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "black",
    textTransform: "uppercase",
  },
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%", // To make the item fill the available width
  },
  messageText: {
    fontSize: 16,
  },
  flatListContent: {
    flexGrow: 1, // Makes sure the FlatList content takes full space
    paddingBottom: 16, // Optional: to add space at the bottom
  },
});

export default TabOneScreen;

// import React, { useCallback, useMemo, useRef } from "react";
// import { View, StyleSheet, FlatList, Image, Text } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { MessagesData } from "../../data/index"; // Importing the messages data

// // Define the shape of the message data using an interface
// interface Message {
//   id: string;
//   fullName: string;
//   lastMessage: string;
//   lastMessageTime: string;
//   messageInQueue: number;
//   isOnline: boolean;
//   userImg: string;
// }

// const TabOneScreen = () => {
//   // ref
//   const bottomSheetRef = useRef<BottomSheet>(null);

//   // snap points
//   const snapPoints = useMemo(() => ["25%", "50%", "70%", "90%"], []);

//   // callbacks
//   const handleSheetChanges = useCallback((index: number) => {
//     console.log("handleSheetChanges", index);
//   }, []);

//   const openBottomSheet = () => {
//     bottomSheetRef.current?.expand(); // Expands the bottom sheet
//   };

//   const closeBottomSheet = () => {
//     bottomSheetRef.current?.close(); // Closes the bottom sheet
//   };

//   // Chat item render function
//   const renderItem = ({ item, index }: { item: Message; index: number }) => {
//     return (
//       <View
//         key={index}
//         style={[
//           styles.userContainer,
//           index % 2 !== 0 ? styles.oddBackground : null,
//         ]}
//       >
//         <View style={styles.userImageContainer}>
//           {item.isOnline && <View style={styles.onlineIndicator} />}
//           <Image
//             source={{ uri: item.userImg }} // Assuming userImg is a URL
//             resizeMode="contain"
//             style={styles.userImage}
//           />
//         </View>
//         <View style={{ flexDirection: "row", width: "80%" }}>
//           <View style={styles.userInfoContainer}>
//             <Text style={styles.userName}>{item.fullName}</Text>
//             <Text style={styles.lastSeen}>{item.lastMessage}</Text>
//           </View>
//           <View style={styles.rightContainer}>
//             <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
//             <View style={styles.messageInQueueContainer}>
//               <Text style={styles.messageInQueue}>{item.messageInQueue}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <SafeAreaView style={styles.area}>
//         <BottomSheet
//           ref={bottomSheetRef}
//           index={3} // Start at 70% opened
//           snapPoints={snapPoints}
//           onChange={handleSheetChanges}
//           enablePanDownToClose={true}
//         >
//           <BottomSheetView style={styles.contentContainer}>
//             {/* Render FlatList for chats inside the BottomSheet */}
//             <FlatList
//               data={MessagesData}
//               showsVerticalScrollIndicator={false}
//               renderItem={renderItem}
//               keyExtractor={(item) => item.id.toString()}
//             />
//           </BottomSheetView>
//         </BottomSheet>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// // Styles for Chats inside BottomSheet
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "grey",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 16,
//   },
//   area: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   userContainer: {
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomColor: "#f5f5f5",
//     borderBottomWidth: 1,
//   },
//   oddBackground: {
//     backgroundColor: "#fff",
//   },
//   userImageContainer: {
//     paddingVertical: 15,
//     marginRight: 22,
//   },
//   onlineIndicator: {
//     height: 14,
//     width: 14,
//     borderRadius: 7,
//     backgroundColor: "#34A853",
//     position: "absolute",
//     top: 14,
//     right: 2,
//     zIndex: 999,
//     borderWidth: 2,
//     borderColor: "#fff",
//   },
//   userImage: {
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//   },
//   userInfoContainer: {
//     flexDirection: "column",
//   },
//   userName: {
//     fontSize: 14,
//     color: "#000",
//     marginBottom: 4,
//   },
//   lastSeen: {
//     fontSize: 14,
//     color: "#888",
//   },
//   rightContainer: {
//     position: "absolute",
//     right: 4,
//     alignItems: "center",
//   },
//   lastMessageTime: {
//     fontSize: 12,
//     color: "#000",
//   },
//   messageInQueueContainer: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: "#34A853",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 12,
//   },
//   messageInQueue: {
//     fontSize: 12,
//     color: "#fff",
//   },
// });

// export default TabOneScreen;
