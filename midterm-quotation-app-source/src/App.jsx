
import { useState, useRef } from "react";
import { 
  Button, 
  Container, 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box, 
  Typography,
  Divider
} from "@mui/material";
import products from "./product.json";
import QuotationTable from "./QuotationTable";

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const disRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);
  const [discount, setDiscount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(products[0].code);

  const addItem = () => {
    let item = products.find((v) => selectedItem === v.code)
    
    const existingItemIndex = dataItems.findIndex((v) => 
      v.item === item.name && 
      v.ppu === ppuRef.current.value && 
      v.discount === disRef.current.value
    );
    
    if (existingItemIndex !== -1) {
      const updatedItems = [...dataItems];
      updatedItems[existingItemIndex].qty = parseInt(updatedItems[existingItemIndex].qty) + parseInt(qtyRef.current.value);
      setDataItems(updatedItems);
      return;
    }

    const newItem = {
      item: item.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      discount: disRef.current.value,
    };

    setDataItems([...dataItems, newItem]);
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  }

  const productChange = (event) => {
    const selectedCode = event.target.value;
    setSelectedItem(selectedCode);
    let item = products.find((v) => selectedCode === v.code)
    setPpu(item.price)
  }

  const clearButton = () => {
    setDataItems([]);
  }

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box 
            sx={{ 
              backgroundColor: "#e4e4e4", 
              borderRadius: 2, 
              p: 1.5,
              height: 'fit-content',
              maxWidth: '17vw',
              width: '100%'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Add Item
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Item</InputLabel>
              <Select
                value={selectedItem}
                label="Item"
                onChange={productChange}
              >
                {products.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Price Per Unit"
              type="number"
              value={ppu}
              onChange={(e) => setPpu(e.target.value)}
              inputRef={ppuRef}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Discount"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              inputRef={disRef}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Quantity"
              type="number"
              defaultValue={1}
              inputRef={qtyRef}
              sx={{ mb: 3 }}
            />

            <Divider sx={{ my: 2 }} />
            
            <Button 
              variant="contained" 
              size="large" 
              fullWidth
              onClick={addItem}
              sx={{ 
                boxShadow: 0,
                mb: 1
              }}
            >
              Add
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={8}>
          <QuotationTable
            data={dataItems}
            clearButton={clearButton}
            deleteByIndex={deleteByIndex} 
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
