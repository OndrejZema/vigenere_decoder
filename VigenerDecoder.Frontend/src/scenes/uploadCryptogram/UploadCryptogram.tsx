import React from 'react'
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Panel } from '../../components/Panel'
import { setCryptogramFile, setCryptogramText } from '../../store/actions/DecoderActions'
import { GlobalContext } from '../../store/GlobalContextProvider'
import { DynamicInputPanel } from './components/DynamicInputPanel'


export const UploadCryptogram = () => {

    const [showFileInput, setShowFileInput] = React.useState<boolean>(false)

    const { decoderState, decoderDispatch } = React.useContext(GlobalContext)


    const handleUploadCryptogram = (files: Array<File>) => {
        setCryptogramFile(decoderDispatch, files)
    }
    const handleChangeText = (cryptogram: string) => {
        setCryptogramText(decoderDispatch, cryptogram)
    }

    return (
        <Panel>
            <h2>Nahrání textu k dešifrování</h2>
            <hr />
            <ButtonGroup>
                <ToggleButton id="tgBtn-1" type='radio' variant='secondary' value={1} checked={showFileInput} onChange={() => { setShowFileInput(true) }}>
                    Nahrát soubor
                </ToggleButton>

                <ToggleButton id="tgBtn-2" type='radio' variant='secondary' value={2} checked={!showFileInput} onChange={() => { setShowFileInput(false) }}>
                    Vložit text
                </ToggleButton>

            </ButtonGroup>

            <DynamicInputPanel textValue={decoderState.cryptogram} showFileInput={showFileInput} onUploadCryptogram={handleUploadCryptogram} onChangeText={handleChangeText} />
            {decoderState.cryptogramFile && showFileInput ?
                <div>
                    <div className='font-thick'> Nahranný soubor </div>
                    <div className='font-monospace'>{decoderState.cryptogramFile.name}</div>
                </div>
                :
                ""
            }
            <div className='d-flex justify-content-end'>
                <Link to={decoderState.cryptogram === ""?"":'/language'}  >
                    <Button disabled={decoderState.cryptogram === ""}>Přejít na zadávání abecedy</Button>
                </Link>
            </div>
        </Panel>
    )
}