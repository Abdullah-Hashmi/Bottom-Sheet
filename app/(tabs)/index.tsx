// import { StyleSheet, View, Text } from "react-native";

// import { useMemo } from "react";
// import BottomSheet from "@gorhom/bottom-sheet";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// export default function TabOneScreen() {
//   const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
//   return (
//     <GestureHandlerRootView style={styles.Container}>
//       <View>
//         <BottomSheet snapPoints={snapPoints}>
//           <Text>Awesome 🎉</Text>
//         </BottomSheet>
//       </View>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   Container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: "grey",
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 36,
//     alignItems: "center",
//   },
// });

import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const TabOneScreen = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // snap points
  const snapPoints = useMemo(() => ["25%", "50%", "70%", "90%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand(); // Expands the bottom sheet
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close(); // Expands the bottom sheet
  };

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <Button title="Open Bottom Sheet" onPress={openBottomSheet} />
      <Button title="Close Bottom Sheet" onPress={closeBottomSheet} />
      <BottomSheet
        ref={bottomSheetRef}
        index={3} // Start closed
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>Awesome 🎉</Text>
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
});

export default TabOneScreen;
