import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Ingredient } from "../models/models";

interface IngredientTableProps {
    ingredients: Ingredient[]
}

export const IngredientTable = (props: IngredientTableProps) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, columnSpacing: 2 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}>Ingredient</TableCell>
                        <TableCell align="right" colSpan={1}>Amount</TableCell>
                        <TableCell align="right" colSpan={1}>Unit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.ingredients.map((ingredient) => (
                        <TableRow
                            key={ingredient.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" colSpan={2}>{ingredient.name}</TableCell>
                            <TableCell align="right" colSpan={1}>{ingredient.amount}</TableCell>
                            <TableCell align="right" colSpan={1}>{ingredient.unit}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}