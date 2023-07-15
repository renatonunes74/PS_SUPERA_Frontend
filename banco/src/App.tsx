import React, { useState, useEffect } from 'react';
import { HelpCenter } from '@mui/icons-material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridColDef, GridValueFormatterParams, GridToolbar } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider, Paper, CssBaseline, Typography, createTheme, Grid, Button, Box, TextField, Tooltip } from '@mui/material';
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
		type: 'Data',
		flex: 1,
		valueFormatter: (params) => {
			const dataTransferencia = params.value as string;
			const localDate = new Date(dataTransferencia).toLocaleDateString();
			return dayjs(new Date(localDate)).format('DD/MM/YYYY');
		},
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

	const [endSelectedDate, setEndSelectedDate] = useState(null);
	const [nomeOperador, setNomeOperador] = useState("");
	const [rows, setRows] = useState(initialRow);
	const [saldoTotal, setSaldoTotal] = useState(0);
	const [saldoTotalPeriodo, setSaldoTotalPeriodo] = useState(0);
	const [startSelectedDate, setStartSelectedDate] = useState(null);
	const [isEndDateEnabled, setIsEndDateEnabled] = useState(false);


	async function getTransfer() {
		const resposta = await busca('/transferencias', setRows);
		let saldo = 0;
		resposta.forEach((transferencia: any) => {
			saldo += transferencia.valor;
		});
		setSaldoTotal(saldo);
	}

	useEffect(() => {
		getTransfer();
		}, []);

	useEffect(() => {
		saldoPeriodo();
		}, [rows]);

	function saldoPeriodo() {
		let saldo = 0;
		rows.forEach((transferencia) => {
			if (transferencia.valor !== null) {
				saldo += transferencia.valor;
			}
		})
		setSaldoTotalPeriodo(saldo);
	}

	const handleSearch = () => {
			if (startSelectedDate !== null && endSelectedDate !== null && nomeOperador !== "") {
				busca(`/transferencias/filtro?inicio=${dayjs(startSelectedDate).format('YYYY-MM-DD')}&fim=${dayjs(endSelectedDate).format('YYYY-MM-DD')}&operador=${nomeOperador}`, setRows)
			} else if (startSelectedDate !== null && endSelectedDate !== null) {
				busca(`/transferencias/filtro?inicio=${dayjs(startSelectedDate).format('YYYY-MM-DD')}&fim=${dayjs(endSelectedDate).format('YYYY-MM-DD')}`, setRows)
			} else if (nomeOperador !== "") {
				busca(`/transferencias/operador/${nomeOperador}`, setRows)
		};
	};

	const handleStartDateChange = (date: any) => {
		setStartSelectedDate(date);
		if (date !== null && date.toString().length >= 6) {
			setIsEndDateEnabled(true);
		} else {
			setIsEndDateEnabled(false);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box margin="9em">
				<Grid container spacing={7}>
					<Grid item xs={6} md={4}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								value={startSelectedDate}
								onChange={(date) => { 
									setStartSelectedDate(date)
									handleStartDateChange(date)
								}}
								label="Data de Inicio"
								format="DD/MM/YYYY"
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={6} md={4}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								value={endSelectedDate}
								onChange={(date) => setEndSelectedDate(date)}
								label="Data de Fim"
								disabled={!isEndDateEnabled}
								format="DD/MM/YYYY"
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							value={nomeOperador}
							name="date"
							fullWidth
							label="Nome do operador transacionado"
							onChange={(nome) => setNomeOperador(nome.target.value)}/>
					</Grid>
				</Grid>
				<Grid container justifyContent="center" alignItems="center">
					<Button onClick={handleSearch}>Pesquisar</Button>
					<Box textAlign="right">
						<Tooltip title={<>
							<Typography variant="body2">
							- Pesquise por período de datas (inicio e fim)
							</Typography>
							<Typography variant="body2">
							- Pesquise por período de datas (inicio e fim) e nome do operador
							</Typography>
							<Typography variant="body2">
							- Pesquise apenas pelo nome do operador
							</Typography>
							<Typography variant="body2">
							- A tabela do MUI tem diversas opções adicionais de filtragem
							</Typography>
						</>}>
							<HelpCenter/>
						</Tooltip>
					</Box>
				</Grid>
				<Grid container>
					<Grid item xs={4}>
						<Typography variant="body1">
							Saldo total: {saldoTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
						</Typography>
						<Typography variant="body1">
							Saldo no período: {saldoTotalPeriodo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
						</Typography>
					</Grid>
					<Grid item xs={8} textAlign="right">
						<Button
							onClick={() => {
								setStartSelectedDate(null);
								setEndSelectedDate(null);
								setNomeOperador("");
								getTransfer()
								}
							}>Limpar todos os campos</Button>
					</Grid>
				</Grid>
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
