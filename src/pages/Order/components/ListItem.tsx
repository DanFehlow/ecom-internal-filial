// /* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

interface ItemProps {
  id: string;
  name: string;
  product_id: string;
  amount: string | number;
}

interface ListItemProps {
  data: ItemProps[];
  deleteItem: (item_id: string) => void;
}

export function ListItem({ data, deleteItem }: ListItemProps) {
  const handleDeleteItem = (item_id: string) => {
    deleteItem(item_id);
  };

  return (
    <Box
      sx={{
        mt: 2,
        flex: 1,
        paddingTop: 0.5,
        textAlign: "start",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: "0.5rem",
      }}
    >
      {data.map((item) => (
        <Box
          key={item.id}
          mb={1}
          sx={{ backgroundColor: "#101026", borderRadius: "0.5rem" }}
        >
          <Typography sx={{ ml: 1, justifyContent: "center" }}>
            {item.name} - Qtd: {item.amount}
          </Typography>
          <Button
            onClick={() => handleDeleteItem(item.id)}
            endIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
}

// import { Box, Button, Typography } from "@mui/material";
// import React from "react";
// import DeleteIcon from "@mui/icons-material/Delete";

// interface ItemProps {
//   id: string;
//   product_id: string;
//   name: string;
//   amount: string | number;
// }
// interface ItemDelete {
//   deleteItem: (item_id: string) => void;
// }
// export function ListItem(data: ItemProps, deleteItem: ItemDelete) {
//   const handleDeleteItem = () => {
//     deleteItem(data.id);
//   };

//   return (
//     <Box
//       sx={{
//         mt: 2,
//         backgroundColor: "#101026",
//         flex: 1,
//         paddingTop: 0.5,
//         textAlign: "start",
//         justifyContent: "space-between",
//         flexDirection: "row",
//         borderRadius: "0.5rem",
//       }}
//     >
//       {data.map((item) => (
//         <Box mb={5}>
//           <Typography key={item.id} sx={{ ml: 1, justifyContent: "center" }}>
//             {" "}
//             {item.name} - Qtd: {item.amount}
//           </Typography>
//           <Button onClick={handleDeleteItem} endIcon={<DeleteIcon />} />
//         </Box>
//       ))}
//     </Box>
//   );
// }
