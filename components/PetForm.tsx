import { View, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import StyledButton from "./StyledButton";
import useCollection from "@/firebase/hooks/useCollection";
import Pet from "@/types/Pet";

interface PetFormsProps {
  pet?: Pet;
  onClose: Function;
  submit: Function;
  title?: string;
}

export default function PetForm({
  onClose,
  pet,
  submit,
  title,
}: PetFormsProps) {
  function formReset() {
    setName("");
    setAge("");
    setSelectedPet("");
  }

  const [name, setName] = useState(pet?.name ?? "");
  const [age, setAge] = useState(pet?.age ?? "");
  const [selectedPet, setSelectedPet] = useState(pet?.type ?? "");
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Name"
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        value={age}
        placeholder="Age"
        onChangeText={(value) => setAge(value)}
        aria-valuemax={30}
        aria-valuemin={0}
        inputMode="numeric"
      />
      <Picker
        selectedValue={selectedPet}
        onValueChange={(itemValue, itemIndex) => setSelectedPet(itemValue)}
        style={styles.input}
        mode="dropdown"
      >
        <Picker.Item label="Dog" value="dog" />
        <Picker.Item label="Cat" value="cat" />
      </Picker>
      <StyledButton
        title={title ?? "create"}
        onPress={async () => {
          try {
            submit({
              name: name,
              age: age,
              type: selectedPet,
            });
            onClose();
            formReset();
          } catch (error: any) {
            Alert.alert("Create Book error", error.toString());
          }
        }}
      />
    </View>
  );
}

{
  /* */
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    padding: 5,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    paddingLeft: 20,
  },
});
