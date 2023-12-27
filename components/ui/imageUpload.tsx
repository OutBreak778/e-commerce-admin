"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './button';
import { ImagePlus, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import {CldUploadWidget} from "next-cloudinary"

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({disabled, onChange, onRemove, value}) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    },[])


    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    if(!isMounted) {
        return null
    }



  return (
    <div>
        <div className="mb-4 flex items-center gap-4">
            {value.map((url) => (
                <div className='relative w-[200px] h-[200px] rounded-md overflow-hidden' key={url}>
                    <div className="z-10 absolute top-2 right-2">
                        <Button type='button' onClick={() => onRemove(url)} variant="destructive">
                            <Trash className='w-4 h-4' />
                        </Button>
                    </div>
                    <Image fill sizes="100px" className='onject-cover' alt='Image' src={url} />
                </div>
            ))}
        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset='xr5bda98'>
                {
                    ({open}) => {
                        const onClick = () => {
                            open()
                        }
                    
                    return(
                        <Button variant="secondary" disabled={disabled} type='button' onClick={onClick}>
                            <ImagePlus className='w-4 h-4' />
                            Upload Image
                        </Button>
                    )

                    }
                }
        </CldUploadWidget>
        
    </div>
  )
}

export default ImageUpload