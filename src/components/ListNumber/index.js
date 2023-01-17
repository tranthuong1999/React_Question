import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { EditText } from 'react-edit-text';
import { Box, Button , TextField } from '@mui/material';
import {
    deleteNumber, updateNumber
} from "../../redux/numberSlice";

const ListNumber = () => {
    const dispatch = useDispatch()
    const listNumber = useSelector((state) => state.number.listNumber);


    const handleUpdateNumber = ({ name, value }) => {
        dispatch(updateNumber({ id: name, value }))
    }

    const handleDeleteNumber = (number) => {
        dispatch(deleteNumber({ number }))
    }
    return (
        <>
            {
                listNumber?.map((number) => {
                    return (
                        <Box style={{ display: 'flex', flexDirection: 'row' , marginTop:'20px' }}>
                            <EditText
                                name={number.id}
                                defaultValue={number.value}
                                onSave={handleUpdateNumber}
                                style={{ border : '1px solid black' , width : '100px' , height:'30px' , textAlign:'center' , fontSize:'20px'}}
                            />
                            <Button
                                variant="contained" color="error"
                                style={{ marginLeft: '20px' }}
                                onClick={() => handleDeleteNumber(number)}>
                                Xoá
                            </Button>
                        </Box>

                    )
                })
            }
        </>
    )
}

export default ListNumber