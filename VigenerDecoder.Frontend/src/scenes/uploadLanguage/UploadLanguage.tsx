import React from 'react'
import { Button, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel } from '../../components/Panel'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { GlobalContext } from '../../store/GlobalContextProvider';
import { setLanguageFile } from '../../store/actions/DecoderActions';

export const UploadLanguge = () => {

    const {decoderState, decoderDispatch} = React.useContext(GlobalContext)

    const onDrop = React.useCallback((files: Array<File>) => {
        setLanguageFile(decoderDispatch, files)
    
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const [visibleToolTip, setVisibleToolTip] = React.useState<boolean>(false)
    const btn = React.useRef(null)

    return (
        <Panel>
            <div className="d-flex justify-content-between align-items-center">
                <h2>Nahrání jazyka</h2>
                <OverlayTrigger placement='left'
                    overlay={<Tooltip>
                        Pro možné dekódování zašifrovaného textu je potřeba poskytnout frekvenční analýzu požadovaného jazyka
                    </Tooltip>
                    }>
                    <Button ref={btn} className="rounded-circle" variant='outline-secondary'
                        onClick={() => { setVisibleToolTip(!visibleToolTip) }}
                    > <FontAwesomeIcon icon={faQuestion} /></Button>
                </OverlayTrigger>

            </div>

            <hr />

            <div {...getRootProps()} className="d-flex justify-content-center file-input mt-2 mb-2">
                <input {...getInputProps()} />
                Přetáhni sem soubory
            </div>
            {decoderState.languageFile ?
                <div>
                    <div className='font-thick'> Nahranný soubor </div>
                    <div className='font-monospace'>{decoderState.languageFile.name}</div>
                </div>
                :
                ""
            }

            <div className="d-flex justify-content-end">
                <Link to={decoderState.language === ""?"":"/result"}>
                    <Button disabled={decoderState.language === ""}>
                        Odeslat jazykovou analýzu 
                    </Button>
                </Link>
            </div>

        </Panel>
    )
}