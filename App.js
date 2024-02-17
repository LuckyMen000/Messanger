import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Messages from "./components/Messanger";

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Messanger"
                component={Messages}
                options={{ title: "Messenger" }}
            />
        </Stack.Navigator>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {},
});
