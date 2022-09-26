import { useContext, useState } from "react";
import { Alert } from "react-native";
import { VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../contexts/auth";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export const Register = () => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  const handleNewOrder = async () => {
    if (!patrimony || !description) {
      return Alert.alert("Registrar", "Preencha todos os campos.");
    }

    setIsLoading(true);

    await authContext.handleAddOrder({
      patrimony,
      description,
    });

    setIsLoading(false);

    Alert.alert("Solicitação", "Solicitação criada com sucesso.");

    navigation.goBack();
  };

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={setPatrimony}
      />

      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button
        title="Cadatrar"
        mt={5}
        onPress={handleNewOrder}
        isLoading={isLoading}
      />
    </VStack>
  );
};
