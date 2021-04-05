import React, { useEffect, useState } from 'react';
import Aux from '../hoc/Auxiliary/Auxiliary';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/icon';
import TrelloList from './TrelloList';
import './TrelloLists.scss';



const TrelloLists = () => {
    const [addList, setAddList] = useState(true);
    const [heading, setHeading] = useState('');
    const [lists, setLists] = useState([]);


    useEffect(() => {
        let tempLists = JSON.parse(localStorage.getItem('ListsName'));
        console.log(tempLists);
        if (tempLists) setLists(tempLists);
    }, []);


    const handleAddList = (e) => {
        setAddList((prevState) => !prevState);
    };

    const handleHeading = (e) => {
        setHeading(e.target.value);
    };

    const onClickAddList = (e) => {
        if (heading.length < 1) return alert('Enter a valid list title');
        let tempList = [...lists];
        tempList.push(heading);
        setHeading('');
        setLists(tempList);
        localStorage.setItem('ListsName', JSON.stringify(tempList));
        fetch('https://trello-74dc7-default-rtdb.firebaseio.com/lists.json', {
            method: 'POST',
            body: JSON.stringify(tempList),
            headers: { 'Content-Type': 'application.json' }
        })
    };

    return (
        <Aux>
            <div className="layout">
                {lists &&
                    lists.length > 0 && lists.map((list, index) => <TrelloList
                        key={index}
                        heading={list}
                        index={index} />)}
            </div>
            <div>
                {addList ? (
                    <span className="Addlist" onClick={handleAddList}>+ Add Another List</span>
                )
                    : (
                        <div className="newlist">
                            <input
                                className="titletext"
                                placeholder="Enter list title..."
                                onChange={handleHeading}
                                value={heading}
                                autoFocus
                            />
                            <br />
                            <Button
                                onClick={onClickAddList}
                                variant="contained"
                                style={{ color: 'white', backgroundColor: '#5aac44' }}>Add List</Button>
                            <Icon onClick={handleAddList} style={{ marginLeft: 10, marginTop: 15, cursor: 'pointer' }}>x</Icon>
                        </div>
                    )}
            </div>
        </Aux>
    );
};

export default TrelloLists;