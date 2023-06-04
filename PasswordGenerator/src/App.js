import React, { useState } from "react";
import "../src/styles.css"
import {upperCaseLetters, lowerCaseLetters, specialCharacters, numbers} from "./CharacterList"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){
  const [password,setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(26);

  const [includeUppercase, setincludeUppercase] = useState(false);
  const [includeLowercase, setincludeLowercase] = useState(false);
  const [includeNumbers, setincludeNumbers] = useState(false);
  const [includeSymbols, setincludeSymbols] = useState(false);


  function handlePassword(){
    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
      notify("You must select atleast one checkbox to generate password",true);
    }else{
      let characterList = "";
      if(includeUppercase){
        characterList = characterList + upperCaseLetters;
      }
      if(includeLowercase){
        characterList = characterList + lowerCaseLetters;
      }
      if(includeNumbers){
        characterList = characterList + numbers;
      }
      if(includeSymbols){
        characterList = characterList + specialCharacters;
      }
      setPassword(createPassword(characterList));
      notify("Password is generated successfully",false);
    }
  }

  function createPassword(characterList){
    let password = "";
    const characterListLength = characterList.length;
    for(var i=0;i<passwordLength;i++){
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
  return password;
  }


  function handleCopyPassword(){
    if(password === ""){
      notify("Your password is empty",true)
    }else{
      navigator.clipboard.writeText(password);
      notify("Password successfully copied to clipboard",false)
    }
  }


  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };


  function forPassLen(event){
    const newLen = event.target.value
    setPasswordLength(newLen);
  }
  
  function forUpper(event){
    const Upp = event.target.checked;
    setincludeUppercase(Upp);
  }
  function forLower(event){
    const Low = event.target.checked;
    setincludeLowercase(Low);
  }
  function forNum(event){
    const Num = event.target.checked;
    setincludeNumbers(Num);
  }
  function forSym(event){
    const Sym = event.target.checked;
    setincludeSymbols(Sym);
  }

  return (
    <div className="App">
      <div className="generator">
        <h2 className="generatorHeading">Password Generator</h2>
        <div className="generatePassword">
          <h3>{password}</h3>
          <button className="copyButton">
          <i onClick={handleCopyPassword} className="far fa-clipboard"></i>
          </button>
        </div>

        <div className="form">
          <label htmlFor="password-strength">Password Length</label>
          <input
          onChange = {forPassLen}
          defaultValue = {passwordLength}
          type="number"
          id = "password-strength"
          name = "password-strength"
          max="26"
          min="8"
          ></input>
        </div>

        <div className="form">
          <label htmlFor="uppercase-letters">Add Uppercase Letters</label>
          <input
          checked = {includeUppercase}
          onChange = {forUpper}
          type = "checkbox"
          id = "uppercase-letters"
          name = "uppercase-letters"
          ></input>
        </div>

        <div className="form">
          <label htmlFor="lowercase-letters">Add LowerCase Letters</label>
          <input
          checked = {includeLowercase}
          onChange = {forLower}
          type = "checkbox"
          id = "lowercase-letters"
          name = "lowercase-letters"
          ></input>
        </div>

        <div className="form">
          <label htmlFor="include-numbers">Add Numbers</label>
          <input
          checked = {includeNumbers}
          onChange = {forNum}
          type = "checkbox"
          id = "include-numbers"
          name = "include-numbers"
          ></input>
        </div>

        <div className="form">
          <label htmlFor="include-symbols">Add Symbols</label>
          <input
          checked = {includeSymbols}
          onChange = {forSym}
          type = "checkbox"
          id = "include-symbols"
          name = "include-symbols"
          ></input>
        </div>

        <button className="generatorButton" onClick={handlePassword}>Generate Password</button>
        <ToastContainer />
      </div>
    </div>
  );
}



export default App;
