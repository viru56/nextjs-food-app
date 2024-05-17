'use client';
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name}) {
    const imageInput = useRef();
    const [pickedImage, setpickedImage] = useState(null);
    const handlePickClick = () => {
        imageInput.current.click();
    }
    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        if(!file){
            setpickedImage(null);
            return;
        }
        const fileReader = new FileReader();

        fileReader.onload = () => {
            setpickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>
                {label}
            </label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet</p>}
                    {pickedImage && <Image
                    src={pickedImage}
                    alt="user seleted iamge"
                    fill
                    />}
                </div>
                <input 
                onChange={handleImageChange} 
                ref={imageInput} 
                className={classes.input} 
                type='file' 
                id={name} 
                name={name} 
                required
                accept='image/png image/jpeg' />
                <button onClick={handlePickClick} type='button' className={classes.button}> Pick your Image</button>
            </div>
        </div>
    )
}