
import { Box, Button, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { finishOrder } from '../../services/Order/OpenOrder';
import useStore from "./../../store/orderID";
import { useNavigate } from 'react-router-dom';

export function FinishOrder(){
    const { orderId } = useStore();
    const navigate = useNavigate();

    const handleOrderFinish = async () => {
        console.log("Order ID:", orderId); 
        await finishOrder(orderId)
        navigate("/")
    }

    return(
        <Box>
            <Typography mb={5}>
                Você deseja finalizar esse pedido?
            </Typography>
          
            <Button variant='contained' endIcon={<ShoppingCartIcon/>}
            onClick={handleOrderFinish}
            
            >
                Finalizar Pedido
            </Button>
        </Box>
    )
}