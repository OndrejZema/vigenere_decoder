import React from 'react'
import { Form } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'


interface DynamicInputPanelProps {
    showFileInput: boolean
    textValue: string
    onUploadCryptogram: (files: Array<File>)=>void
    onChangeText: (cryptogram: string)=>void
}

export const DynamicInputPanel = (props: DynamicInputPanelProps) => {

    const onDrop = React.useCallback((files: Array<File>) => {
        props.onUploadCryptogram(files)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    return props.showFileInput ?
        <div {...getRootProps()}  className="d-flex justify-content-center file-input mt-2 mb-2">
            <input {...getInputProps()} />
            Přetáhni sem soubory
        </div>
        :
        <div>
            <Form.Control as="textarea" 
            className='mt-2 mb-2' 
            rows={5} 
            onChange={(e)=> props.onChangeText(e.target.value)}
            value={props.textValue}
            >
            </Form.Control>
        </div>
}
