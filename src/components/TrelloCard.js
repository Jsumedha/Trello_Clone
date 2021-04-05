import React, { useState, useEffect } from 'react';
import Aux from '../hoc/Auxiliary/Auxiliary';
import './TrelloList.scss';
import Popup from './Modal';
import './TrelloCard.scss';

const TrelloCard = ({
    card,
    index,
    saveData,
    listHeading,
}) => {
    const [cardHeading, setCardHeading] = useState(card.cardHeading);
    const [openModal, setOpenModal] = useState(false);
    const [cardImage, setCardImage] = useState('');
    const [data, setData] = useState({});
    const [editCardHeading, setEditCardHeading] = useState(false);


    useEffect(() => {
        if (card.data) {
            console.log(card.data);
            card.data &&
                card.data.cardImages &&
                card.data.cardImages.length > 0 &&
                setCardImage(card.data.cardImages[0].base64);
            setData(card.data);
        }
    }, [card]);


    const onChangeCardHeading = (e) => {
        setCardHeading(e.target.value);
    };
    const onSaveCardHeading = (e) => {
        if (e.keyCode === 13)
            setEditCardHeading(false);
    };
    const handleModal = (val) => {
        setOpenModal(val);
    };

    const onEditCardHeading = (e) => {
        setEditCardHeading((prev) => !prev);
    };

    return (
        <Aux>


            {openModal && (
                <Popup
                    index={index}
                    openModal={handleModal}
                    setImage={setCardImage}
                    data={card.data}
                    setData={setData}
                    saveCardData={saveData}
                    cardHeading={cardHeading}
                    setCardHeading={setCardHeading}
                    listHeading={listHeading}
                    show={handleModal}
                />
            )}
            <div className="editcard">
                <span onClick={onEditCardHeading} >
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
            </div>
            <div className="eachcard"
                onClick={() => handleModal(true)}
            >
                <div className="image-editor">
                    {cardImage && <img className="card-img" alt="img" src={cardImage} />}
                </div>
                {editCardHeading ? (
                    <input
                        className="input-editing"
                        value={cardHeading}
                        onChange={onChangeCardHeading}
                        onKeyDown={onSaveCardHeading}
                        onBlur={onSaveCardHeading}
                        autoFocus
                    />
                ) : (

                    <div className="cardlayout">
                        <p className="cardstyle">{cardHeading} </p>
                    </div>

                )}
                <div className="icon-layout">
                    {data.cardImages && data.cardImages.length > 0 && (
                        <div>
                            <i className="fa fa-paperclip"></i>
                            <span> {data.cardImages.length}</span>
                        </div>
                    )}

                    {data.description && (
                        <div>
                            <i class="fa fa-list" aria-hidden="true"></i>
                        </div>
                    )}

                    {data.dueDate && Object.keys(data.dueDate).length > 0 && (
                        <div>
                            <i class="fa fa-clock-o" aria-hidden="true"></i>
                            {data.dueDate.endDate && <span>{data.dueDate.endDate}</span>}
                        </div>
                    )}
                </div>
            </div>
        </Aux >
    );
};

export default TrelloCard;