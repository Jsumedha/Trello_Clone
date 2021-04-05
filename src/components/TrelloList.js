import React, { useState, useEffect } from 'react';
import TrelloCard from './TrelloCard';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/icon';
import Aux from '../hoc/Auxiliary/Auxiliary';
import './TrelloList.scss';



const TrelloList = ({ heading, index }) => {
    const [listHeading, setListHeading] = useState('');
    const [editListHeading, setEditListHeading] = useState(false);
    const [addCard, setAddCard] = useState(true);
    const [cardList, setCardList] = useState([]);
    const [cardHeading, setCardHeading] = useState('');


    useEffect(() => {
        setListHeading(heading);
        let tempCardList = JSON.parse(localStorage.getItem(heading));
        console.log(tempCardList);
        if (tempCardList) setCardList(tempCardList);
    }, [heading]);



    useEffect(() => {
        localStorage.setItem(listHeading, JSON.stringify(cardList));
    }, [cardList]);

    const onClickListHeading = () => {
        localStorage.removeItem(listHeading);
        setEditListHeading((prev) => !prev);
    };

    const onChangeListHeading = (e) => {
        setListHeading(e.target.value);
    };
    const onSaveListHeading = (e) => {
        if (e.keyCode === 13) {
            setEditListHeading((prev) => !prev);
            let tempLists = JSON.parse(localStorage.getItem('ListsName'));
            tempLists.splice(index, 1, listHeading);
            localStorage.setItem('ListsName', JSON.stringify(tempLists));
            localStorage.setItem(listHeading, JSON.stringify(cardList));
        }
    };

    const handleAddCard = () => {
        setAddCard((prev) => !prev);
    };


    const handleCardHeading = (e) => {
        setCardHeading(e.target.value);
    };

    const onClickAddCard = () => {
        if (cardHeading.length < 1) return alert('Enter some card text');
        let tempCards = [...cardList];
        tempCards.push({ cardHeading: cardHeading, data: {} });
        setCardHeading('');
        setCardList(tempCards);
        localStorage.setItem(listHeading, JSON.stringify(tempCards))
    };

    const saveData = (data, id) => {
        let tempListData = [...cardList];
        console.log(tempListData);
        tempListData.splice(id, 1, data);
        setCardList(tempListData);
        localStorage.setItem(listHeading, JSON.stringify(tempListData));
    };


    return (
        <div>
            <div className="list-container">
                {editListHeading ? (
                    <input className="editListTitle"
                        value={listHeading}
                        onChange={onChangeListHeading}
                        onKeyDown={onSaveListHeading}
                        onBlur={onSaveListHeading}
                        autoFocus
                    />
                ) : (
                    <p onClick={onClickListHeading}>{listHeading}</p>
                )}
                <div className="card">
                    {cardList &&
                        cardList.length > 0 &&
                        cardList.map((card, key) => (
                            <div className="cards-margin">
                                <TrelloCard
                                    key={key}
                                    card={card}
                                    index={key}
                                    saveData={saveData}
                                    listHeading={listHeading}
                                />
                            </div>
                        ))}
                </div>
                <div>
                    {addCard ? (
                        <span className="addcardspan" onClick={handleAddCard}>
                            + Add a card
                        </span>
                    ) : (
                        <Aux>
                            <input
                                className="addcard"
                                type="textarea"
                                placeholder="Enter a title for this card..."
                                onChange={handleCardHeading}
                                value={cardHeading}
                                autoFocus
                            />
                            <br />
                            <Button
                                onClick={onClickAddCard}
                                variant="contained"
                                style={{ color: 'white', backgroundColor: '#5aac44' }}>Add card</Button>
                            <Icon onClick={handleAddCard} style={{ marginLeft: 10, marginTop: 15, cursor: 'pointer' }}>x</Icon>
                        </Aux>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrelloList;
