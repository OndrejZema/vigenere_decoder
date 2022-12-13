import React from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Panel } from '../../components/Panel'
import { setKeyLength, setKeysLength } from '../../store/actions/DecoderActions'
import { GlobalContext } from '../../store/GlobalContextProvider'


export const Result = () => {

    const { decoderState, decoderDispatch } = React.useContext(GlobalContext)

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/key/length`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cryptogram: decoderState.cryptogram, language: decoderState.language })
        }).then(data => data.json()).then(json => setKeysLength(decoderDispatch, json["keysLength"]))
    }, [])

    return (
        <Panel loading={decoderState.keysLength.length === 0}>
            <h2>Výsledek analýzy</h2>
            <hr />
            <Table bordered={true} striped>
                <thead>
                    <tr>
                        <th>Název testu</th>
                        <th>Výsledek testu</th>
                    </tr>
                </thead>
                <tbody>
                    {decoderState.keysLength.map(item => {
                        return <tr key={`${item.name}${item.value}`}><td>{item.name}</td><td>{item.value}</td></tr>
                    })}
                </tbody>
            </Table>
            <Form.Label>Délka klíče pro analýzu</Form.Label>
            <Form.Control type='number' onChange={e => setKeyLength(decoderDispatch, parseInt(e.target.value))} />
            <div className='d-flex justify-content-end mt-2'>
                <Link to="/decode">
                    <Button>Dekódovat zprávu</Button>
                </Link>
            </div>
        </Panel>
    )
}