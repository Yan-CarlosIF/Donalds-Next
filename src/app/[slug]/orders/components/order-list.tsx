import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import OrderItem from "./order-item";

export type PrismaOrder = Prisma.OrderGetPayload<{
  include: {
    restaurant: {
      select: {
        name: true;
        avatarImageUrl: true;
      };
    };
    orderProducts: {
      include: {
        product: true;
      };
    };
  };
}>;

interface OrderListProps {
  orders: PrismaOrder[];
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="space-y-6 p-6">
      <Button size="icon" variant="secondary" className="rounded-full">
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus de pedidos</h2>
      </div>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
