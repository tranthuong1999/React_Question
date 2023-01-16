import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNumber, filterNumber
} from "../../redux/numberSlice";
import ListNumber from "../ListNumber";
import { Box, Button, TextField } from '@mui/material';
import ShortUniqueId from 'short-unique-id';

export default function Home() {
  const [value, setValue] = useState()
  const [valueErr, setValueErr] = useState()
  const [valueFilter, setValueFilter] = useState()
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.number.filterNumber);
  const numbers = useSelector((state) => state.number.listNumber);



  const handleAddNumber = (e) => {
    e.preventDefault()
    const test = numbers.find(e => e.value.includes(value))
    var uid = new ShortUniqueId();
    if (!value) {
      setValueErr("Please enter a value")
      return;
    }
    if (value && value.trim().length !== 4) {
      setValueErr("Length must equal 4")
      return;
    }
    if (test) {
      setValueErr(" con số đã tồn tại")
      return;
    }
    console.log(test)
    setValue('')
    setValueErr()
    dispatch(addNumber({ value, id: uid() }))
  }
  const handleChangeValue = (e) => {
    setValue(e.target.value)
  }
  const handleFilterNumber = () => {
    if (!value) {
      setValueFilter("Please enter a value")
      return;
    }
    if (value && value.trim().length !== 4) {
      setValueFilter("Length must equal 4")
      return;
    }
    setValueFilter()
    dispatch(filterNumber({ value }))
  }

  return (
    <Box>
      <Box style={{ display: 'flex', textAlign: 'center', flexDirection: 'row', marginTop: '30px', marginLeft: '20px' }}>
        <label style={{ fontSize: '30px' }}>
          Nhập con số may mắn :
        </label>
        <TextField
          type="text"
          name="name"
          value={value}
          onChange={handleChangeValue}
          style={{ width: '40%', height: "30%" }}
        />
        <Button onClick={handleAddNumber}> Add </Button>
        <Button onClick={handleFilterNumber}> Filter </Button>
      </Box>
      <h1> {valueErr} </h1>
      <Box
        style={{
          fontSize: '30px',
          textAlign: 'center', marginTop: '100px',
        }}>
        <ListNumber />
      </Box>
      <h1> Danh sách đã lọc :</h1>
      <Box>
        <h1> {valueFilter}</h1>
        {
          filter.length > 0 ?
            (filter?.map((value) => {
              return (
                <h1> Bạn đã trúng thưởng :{value.value}</h1>
              )
            })) : (<h1> Chúc bạn may mắn lần sau</h1>)
        }
      </Box>
    </Box>
  );
}
