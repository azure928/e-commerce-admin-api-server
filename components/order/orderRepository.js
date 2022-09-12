import prisma from '../../prisma/prisma-client.js';

export async function readOrders() {
  const selectedOrders = await prisma.orders.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });
  return selectedOrders;
}
