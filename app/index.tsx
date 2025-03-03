import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import Loading from "../components/Loading";
import useAuth from "../firebase/hooks/useAuth";
import globalStyles from "../styles/globalStyles";
import StyledButton from "@/components/StyledButton";

export default function LoginScreen() {
  const { user, login, loading } = useAuth();
  const router = useRouter();

  // const [email, setEmail] = useState("user@example.com");
  // const [password, setPassword] = useState("123456");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      router.replace("/home/");
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>
        simple-firestore-hooks expo example
      </Text>
      <Text>Before start: check Readme.md for setup details!</Text>
      <Text>login with email: user@example.com, password: 123456</Text>

      <TextInput
        style={globalStyles.input}
        value={email}
        onChangeText={setEmail}
        testID="email-input"
      />
      <TextInput
        style={globalStyles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        testID="password-input"
      />

      <StyledButton
        title="Login"
        onPress={async () => {
          try {
            await login(email, password);
            router.push("/home/");
          } catch (error: any) {
            Alert.alert("Login error", error.toString());
          }
        }}
        style={{ marginTop: 12 }}
        testID="signIn-button"
      />
    </View>
  );
}
