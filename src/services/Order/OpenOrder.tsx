/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "../api";

interface Order {
  branch: string;
}
export interface CreatedOrder {
  id: string;
  branch: string;
  status: boolean;
  draft: boolean;
  name: string | null;
  create_at: string;
  update_at: string;
}

export async function createOrder(orderData: Order): Promise<CreatedOrder> {
  try {
    const response = await apiClient.post("/order", {
      branch: orderData.branch,
    });
    return response.data; 
  } catch (error: any) {
    throw new Error("Erro ao criar pedido: " + error.message);
  }
}

export async function listCategory(): Promise<unknown[]> {
  try {
    const response = await apiClient.get("/category");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao listar categorias");
  }
}
export async function loadProducts(
  category_selected: string | undefined
): Promise<unknown[]> {
  try {
    const response = await apiClient.get("/category/product", {
      params: {
        category_id: category_selected,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao listar categorias");
  }
}
export async function addProducts(
  product_id: string | undefined,
  order_id: string,
  amount: number
): Promise<unknown[]> {
  try {
    const response = await apiClient.post("/order/add", {
      order_id: order_id,
      product_id: product_id,
      amount: amount,
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao adicionar produto");
  }
}

export async function deleteItem(
  item_id: string
): Promise<unknown[]> {
  try {
    const response = await apiClient.delete("/order/remove", {
     params: {
      item_id:item_id
     }
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao deletar produto");
  }
}


export async function finishOrder( 
  order_id: string
): Promise<unknown[]> {
  try {
    const response = await apiClient.put("/order/send", {
      order_id: order_id,
    });
    return response.data;
  
  } catch (error) {
    throw new Error("Erro ao deletar produto");
  }
}