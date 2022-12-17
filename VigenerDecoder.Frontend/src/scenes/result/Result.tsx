import { faArrowLeft, faGears } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Panel } from '../../components/Panel'
import { setKeyLength, setKeysLength } from '../../store/actions/DecoderActions'
import { createNotification } from '../../store/actions/NotificationsActions'
import { GlobalContext } from '../../store/GlobalContextProvider'


export const Result = () => {

    const navigate = useNavigate()

    const { decoderState, decoderDispatch, notificationsDispatch } = React.useContext(GlobalContext)

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/key/length`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cryptogram: decoderState.cryptogram, language: decoderState.language })
        })
        .then(data => {
            if(!data.ok){
                throw Error(`Error : ${data.statusText}`)
            }
            return data.json()
        })
        .then(json => setKeysLength(decoderDispatch, json["keysLength"]))
        .catch(err => {
            createNotification(notificationsDispatch, "Error", "Nastala chyba u výpočtu délky klíčů. Jsou všechny parametry správné?", "danger")
            navigate("/")
        })
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
            <div className='d-flex justify-content-between mt-2'>
            <Link to="/language">
                    <Button>
                    <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
                        Zpět na zadávání jazyka
                        </Button>
                </Link>

                <Link to="/decode">
                    <Button>
                    <FontAwesomeIcon icon={faGears} className="me-1" />
                        Dekódovat zprávu
                        </Button>
                </Link>
            </div>
        </Panel>
    )
}