// Need this because we are listening for a click event from the user
// An event cannot be pre-rendered on the server for obvious reasons
'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
    const [ selectedImage, setSelectedImage ] = useState();
    const imageInput = useRef();

    function handleSelectImage() {
        imageInput.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            setSelectedImage(null);
            return;
        }

        const fileReader = new FileReader();
        
        fileReader.onload = () => {
            // This is how you access the URL of the file
            setSelectedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!selectedImage && <p>No image selected yet.</p>}
                    {selectedImage && (
                        <Image 
                            src={selectedImage}
                            alt="The image selected by the user."
                            fill
                        />
                    )}
                </div>
                <input 
                    className={classes.input}
                    type="file" 
                    id={name} 
                    accept="image/png, image/jpeg" 
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                />
                <button className={classes.button} type="button" onClick={handleSelectImage}>
                    Select an Image
                </button>
            </div>
        </div>
    )
}