//import React from 'react'
import styled from "styled-components"
import mountain from '../assets/mountain1.1.jpg'

const Button = styled.button`
background-color: lightgreen ;
color: black;
font-size: auto;
padding: 10px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
transition:  0.25s;
border-radius: 8px;
border: 2px solid transparent;
border-color: black;
width: 200px
`;

const Img = styled.img`
border-radius: 50%; 
width: 400px;
height: auto;
`

const time = 0

function displayTime() {
    if (time == 0) {
        return ("00:00")
    }
}

const FocusMode = () => {
  return (
      <div className="mx:auto text-center flex flex-col justify-center bg-green-200 text-black">
          <br />
          <p className="text-xl">focus mode</p>
          <ul>
              <div className="flex justify-center p-20 mx:auto text-center">
                  <ul>
                      <li>
                          insert picture
                          <Img src={mountain} />
                      </li>
                      <br />
                      page doesnt work yet
                  </ul>
              </div>
              <li>Set time ___</li>
              <li className="text-xl">{displayTime()}</li>
              <li><Button className="hover:bg-green-200">Focus</Button></li>
          </ul>
      </div>
  )
}

export default FocusMode