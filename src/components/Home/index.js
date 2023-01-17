import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNumber
} from "../../redux/numberSlice";
import ListNumber from "../ListNumber";
import { Box, Button, TextField } from '@mui/material';
import ShortUniqueId from 'short-unique-id';
import { EditText } from 'react-edit-text';
import {
  deleteNumber, updateNumber
} from "../../redux/numberSlice";

export default function Home() {
  const [value, setValue] = useState()
  const [valueErr, setValueErr] = useState()
  const dispatch = useDispatch();
  const numbers = useSelector((state) => state.number.listNumber);

  const [test, setTest] = useState(numbers)



  const handleAddNumber = (e) => {
    e.preventDefault()
    var uid = new ShortUniqueId();
    if (!value) {
      setValueErr("Please enter a value")
      return;
    }
    if (value && value.trim().length !== 4) {
      setValueErr("Length must equal 4")
      return;
    }
    setValue('')
    setValueErr()
    dispatch(addNumber({ value, id: uid() }))
  }
  const handleUpdateNumber = ({ name, value }) => {
    dispatch(updateNumber({ id: name, value }))
  }

  const handleDeleteNumber = (number) => {
    dispatch(deleteNumber({ number }))
  }
  const handleChangeValue = (e) => {
    const text = (e.target.value).trim();
    const members = text.length > 1
      ? test.filter((number) => number.value.toLowerCase().includes(text.toLowerCase()))
      : numbers;

    setValue(e.target.value)
    setTest(members)
  }
  console.log("test----" , test)

  return (
    <Box>
      <h1> Kết quả sổ xố</h1>
      <h3> Tổng các số đã nhập : {numbers?.length} </h3>
      <Box style={{ display: 'flex', textAlign: 'center', flexDirection: 'row', marginTop: '30px', marginLeft: '20px' }}>
        <TextField
          type="text"
          name="name"
          value={value}
          onChange={handleChangeValue}
          placeholder="Nhập số"
        />
        <Button style={{ marginLeft: '10px' }} variant="contained" onClick={handleAddNumber}> Add </Button>
      </Box>
      {
        numbers?.length === 0 && <h1> Chưa có dữ liệu</h1>
      }
      <h1> {valueErr} </h1>
      <Box>
        {
          test?.map((number) => {
            return (
              <Box style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' , marginLeft: '20px'}}>
                <EditText
                  name={number.id}
                  defaultValue={number.value}
                  onSave={handleUpdateNumber}
                  style={{ border: '1px solid black', width: '100px', height: '30px', textAlign: 'center', fontSize: '20px' }}
                />
                <Button
                  variant="contained" color="error"
                  style={{ marginLeft: '20px' }}
                  onClick={() => handleDeleteNumber(number)}
                >
                  Xoá
                </Button>
              </Box>
            )
          })
        }
        { test.length === 0 && < h1> Không tìm thấy kết quả</h1>}
      </Box>
    </Box>
  );
}
