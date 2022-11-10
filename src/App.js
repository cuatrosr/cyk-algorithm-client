import * as React from 'react'
import {CssBaseline} from '@mui/material'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {DataGrid} from '@mui/x-data-grid'
import SendIcon from '@mui/icons-material/Send'
import {generateColumns, generateRows} from './utils/generateTable'
import SimpleAppBar from './components/SimpleAppBar'
import Footer from './components/Footer'
import AButton from './components/AButton'
import ATextField from './components/ATextField'
import {SnackbarProvider} from 'notistack'

const theme = createTheme()

function App() {
    const [dataTable, setDataTable] = React.useState({columns: [], rows: []})
    const [machine, setMachine] = React.useState({amountOfTerminals: 0, string: ''});
    const [open, setOpen] = React.useState(false)
    React.useEffect(() => {
        setOpen(validateBeforeShowMachineTable())
    }, [machine])// eslint-disable-line react-hooks/exhaustive-deps

    const handleFieldChange = (event) => {
        const {name, value} = event.target
        setMachine({...machine, [name]: value});
    };

    const processRowUpdate = React.useCallback(
        (newRow) =>
            new Promise((resolve) => {
                setDataTable({
                    ...dataTable, rows: [
                        ...dataTable.rows.slice(0, newRow.id - 1),
                        newRow,
                        ...dataTable.rows.slice(newRow.id, dataTable.rows.length)
                    ]
                })
                resolve(newRow)
            }),
        [dataTable],
    );

    const validateBeforeShowMachineTable = () => {
        if (machine.amountOfTerminals > 0 && machine.string !== '') {
            const columns = generateColumns(machine.amountOfTerminals)
            const rows = generateRows(columns, machine.amountOfTerminals)
            setDataTable({...dataTable, columns, rows})
            return true
        }
        return false
    }

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <CssBaseline/>
                <SimpleAppBar/>
                <main>
                    <Box sx={{bgcolor: 'background.paper', pt: 8, pb: 6,}}>
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                                CYK
                            </Typography>
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                A partir de una gramática independiente de contexto G
                                y una cadena w se determina si la gramática genera dicha cadena.
                                Recuerda separar Var con el separador '|'.
                            </Typography>
                        </Container>
                    </Box>
                    <Container sx={{flexGrow: 1}} maxWidth={"md"}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <ATextField name={'amountOfTerminals'} label={'Cantidad de Terminales'} type={'number'}
                                            value={machine.amountOfTerminals} handleChange={handleFieldChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ATextField name={'string'} label={'Cadena'} value={machine.string}
                                            handleChange={handleFieldChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6} style={{display: "flex", alignItems: "center"}}>
                                <AButton dataTable={dataTable} string={machine.string} isDisable={!open}
                                         name={'Enviar'} endIcon={<SendIcon/>}></AButton>
                            </Grid>
                        </Grid>
                        <Box sx={{pt: 4, height: '300px'}} maxWidth={"md"}>
                            {open && (
                                <DataGrid rows={dataTable.rows} columns={dataTable.columns}
                                          processRowUpdate={processRowUpdate}
                                          experimentalFeatures={{newEditingApi: true}}/>
                            )}
                        </Box>
                    </Container>
                </main>
                <Footer/>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
