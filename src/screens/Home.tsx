import { useState, useContext, useEffect } from "react";
import { RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  HStack,
  IconButton,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
} from "native-base";
import { SignOut, ChatTeardropText } from "phosphor-react-native";

import { AuthContext } from "../contexts/auth";

import { Filter } from "../components/Filter";
import { Button } from "../components/Button";
import { Order, IOrderProps } from "../components/Order";

import Logo from "../assets/logo_secondary.svg";

export const Home = () => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation();

  const { colors } = useTheme();

  const [orders, setOrders] = useState<IOrderProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );

  useEffect(() => {
    const filteredOrders = authContext
      .handleListOrder()
      .filter((order) => order.status === statusSelected);

    setOrders(filteredOrders);

    setRefreshing(false);
  }, [statusSelected, refreshing]);

  const navigateForNewOrder = () => {
    navigation.navigate("new");
  };

  const navigateForDetails = (orderId: string) => {
    navigation.navigate("details", {
      orderId,
    });
  };

  const handleLogout = () => {
    authContext.handleLogout();
  };

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />

          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Order
              data={item}
              onPress={() => {
                navigateForDetails(item.id);
              }}
            />
          )}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui {"\n"} solicitações{" "}
                {statusSelected === "open" ? "em andamento" : "finalizados"}
              </Text>
            </Center>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

        <Button title="Nova solicitação" onPress={navigateForNewOrder} />
      </VStack>
    </VStack>
  );
};
