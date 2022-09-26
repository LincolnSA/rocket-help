import { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { VStack, useTheme, HStack, Text, ScrollView } from "native-base";

import { AuthContext } from "../contexts/auth";

import { Header } from "../components/Header";
import { CardDetails } from "../components/CardDetails";
import { Input } from "../components/Input";
import { IOrderProps } from "../components/Order";
import { Button } from "../components/Button";

import {
  CircleWavyCheck,
  DesktopTower,
  Hourglass,
  Clipboard,
} from "phosphor-react-native";
import { Alert } from "react-native";

interface IRouteParams {
  orderId: string;
}

interface IOrderDetails extends IOrderProps {
  description: string;
  solution: string;
  closed: string;
}

export const Details = () => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation();

  const { colors } = useTheme();

  const route = useRoute();

  const { orderId } = route.params as IRouteParams;

  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState("");
  const [order, setOrder] = useState<IOrderDetails>({} as any);

  useEffect(() => {
    const selectedOrder = authContext
      .handleListOrder()
      .find((order) => order.id === orderId);

    setOrder(selectedOrder);
  }, []);

  const handleSubmit = async () => {
    if (!solution) {
      return Alert.alert(
        "Solicitação",
        "Informe a solução para encerrar a solicitação."
      );
    }
    setIsLoading(true);

    await authContext.handleUpdateOrder({ id: orderId, solution });

    setIsLoading(false);

    Alert.alert("Solicitação", "Solicitação encerrada.");

    navigation.goBack();
  };

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === "closed" ? "finalizado" : "Em andamento"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
        />

        <CardDetails
          title="descrição do problema"
          description={order.description}
          icon={Clipboard}
          footer={`Registrado em ${order.when}`}
        />

        {order.solution ? (
          <CardDetails
            title="solução"
            description={order.solution}
            icon={CircleWavyCheck}
            footer={order.closed && `Encerrado em ${order.closed}`}
          />
        ) : (
          <CardDetails
            title="solução"
            icon={CircleWavyCheck}
            footer={order.closed && `Encerrado em ${order.closed}`}
          >
            <Input
              placeholder="Descrição da solução"
              onChangeText={setSolution}
              textAlignVertical="top"
              multiline
              h={24}
            />
          </CardDetails>
        )}
      </ScrollView>
      {order.status === "open" && (
        <Button
          title="Encerrar solicitação"
          m={5}
          onPress={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </VStack>
  );
};
