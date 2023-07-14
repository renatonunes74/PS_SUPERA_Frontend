import React, { useState, useEffect } from 'react';
import { ThemeProvider, GlobalStyles, createTheme, Grid, Button, Box, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DataGrid, GridColDef, GridValueGetterParams, GridValueFormatterParams, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { busca } from './services/Service';
import { ptBR } from '@mui/material/locale';

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
		flex: 1
	},
	{ 
		field: 'dataTransferencia', 
		headerName: 'Data',
		type: 'string',
		flex: 1
	},
	{
		field: 'valor',
		headerName:	'Valor',
		type: 'number',
		flex: 1,
		valueFormatter: (params: GridValueFormatterParams<number>) => {
              if (params.value == null) {
                return '';
              }
              return `R$ ${params.value.toLocaleString()}`;
		},
	},
	{
		field: 'tipo',
		headerName:	'Tipo',
		type: 'string',
		flex: 1
	},
	{
		field: 'nomeOperadorTransacao',
		headerName:	'Nome	do operador transacionado',
		type: 'string',
		flex: 1
	}
];

const initialRow = [
	{ id: 1, dataTransferencia: null, valor: null, tipo: null, nomeOperadorTransacao: null },
];


function App() {


	const [startSelectedDate, setStartSelectedDate] = useState(null);
	const [endSelectedDate, setEndSelectedDate] = useState(null);
	const [rows, setRows] = useState(initialRow);

async function getTransfer() {
    await busca('/transferencia', setRows);
	}

	useEffect(() => {
		getTransfer();
	}, []);

	const handleSearch = () => {
		// Lógica para filtrar os dados por período de datas
		const filteredRows = rows.filter((rows) => {
			const rowDate = dayjs(rows.dataTransferencia, 'YYYY/MM/DD');
			if (startSelectedDate && endSelectedDate) {
				return rowDate.isBetween(startSelectedDate, endSelectedDate, 'day', '[]');
			} else if (startSelectedDate !== null) {
				busca(`/transferencia/${startSelectedDate}`, setRows);
				return rowDate.isSame(startSelectedDate, 'day');
			}
			return true;
		});
		console.log(filteredRows);
		console.log(initialRow);
		setRows(filteredRows);
	};


	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles	styles={{body: { backgroundColor: "#121212" }}}/>
			<Box marginTop="9em">
				<Grid container spacing={7}>
					<Grid item xs={6} md={4}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								value={startSelectedDate}
								onChange={date => setStartSelectedDate(date)}
								label="Data de Inicio"
								format="DD/MM/YYYY"
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={6} md={4}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								value={endSelectedDate}
								onChange={date => setEndSelectedDate(date)}
								label="Data de Fim"
								format="DD/MM/YYYY"
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							name="date"
							fullWidth
							label="Nome do operador transacionado"
						></TextField>
					</Grid>
				</Grid>
				<Button fullWidth	onClick={handleSearch}>Pesquisar</Button>
				<DataGrid
					rows={rows}
					columns={columns}
					components={{
						Toolbar: GridToolbar,
					}}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
						sorting: {
							sortModel: [{ field: 'dataTransferencia', sort: 'desc' }],
						},
					}}
					pageSizeOptions={[5, 10]}/>
			</Box>
		</ThemeProvider>
	);
}

export default App;
