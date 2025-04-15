/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  addProducts,
  deleteItem,
  listCategory,
  loadProducts,
} from "../../services/Order/OpenOrder";
import { ListItem } from "./components/ListItem";
import useStore from "./../../store/orderID";

type CategoryProps = {
  id: string;
  name: string;
};

type ProductProps = {
  id: string;
  name: string;
};

interface ItemProps {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
}

export const RegisterOrder = () => {
  const { order } = useParams<{ order: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<CategoryProps | undefined>(undefined);

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [items, setItems] = useState<ItemProps[]>([]);
  const order_id = useStore((state) => state.orderId);

  const formik = useFormik({
    initialValues: {
      categorySelected: "",
      amount: 0,
      productSelected: "",
    },
    onSubmit: () => {},
  });

  // Carrega as categorias na primeira renderização
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: any = await listCategory();
        setCategories(data);
      } catch (error: any) {
        console.error("Erro ao carregar categorias:", error.message);
      }
    };

    fetchCategories();
  }, []);

  // Carrega os produtos sempre que a categoria selecionada mudar
  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoriesSelected?.id) {
        setProducts([]);  // Limpa os produtos se nenhuma categoria estiver selecionada
        return;
      }
  
      try {
        const data: any = await loadProducts(categoriesSelected.id);
        console.log(`Produtos carregados para a categoria ${categoriesSelected.name}:`, data);
        setProducts(data);
      } catch (error: any) {
        console.error("Erro ao carregar produtos:", error.message);
      }
    };
  
    fetchProducts();
  }, [categoriesSelected]);
  

  // Atualiza a categoria selecionada e o valor no formik
  const handleChange = (event: SelectChangeEvent) => {
    const selectedCategoryId = event.target.value as string;
    const selectedCategory = categories.find(
      (category) => category.id === selectedCategoryId
    );
    setCategoriesSelected(selectedCategory);
    formik.setFieldValue("categorySelected", selectedCategoryId);
  };

  const incrementValue = () => {
    formik.setFieldValue("amount", formik.values.amount + 1);
  };

  const decrementValue = () => {
    formik.setFieldValue("amount", Math.max(formik.values.amount - 1, 0));
  };

  async function handleAdd() {
    try {
      const response = await addProducts(
        formik.values.productSelected,
        order_id,
        formik.values.amount
      );

      const newItem: ItemProps = {
        id: response.id,
        product_id: formik.values.productSelected,
        name:
          products.find(
            (product) => product.id === formik.values.productSelected
          )?.name || "",
        amount: formik.values.amount,
      };

      setItems([...items, newItem]);

      formik.resetForm();
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  }

  const handleDeleteItem = async (item_id: string) => {
    await deleteItem(item_id);
    const removeItem = items.filter((item) => item.id !== item_id);
    setItems(removeItem);
  };

  const handleNavigateFinish = () => {
    navigate(`/conclusao`);
  };

  return (
    <>
      <Box mb={2}>
        <Typography>Informe a categoria e produto</Typography>
      </Box>
      <Box minWidth={"30rem"}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Categoria</InputLabel>
          <Select
            name="categorySelected"
            labelId="category-label"
            id="category-select"
            value={formik.values.categorySelected}
            label="Categoria"
            onChange={handleChange}
          >
             {Array.isArray(categories) && categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "1rem" }}>
          <InputLabel id="product-label">Produto</InputLabel>
          <Select
            name="productSelected"
            labelId="product-label"
            id="product-select"
            value={formik.values.productSelected}
            label="Produto"
            onChange={(event) =>
              formik.setFieldValue(
                "productSelected",
                event.target.value as string
              )
            }
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box display="flex" alignItems="center" style={{ marginTop: "1rem" }}>
          <IconButton onClick={decrementValue}>
            <RemoveIcon />
          </IconButton>
          <TextField
            value={formik.values.amount}
            inputProps={{
              readOnly: true,
              style: { textAlign: "center" },
            }}
            style={{ width: "100px", textAlign: "center" }}
          />
          <IconButton onClick={incrementValue}>
            <AddIcon />
          </IconButton>
          <Button variant="contained" onClick={handleAdd} fullWidth>
            ADD
          </Button>
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleNavigateFinish}
        >
          Avançar
        </Button>
        {items.length > 0 && <ListItem data={items} deleteItem={handleDeleteItem} />}
      </Box>
    </>
  );
};
