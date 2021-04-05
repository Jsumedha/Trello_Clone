import React, { useState, useEffect } from 'react';
import './Modal.scss';

const Popup = ({
    openModal,
    setImage,
    setData,
    saveCardData,
    data,
    index,
    cardHeading,
    setCardHeading,
    listHeading,
    show
}) => {
    const [description, setDescription] = useState('');
    const [cardImages, setCardImages] = useState([]);
    const [editDesc, setEditDesc] = useState(true);
    const [dueDate, setDueDate] = useState();
    const [heading, setHeading] = useState('');


    useEffect(() => {
        setDescription(data.description ? data.description : '');
        setCardImages(data.cardImages ? data.cardImages : []);
        setDueDate(data.dueDate ? data.dueDate : {});
        setHeading(cardHeading);
    }, [data]);


    const onCloseModal = () => {
        const tempData = {
            description: description,
            cardImages: cardImages,
            cardHeading: heading,
            dueDate: dueDate,
        };
        setData(tempData);
        saveCardData(
            { data: tempData, listHeading: listHeading, cardHeading: cardHeading },
            index
        );
        setCardHeading(heading);
        openModal(false);
    };
    const onChangeDesc = (e) => {
        setDescription(e.target.value);
    };

    const saveDesc = (e) => {
        console.log(e);
        setEditDesc(false);
    };

    const onChangeEndDate = (e) => {
        setDueDate({ [e.target.name]: e.target.value });
    };
    const editDescChange = () => {
        setEditDesc(true);
    };
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };
    const onSelectImage = (e) => {
        getBase64(e.target.files[0]).then((base64) => {
            let tempCardImages = [...cardImages];
            tempCardImages.push({ base64, name: e.target.files[0].name });
            setCardImages(tempCardImages);
            if (tempCardImages.length === 1) setImage(base64);
        });
        console.log(e.target.files);
    };
    const onChangeHeading = (e) => {
        setHeading(e.target.value);
    };

    return (
        <div className="modal">
            <div >
                <button className="cross" onClick={onCloseModal}>X</button>
                <div className="image-container">
                    {
                        cardImages && cardImages.length > 0 && (
                            <img className="image" alt="img" src={cardImages[0].base64} />
                        )}
                </div>
                <div>
                    <div>
                        <input
                            value={heading}
                            onChange={onChangeHeading}
                        />
                        <p>
                            in list <span
                            >{listHeading}</span>
                        </p>
                        <div
                        >
                            <h4><i className="fa fa-list-alt" aria-hidden="true"></i><span> Description</span></h4>
                            {!editDesc && (
                                <button
                                    onClick={editDescChange}>
                                    Edit
                                </button>
                            )}
                        </div>
                        {editDesc ? (
                            <div>
                                <textarea placeholder="Enter the description you would like to add"
                                    value={description}
                                    onChange={onChangeDesc}
                                />
                                <br />
                                <button onClick={saveDesc}>Save</button>
                            </div>
                        ) : (
                            <p> {description}</p>
                        )}
                        {cardImages && cardImages.length > 0 && (
                            <div>
                                <h4>
                                    <i className="fa fa-paperclip" aria-hidden="true"></i><span>  Attachment</span>
                                </h4>
                                {cardImages.map((image, index) => (
                                    <div key={index} className="attachments">
                                        <img className="img" src={image.base64} />
                                        <p className="img-name">{image.name}</p>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                    <div>
                        <h4>Add to card</h4>
                        <label>
                            <i class="fa fa-clock-o" aria-hidden="true"></i> Due Date

                            <input
                                type="date"
                                name="endDate"
                                value={dueDate && dueDate.endDate && dueDate.endDate}
                                onChange={onChangeEndDate}
                            />

                        </label>
                        <br />
                        <br />
                        <label>

                            <i className="fa fa-paperclip" aria-hidden="true"></i><span>  Attachment</span>
                            <br />
                            <input
                                type="file"
                                id="myfile"
                                name="myfile"
                                onChange={onSelectImage}
                                hidden
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Popup;