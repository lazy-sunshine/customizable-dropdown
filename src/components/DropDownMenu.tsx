import React from 'react';
import DropDown from './DropDown';
import './DropDown.scss'
import {options1, mupltiOption} from '../Constant';


 const DropDownMenu: React.FunctionComponent = () => {

    return (
        <div className="dropDownView">
            <DropDown dropdownOptions={options1} allowedSelected={1} headLine={'Single'}/>
            <DropDown dropdownOptions={mupltiOption} allowedSelected={2} headLine={'Multi'}/>          
        </div>
    )
}

export default DropDownMenu;