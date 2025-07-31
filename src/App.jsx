import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const disRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);
  const [selectedCode, setSelectedCode] = useState(products[0].code);

  const addItem = () => {
    const selected = products.find((v) => selectedCode === v.code);

    const newItem = {
      item: selected.name,
      ppu: parseFloat(ppuRef.current.value),
      qty: parseInt(qtyRef.current.value),
      discount: parseFloat(disRef.current.value),
    };

    const existingIndex = dataItems.findIndex(
      (item) => item.item === newItem.item && item.ppu === newItem.ppu
    );

    if (existingIndex !== -1) {
      const updatedItems = [...dataItems];
      updatedItems[existingIndex].qty += newItem.qty;
      updatedItems[existingIndex].discount += newItem.discount;
      setDataItems(updatedItems);
    } else {
      setDataItems([...dataItems, newItem]);
    }
  };

  const deleteByIndex = (index) => {
    const newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const productChange = (e) => {
    const code = e.target.value;
    const item = products.find((v) => v.code === code);
    setSelectedCode(code);
    setPpu(item.price);
  };

  const onClearAll = () => {
    setDataItems([]);
  };

  return (
    <Grid item xs={12} md={4}>
    <Box p={4} sx={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Grid container spacing={2}>
        {/* Left Panel */}
        <Grid item xs={12} md={4}>
          <Box p={2} sx={{
      backgroundColor: "#f5f5f5",
      borderRadius: 2,
      maxWidth: 320,
      mx: "auto",
    }}>
            <Typography variant="h6" gutterBottom>
              Add Product
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel id="item-label">Item</InputLabel>
              <Select
                labelId="item-label"
                value={selectedCode}
                label="Item"
                onChange={productChange}
                inputRef={itemRef}
              >
                {products.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Price Per Unit"
              type="number"
              fullWidth
              margin="normal"
              inputRef={ppuRef}
              value={ppu}
              onChange={(e) => setPpu(Number(e.target.value))}
            />

            <TextField
              label="Quantity"
              type="number"
              fullWidth
              margin="normal"
              defaultValue={1}
              inputRef={qtyRef}
            />

            <TextField
              label="Discount"
              type="number"
              fullWidth
              margin="normal"
              defaultValue={0}
              inputRef={disRef}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={addItem}
            >
              Add
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={onClearAll}
          />
        </Grid>
      </Grid>
    </Box>
    </Grid>
  );
}

export default App;
