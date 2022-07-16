import React from 'react';
import { useState, useRef } from 'react';
import DropDownItem from './DropDownItem';

interface ISelectedOption {
    key:String,
    text:String
}

interface IDropDown {
   allowedSelected: number
   dropdownOptions: any
   closeAll?: boolean
   headLine:string
}


 const DropDown: React.FunctionComponent<IDropDown> = (props) => {

    const { allowedSelected, dropdownOptions, headLine} = props;
    const [isOpen, setOpen] = useState(false);
    const [selectItem, setSelectedItem] = useState<ISelectedOption[]>([]);
    const [setHeight, setHeightState] = useState("20px");
    const content = useRef<HTMLInputElement>(null);

    /**
     * Add selected item of the dropdown to a list
     * @param {string} key 
     * @param {string} value selected
     */
    const addSelectedItem = (item:string, text:string) =>{
        if(allowedSelected === 1){
            const updatedSelected : ISelectedOption[]= [{key:item, text}];
            setSelectedItem(updatedSelected);
        }else{
        const updatedSelected : ISelectedOption[] = [...selectItem, {key:item,text}];
            setSelectedItem(updatedSelected);
        }
        
    }

    /**
     * In multiSelect remove selected item from the dropdown
     * @param {string} key to be deleted from selected list 
    */

    const removeSelectedItem = (deleteVal:string) =>{
        const newList = selectItem.filter((item) => item.key !== deleteVal);
         setSelectedItem( newList);       
    }

    /**
     * toggle the button value for opening and closing dropdown items
     * @param {event object} optional
    */

    const toggleOpen  = (e?: any) =>{   
        
        const setValue = !isOpen;
        setOpen(setValue);
        setHeightState(
            setValue ? `20em `: '0px'
        );
    }

     /**
     * toggling the button value for opening and closing dropdown items based on enter key for accessibility
     * @param {event object} optional
    */

    const onKeypress  = (e?: any) =>{
        
        if (e.key === 'Enter') {
            e.preventDefault();
            toggleOpen();
        }
        
    }

    /**
     * setting the title of the dropdown based on item selected
    */
    const setTitle= () =>{
        
        let res='';
        if( selectItem && selectItem.length >0 ){
                 selectItem.map((item)=> res +=item.text+',');
                 return res.substring(0, res.length-1);
        }
        return  `Select ${headLine}` ;       
    }

    const isAlreadySelected = (key:string) => {
        let result = selectItem && selectItem.find((item) => item.key === key);
        return result ? true: false;
    }

    return (
           
        <div className="wrapper" ref={content}  >
            <label className='tag'>{headLine}</label>
            <button type="button" 
                className={`dropdownHeader ${isOpen ? 'buttonFocus' : ''}`} 
                onClick={(e) =>toggleOpen(e)}
                onKeyPress={onKeypress} 
                tabIndex={0} 
                aria-haspopup="listbox"
                aria-expanded={isOpen}>
                {setTitle()}
            </button>
            {
                isOpen &&
                <ul className="dropdownBody" tabIndex={-1} role="listbox"    style={{ height: `${setHeight}` }} >
                    { 
                        dropdownOptions.map((item:any, index:number)=>(
                        <li key ={index} className={`dropdownItem ${item.disabled ? 'disabled' : ''}`}>
                            <DropDownItem allowedSelected={allowedSelected} 
                                isalreadySelected={isAlreadySelected(item.key)} 
                                dropdownObj={item} 
                                addSelectedItem={addSelectedItem} 
                                removeSelectedItem={removeSelectedItem} 
                                toggleOpen={toggleOpen} />
                        </li>
                        ))
                    }
                </ul>
            }            
        </div>
    )
}

export default React.memo(DropDown);