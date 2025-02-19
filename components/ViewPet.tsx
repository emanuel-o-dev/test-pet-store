import { View, Text, Alert } from "react-native";
import React from "react";
import Pet from "@/types/Pet";
import { useRouter } from "expo-router";
import StyledButton from "./StyledButton";

interface ViewPetProps {
  pet: Pet;
  onDelete: Function;
}

export default function ViewPet({ pet, onDelete }: ViewPetProps) {
  const router = useRouter();
  return (
    <View>
      <Text>{pet.name}</Text>
      <Text>{pet.type}</Text>

      <View style={{ flexDirection: "row" }}>
        <StyledButton
          title="View pet Details"
          onPress={() => {
            if (pet.id) {
              router.navigate(`/home/${pet.id}/`);
            } else {
              Alert.alert(
                "View error",
                "cannot access pet details because it does not have an id!"
              );
            }
          }}
          style={{ width: "50%" }}
        />

        <StyledButton
          title="Delete"
          onPress={() => {
            if (pet.id) {
              Alert.alert("Delete pet", "Are you sure?", [
                {
                  text: "Yes",
                  onPress: async () => {
                    onDelete();
                  },
                },
                {
                  text: "No",
                  style: "cancel",
                },
              ]);
            } else {
              Alert.alert(
                "delete error",
                "cannot delete pet because it does not have an id!"
              );
            }
          }}
          style={{ width: "50%", backgroundColor: "darkred" }}
        />
      </View>
    </View>
  );
}
