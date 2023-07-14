import React, { useState } from 'react';
import { ThemeProvider, GlobalStyles, createTheme, Grid, Button, Box, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { ptBR } from '@mui/material/locale';



function createData(date: Date, valor: number, tipo: string, nomeOperadorTransacao: string) {
	return { date, valor, tipo, nomeOperadorTransacao };
}

const theme = createTheme(
	{
		palette: {
			mode: 'dark',
		},
	},
	ptBR,
);

const columns: GridColDef[] = [
	{ 
		field: 'id', 
		headerName: 'ID',
		width: 1
	},
	{ 
		field: 'data', 
		headerName: 'Data',
		type: 'Data'
	},
	{
		field: 'unidade',
		headerName:	'Unid.',
		type: 'string',
		width: 1
	},
	{
		field: 'valor',
		headerName:	'Valor',
		type: 'number'
	},
	{
		field: 'tipo',
		headerName:	'Tipo',
		type: 'string',
		width: 160
	},
	{
		field: 'nomeOperadorTransacao',
		headerName:	'Nome	do operador transacionado',
		type: 'string',
		width: 250

	}
];

const rowsa = [
	{ id: 1, data: dayjs(new Date(2019, 2, 14)).format('DD/MM/YYYY'), unidade: 'R$', valor: '30895.46', tipo: 'Depósito', nomeOperadorTransacao: null },
	{ id: 2, data: dayjs(new Date(2019, 2, 14)).format('DD/MM/YYYY'), unidade: 'R$', valor: '12.24', tipo: 'Transferência Entrada', nomeOperadorTransacao: 'Fulano' },
	{ id: 3, data: dayjs(new Date(2019, 4, 12)).format('DD/MM/YYYY'), unidade: 'R$', valor: '-500.50', tipo: 'Transferência Saída', nomeOperadorTransacao: 'Sicrano' },
	{ id: 4, data: dayjs(new Date(2020, 6, 11)).format('DD/MM/YYYY'), unidade: 'R$', valor: '-1234.00', tipo: 'Saque', nomeOperadorTransacao: null },
];


function App() {

	const [startSelectedDate, setStartSelectedDate] = useState(null);
	const [endSelectedDate, setEndSelectedDate] = useState(null);
	const [rows, setRows] = useState(rowsa);

	const handleSearch = () => {
		// Lógica para filtrar os dados por período de datas
		const filteredRows = rowsa.filter((row) => {
			const rowDate = dayjs(row.data, 'DD/MM/YYYY');
			if (startSelectedDate && endSelectedDate) {
				return rowDate.isBetween(startSelectedDate, endSelectedDate, 'day', '[]');
			} else if (startSelectedDate !== null) {
			}
			return true;
		});
		console.log(filteredRows);
		console.log(rowsa);
		setRows(filteredRows);
	};

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles	styles={{body: { backgroundColor: "#121212" }}}/>
			<Box margin="9em">
				<Grid container spacing={7}>
					<Grid item xs={4}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								value={startSelectedDate}
								onChange={date => setStartSelectedDate(date)}
								label="Data de Inicio"
								format="DD/MM/YYYY"
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={4}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								value={endSelectedDate}
								onChange={date => setEndSelectedDate(date)}
								label="Data de Fim"
								format="DD/MM/YYYY"
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={4}>
						<TextField
							name="date"
							fullWidth
							label="Nome do operador transacionado"
						></TextField>
					</Grid>
					<Button fullWidth	onClick={handleSearch}>Pesquisar</Button>
				</Grid>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10]}/>
			</Box>
		</ThemeProvider>
		);
}

export default App;
