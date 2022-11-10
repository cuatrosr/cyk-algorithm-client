import * as React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import {validateMachineData} from '../validation/validateMachine'
import {adapterFromClient} from '../adapter/adapter'
import axios from 'axios'
import {useSnackbar} from 'notistack'

const AButton = ({dataTable, string, isDisable, name, endIcon}) => {
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async () => {
        try {
            if (validateMachineData(dataTable.rows)) {
                setLoading(true)
                const json = adapterFromClient(dataTable.rows, dataTable.columns, string)
                const headers = {'Content-Type': 'application/json'}
                const response = await axios.post(`http://localhost:8080/cyk`, json, {headers: headers})
                const msg = (response.data.response) ? 'La gramática SI genera esa cadena' : 'La gramática NO genera esa cadena';
                enqueueSnackbar(msg, {variant: 'success'})
                setLoading(false)
            } else {
                enqueueSnackbar('Todos los campos son requeridos y en su respectivo formato', {variant: 'warning'})
            }
        } catch (error) {
            console.log(error)
            enqueueSnackbar('Server Error', {variant: 'error'})
            setLoading(false)
        }
    }

    return (
        <LoadingButton disabled={isDisable} style={{width: '100%'}} loading={loading} onClick={handleSubmit}
                       variant="contained" color={"secondary"} endIcon={endIcon}>{name}</LoadingButton>
    )
}

export default AButton