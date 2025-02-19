import { Stack } from "expo-router";
import { FlatList, Text, View } from "react-native";

import Pet from "@/types/Pet";
import useCollection from "@/firebase/hooks/useCollection";
import globalStyles from "@/styles/globalStyles";
import HeaderRight from "@/components/HeaderRight";
import StyledButton from "@/components/StyledButton";
import Loading from "@/components/Loading";
import ViewPet from "@/components/ViewPet";
import PetForm from "@/components/PetForm";
import PetModal from "@/components/PetModal";
import { useState } from "react";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { data, remove, refreshData, loading, create } =
    useCollection<Pet>("pets");

  const onModalClose = () => {
    setIsModalVisible(false);
    refreshData();
  };

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Pets</Text>
      <PetModal
        isVisible={isModalVisible}
        onClose={onModalClose}
        children={<PetForm onClose={onModalClose} submit={create} />}
      />

      <StyledButton
        title="Create pet"
        onPress={() => setIsModalVisible(true)}
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ViewPet
              pet={item}
              onDelete={async () => {
                await remove(item.id!);
                refreshData();
              }}
            />
          )}
          style={{ width: "100%" }}
        />
      )}
    </View>
  );
}
