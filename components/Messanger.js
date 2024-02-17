import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    SafeAreaView,
    FlatList,
    TextInput,
    Button,
} from "react-native";
import { Avatar } from "react-native-elements"; // Import Avatar from react-native-elements

function Messages({ route }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        // run once when the app component loads
        // Assuming db, firebase, and other necessary imports are defined
        // Replace them with your actual implementation
        db.collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        message: doc.data(),
                    }))
                );
            });
    }, []);

    const handleSend = () => {
        // Assuming db, firebase, and other necessary imports are defined
        // Replace them with your actual implementation
        db.collection("messages").add({
            message: input,
            username: route.params.username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.messageContainer}>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => {
                        const isUser =
                            item.message.username === route.params.username;
                        return (
                            <View
                                style={
                                    isUser
                                        ? styles.messagesUser
                                        : styles.messagesNotUser
                                }
                            >
                                {!isUser && (
                                    <Avatar
                                        rounded
                                        source={require("./default_avatar_image.png")}
                                        size={40} // Adjust the size of the avatar as needed
                                    />
                                )}
                                <View style={styles.messageContent}>
                                    <Text style={styles.username}>
                                        {item.message.username}
                                    </Text>
                                    <Text style={styles.text}>
                                        {item.message.message}
                                    </Text>
                                </View>
                            </View>
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    value={input}
                    placeholder="Enter your message here"
                    style={styles.input}
                    onChangeText={(text) => setInput(text)}
                />
                <Button
                    style={styles.sendBtn}
                    title="Send"
                    onPress={handleSend}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: "#fff", // Set your desired background color
    },
    messageContainer: {
        flex: 1,
    },
    messagesNotUser: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 8,
        marginBottom: 8,
    },
    messagesUser: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginRight: 8,
        marginBottom: 8,
    },
    messageContent: {
        marginLeft: 8,
        marginRight: 8,
        maxWidth: "70%",
        backgroundColor: "#E1E5EB",
        borderRadius: 10,
        padding: 8,
    },
    username: {
        fontWeight: "bold",
        marginBottom: 4,
    },
    text: {
        color: "#000",
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc", // Set your desired border color
        backgroundColor: "#fff", // Set your desired background color
    },
    input: {
        flex: 1,
        marginRight: 8,
        padding: 8,
        borderColor: "#000", // Set your desired border color
        borderRadius: 10,
        borderWidth: 1,
    },
    sendBtn: {
        padding: 10,
    },
});

export default Messages;
