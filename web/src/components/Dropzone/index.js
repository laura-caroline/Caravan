import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import './style.css'


const Dropzone = ({defaultImage, callbackSelectedFile})=> {
  const [image, setImage] = useState('')

  useEffect(()=>{
    if(!image){
      return setImage(defaultImage)
    }
  },[defaultImage]) 

  const onDrop = useCallback(acceptedFiles => {
    const imageSelected =  URL.createObjectURL(acceptedFiles[0])
    
    setImage(imageSelected)
    callbackSelectedFile(acceptedFiles[0])
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})
  
  return (
    <div className="dropzone"{...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      
      {image ?(
        <img src={image}/>
      ):(
        <p>Coloque a imagem do passeio clicando aqui</p>
      )}
    </div>
  )
}
export default Dropzone