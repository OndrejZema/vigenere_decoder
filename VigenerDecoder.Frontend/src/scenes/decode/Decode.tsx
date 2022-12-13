import React from 'react'
import { Panel } from '../../components/Panel'
import { setMessage } from '../../store/actions/DecoderActions'
import { GlobalContext } from '../../store/GlobalContextProvider'


export const Decode = () => {

    const {decoderState, decoderDispatch} = React.useContext(GlobalContext)

    React.useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/decode`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cryptogram: decoderState.cryptogram, keyLength: decoderState.keyLength, language: decoderState.language})
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
            <div className='font-monospace'>{decoderState.message}</div>

        </Panel>
    )
}