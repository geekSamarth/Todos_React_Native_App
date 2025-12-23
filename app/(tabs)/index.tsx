import React from "react";
import { StatusBar, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>index</Text>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: "#faedcd",
  },
});
