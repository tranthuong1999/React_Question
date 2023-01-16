import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { EditText } from 'react-edit-text';
import { Box, Button } from '@mui/material';
import {
    deleteNumber, updateNumber
} from "../../redux/numberSlice";

const ListNumber = () => {
    const dispatch = useDispatch()
    const listNumber = useSelector((state) => state.number.listNumber);


    const handleUpdateNumber = ({ name, value }) => {
        dispatch(updateNumber({id : name , value}))
    }

    const handleDeleteNumber = (number) => {
        dispatch(deleteNumber({ number }))
    }
    return (
        <>
            {
                listNumber?.map((number) => {
                    return (
                        <Box style={{ display: 'flex', flexDirection: 'row' }}>
                            <EditText
                                name={number.id}
                                defaultValue={number.value}
                                onSave={handleUpdateNumber}
                            />
                            <span
                                style={{ marginLeft: '10px' }}
                                onClick={() => handleDeleteNumber(number)}> &times;
                            </span>
                        </Box>

                    )
                })
            }
        </>
    )
}

export default ListNumber