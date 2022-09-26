import { useState, createContext } from "react";
import { dateFormat } from "../utils/dateFormat";

interface IAuth {
  user: object;
  handleLogin({ email, password }): Promise<any>;
  handleLogout(): void;
  handleListOrder(): any[];
  handleAddOrder(newOrder: any): Promise<any>;
  handleUpdateOrder(updateOrder: any): void;
}

export const AuthContext = createContext<IAuth>({} as IAuth);

export const AuthProvider = ({ children }) => {
  const TIMEOUT = 2 * 1000;
  const [user, setUser] = useState(null);
  const [orders, setOders] = useState<any[]>([]);

  const handleLogin = async ({ email, password }) =>
    new Promise(() =>
      setTimeout(() => {
        setUser({ email, password });
      }, TIMEOUT)
    );

  const handleLogout = () => {
    setUser(null);
  };

  const handleListOrder = () => {
    return orders;
  };

  const handleAddOrder = async (newOrder) =>
    new Promise((resolve) =>
      setTimeout(() => {
        const newOrders = [
          ...orders,
          {
            id: Date.now().toString(),
            patrimony: newOrder.patrimony,
            when: dateFormat(Date.now()),
            description: newOrder.description,
            solution: newOrder.solution,
            closed: newOrder.closed,
            status: "open",
          },
        ];
        setOders(newOrders);
        resolve(true);
      }, TIMEOUT)
    );

  const handleUpdateOrder = async (updateOrder) =>
    new Promise((resolve) =>
      setTimeout(() => {
        const indexOrder = orders.findIndex(
          (order) => order.id === updateOrder.id
        );

        const newOrder = {
          ...orders[indexOrder],
          solution: updateOrder.solution,
          status: "closed",
          closed: dateFormat(Date.now()),
        };

        orders.splice(indexOrder, 1);

        setOders([...orders, newOrder]);
        resolve(true);
      }, TIMEOUT)
    );

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        handleListOrder,
        handleAddOrder,
        handleUpdateOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
