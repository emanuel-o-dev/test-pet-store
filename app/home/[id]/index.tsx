import { Stack, useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import HeaderRight from "../../../components/HeaderRight";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import useDocument from "../../../firebase/hooks/useDocument";
import globalStyles from "../../../styles/globalStyles";
import Pet from "@/types/Pet";
import PetModal from "@/components/PetModal";
import { useState } from "react";
import PetForm from "@/components/PetForm";

export default function PetDetails() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onModalClose = () => {
    setIsModalVisible(false);
    refresh();
  };

  const { id } = useGlobalSearchParams();

  const {
    data: pet,
    loading,
    upsert,
    refresh,
  } = useDocument<Pet>("pets", id as string);

  // important: always check for loading state since firestore is async!
  // Also, you can check for existence of Pet object so your type Pet | undefined becomes a Pet for sure
  if (loading || !pet) return <Loading />;

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Pet",
          headerRight: () => <HeaderRight />,
        }}
      />
      <Text style={globalStyles.title}>Pet Details</Text>
      <Text>id: {id}</Text>
      <Text>name: {pet.name}</Text>
      <Text>name: {pet.age}</Text>
      <Text>name: {pet.type}</Text>
      <StyledButton
        title="Update pet"
        onPress={() => setIsModalVisible(true)}
      />
      <PetModal
        isVisible={isModalVisible}
        onClose={onModalClose}
        children={
          <PetForm
            onClose={onModalClose}
            submit={upsert}
            pet={pet}
            title="Update"
          />
        }
      />
    </View>
  );
}
