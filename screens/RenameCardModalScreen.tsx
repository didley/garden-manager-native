import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { Text, View } from "../components/Themed";
import { gardenActions, gardenSelectors } from "../services/garden/gardenSlice";
import { RenameCardForm } from "../services/types";
import { useAppDispatch, useAppSelector } from "../store";
import { RootStackScreenProps } from "../types";

export const RenameCardModalScreen = ({
  route,
  navigation,
}: RootStackScreenProps<"RenameCardModal">) => {
  const appDispatch = useAppDispatch();

  const { selectedGardenId } = route.params;
  const selectedGardenName = useAppSelector(
    (state) =>
      gardenSelectors.selectCurrentGarden(state, selectedGardenId)?.name
  );
  console.log("name: ", selectedGardenName);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newCardName: selectedGardenName,
    },
  });
  const submitNewName = (data: RenameCardForm) => {
    appDispatch(
      gardenActions.renameGarden({
        id: selectedGardenId,
        newName: data.newCardName,
      })
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Done" onPress={handleSubmit(submitNewName)} />
      ),
      title: `Rename ${selectedGardenName}`,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: "Name is required",
          maxLength: {
            value: 20,
            message: "Too many characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              value={value}
              autoFocus={true}
              onChangeText={(value) => onChange(value)}
              onSubmitEditing={handleSubmit(submitNewName)}
            />
          </View>
        )}
        name="newCardName"
      />
      {errors.newCardName && <Text>{errors.newCardName.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#71BC78",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  input: {
    borderColor: "black",
    height: 50,
    width: 250,
  },
});
