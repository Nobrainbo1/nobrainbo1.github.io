
import { 
  Button, 
  Container, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  Box
} from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

function QuotationTable({ data, deleteByIndex, clearButton }) {

  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Quotation
        </Typography>
        <Typography variant="body1">
          <CiShoppingCart /> No items
        </Typography>
      </Box>
    );
  }
  const total = data.reduce((acc, v) => acc + v.qty * v.ppu, 0);
  const total_discount = data.reduce((acc, v) => (acc + v.qty * v.ppu) - v.discount, 0);

  const handleDelete = (index) => {
    deleteByIndex(index)
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Quotation
      </Typography>
      <Button 
        variant="contained" 
        size="small" 
        color="error" 
        onClick={clearButton}
        startIcon={<MdClear />}
        sx={{ mb: 2, boxShadow: 0 }}
      >
        Clear
      </Button>
      
      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Discount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              let amount = v.qty * v.ppu;
              return (
                <TableRow key={i} hover>
                  <TableCell align="center">
                    <BsFillTrashFill 
                      onClick={() => handleDelete(i)} 
                      style={{ cursor: 'pointer', color: '#d32f2f' }}
                    />
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{v.ppu}</TableCell>
                  <TableCell align="right">{amount}</TableCell>
                  <TableCell align="right">{v.discount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          Total: {total}
        </Typography>
        <Typography variant="h6">
          Total with discount: {total_discount}
        </Typography>
      </Box>
    </Box>
  );
}

export default QuotationTable;
