import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";

function QuotationTable({ data, deleteByIndex, clearAll }) {
  if (!data || data.length === 0) {
    return (
      <Container>
        <h1>Quotation</h1>
        <p><ShoppingCartIcon /> No items</p>
      </Container>
    );
  }

  const total_dis = data.reduce((acc, v) => acc + v.discount, 0);
  const total = data.reduce((acc, v) => acc + v.qty * v.ppu, 0);
  const final_total = total - total_dis;

  return (
    <Container>
      <h1>Quotation</h1>
      <Button variant="outlined" color="secondary" onClick={clearAll} startIcon={<ClearIcon />}>
        Clear
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              let amount = v.qty * v.ppu - v.discount;
              return (
                <TableRow key={i}>
                  <TableCell align="center">
                    <IconButton onClick={() => deleteByIndex(i)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{v.ppu}</TableCell>
                  <TableCell align="right">{v.discount}</TableCell>
                  <TableCell align="right">{amount.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} align="right">Total Discount</TableCell>
              <TableCell align="right">-{total_dis.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">Total Amount</TableCell>
              <TableCell align="right">{final_total.toFixed(2)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default QuotationTable;
