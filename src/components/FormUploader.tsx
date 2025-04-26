import React, { useCallback } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

function FormUploader({ fieldChange, mediaUrl }: FileUploaderProps) {
  const [fileUrl, setFileUrl] = React.useState(mediaUrl)
  const [file, setFile] = React.useState<File[]>([]);

  

  const onDrop = useCallback((acceptedFiles : FileWithPath[] ) => {
      setFile(acceptedFiles)
      fieldChange(acceptedFiles)
      setFileUrl(URL.createObjectURL(acceptedFiles[0]))

      
    }, [file])
    const {getRootProps, getInputProps} = useDropzone({onDrop,
      accept:{
          'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
      }
    })

  return (
    <div
      {...getRootProps()}
      className="d-flex flex-column align-items-center justify-content-center p-4 border border-secondary rounded cursor-pointer bg-light"
      style={{ minHeight: '300px', textAlign: 'center' }}
    >
      <input {...getInputProps()} className="d-none" />

      {fileUrl ? (
        <>
          <div className="w-100 d-flex justify-content-center p-3">
            <img
              src={fileUrl}
              alt="file"
              className="img-fluid"
              style={{ maxHeight: '250px', objectFit: 'contain' }}
            />
          </div>
          <p className="text-muted">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="text-center">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={76}
            alt="file-upload"
            className="mb-3"
          />
          <h5 className="mb-2">Drag Photo Here</h5>
          <p className="text-muted mb-3">SVG, PNG, JPG</p>
          <button
            type="button"
            className="btn btn-outline-secondary px-4 py-2"
          >
            Select from computer
          </button>
        </div>
      )}
    </div>
  );
}

export default FormUploader;
