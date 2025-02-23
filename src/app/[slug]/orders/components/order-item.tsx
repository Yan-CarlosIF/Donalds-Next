import { OrderStatus } from "@prisma/client";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

import { PrismaOrder } from "./order-list";

interface OrderItemProps {
  order: PrismaOrder;
}

const getStatusLabel = (status: OrderStatus) => {
  if (status === "FINISHED") return "Finalizado";
  if (status === "IN_PREPARATION") return "Em preparo";
  if (status === "PENDING") return "Pendente";
  return "";
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div
          className={`w-fit text-white rounded-full px-2 py-1 text-xs font-semibold 
            ${
              order.status === OrderStatus.FINISHED
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
        >
          {getStatusLabel(order.status)}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative h-5 w-5">
            <Image
              src={order.restaurant.avatarImageUrl}
              alt={order.restaurant.name}
              className="rounded-sm"
              fill
            />
          </div>
          <p className="font-semibold text-sm">{order.restaurant.name}</p>
        </div>
        <Separator />
        <div className="space-y-2">
          {order.orderProducts.map((orderProduct) => (
            <div key={orderProduct.id} className="flex items-center gap-2">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-gray-400 text-white text-xs font-semibold">
                {orderProduct.quantity}
              </div>
              <p className="text-sm">{orderProduct.product.name}</p>
            </div>
          ))}
        </div>
        <Separator />
        <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
