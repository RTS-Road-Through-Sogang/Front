import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "antd"
import { Link } from "react-router-dom"
import Axios from "axios"
import { PlusCircleOutlined } from "@ant-design/icons"
import DetailList from "./Sections/DetailList"

const CreateListDiv = styled.div`
  padding: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const CreateList = () => {
  const [countList, setCountList] = useState([0])

  const onAddDetailDiv = () => {
    let countArr = [...countList]
    let counter = countArr.slice(-1)[0]
    counter += 1
    countArr.push(counter)	// index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
    setCountList(countArr)
  }

  return (
    <CreateListDiv>
      <DetailList countList={countList} />
      <Button onClick={onAddDetailDiv}>
        <PlusCircleOutlined />추가
      </Button>
    </CreateListDiv>
  )
}
export default CreateList