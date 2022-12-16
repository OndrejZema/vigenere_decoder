import React from 'react'
import { Panel } from '../../components/Panel'
import { setMessage } from '../../store/actions/DecoderActions'
import { GlobalContext } from '../../store/GlobalContextProvider'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { createNotification } from '../../store/actions/NotificationsActions'
import { isVariableDeclaration } from 'typescript'
import { time } from 'console'


export const Decode = () => {

    const { decoderState, decoderDispatch, notificationsDispatch } = React.useContext(GlobalContext)

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/decode`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cryptogram: decoderState.cryptogram, keyLength: decoderState.keyLength, language: decoderState.language })
        })
            .then(data => data.json())
            .then(json => setMessage(decoderDispatch, json))
            .catch()
    }, [])

    return (
        <Panel loading={decoderState.message === ""}>
            <h2>Dekódovaná zpráva</h2>
            <hr />
            <div>Rozkódovaná zpráva</div>
            <Form.Control as="textarea" className='mt-2 mb-2' rows={5} value={decoderState.message} wrap='true' readOnly={true}>
            </Form.Control>
            <div className='d-flex justify-content-between'>
                <Link to="/result">
                    <Button>Zpět</Button>
                </Link>
                <Button onClick={()=>{
                    navigator.clipboard.writeText(decoderState.message)
                    createNotification(notificationsDispatch, "Úspěšné zkopírování", "Dešifrovaný text byl úspěšně překopírován do schránky", "success", 1000)
                }}>Zkopírovat do schránky</Button>
            </div>

        </Panel>
    )
}