import { Box, Button, TextField } from "@mui/material";
import LogoBurgman from "../../assets/images/logo.png";
import { useFormik } from "formik";
import { createOrder } from "../../services/Order/OpenOrder";
import { useNavigate } from "react-router-dom";
import useStore from "./../../store/orderID";

export const LocalOrder = () => {
  const navigate = useNavigate();
  const { setOrderId } = useStore();
  const formik = useFormik({
    initialValues: {
      order: "",
    },
    onSubmit: () => {},
  });

  const handleOpenOrder = async () => {
    try {
      const response = await createOrder({
        branch: formik.values.order,
      });
      setOrderId(response.id);

      formik.resetForm();
      navigate(`/pedido/`);
    } catch (error) {
      console.error("Erro ao abrir pedido:", error);
      navigate(`/pedido`);
    }
  };

  console.log("FORRRRMIK AQUIIII", formik.values);
  return (
    <>
      <Box mb={2}>
        <img src={LogoBurgman} style={{ width: 350, height: 300 }} alt="Logo" />
      </Box>
      <Box mb={2} sx={{ fontSize: "2rem" }}>
        Informe sua loja
      </Box>
      <Box>
        <TextField
          value={formik.values.order}
          onChange={formik.handleChange}
          name="order"
          id="order"
          label="Loja"
          InputProps={{
            style: {
              color: "white",
            },
          }}
        />
        <Button
          variant="contained"
          sx={{ height: "3.5rem", marginLeft: 1 }}
          onClick={handleOpenOrder}
        >
          Abrir Pedido
        </Button>
      </Box>
    </>
  );
};
