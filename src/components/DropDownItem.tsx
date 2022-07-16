import React from 'react';

 interface IDropDownItem {
   allowedSelected: number
   dropdownObj?: any
   addSelectedItem?: (arg0: string, arg1: string)=>void
   removeSelectedItem?: (arg0: string)=>void
   isalreadySelected:boolean
   toggleOpen:()=> void
 }

 const DropDownItem: React.FunctionComponent<IDropDownItem> = (props) => {

    const { allowedSelected, dropdownObj,addSelectedItem, removeSelectedItem,
        toggleOpen, isalreadySelected} =props;
    const [checked, setChecked] = React.useState(isalreadySelected);
    
    const {key, text} = dropdownObj;
    
    const handleChange = () => {
      setChecked(!checked);
    };

    const itemClicked = () => { 

      if(allowedSelected === 1) {
        addSelectedItem && addSelectedItem(key,text );
        toggleOpen();
      }else{
        setChecked(!checked);
        if(checked){
          removeSelectedItem && removeSelectedItem(key);
        }else{
          addSelectedItem &&addSelectedItem(key, text );
        }
      }
    }
    
    /**
     * selecting the  dropdown items based on enter key and space bar for accessibility
     * @param {event object} optional
    */

    const handleKeyDown = (e:any) => {
      switch (e.key) {
        case " ":
        case "SpaceBar":
        case "Enter":
          e.preventDefault();
          itemClicked()
          break;
        default:
          break;
      }
  };
    
    return (
     <div onClick={()=>{itemClicked()}} className={`${allowedSelected >1 ? 'multiSelect': isalreadySelected ? 'singleChoiceSelected' : ''}`} onKeyDown={handleKeyDown} tabIndex={0}>        
        {
          (allowedSelected >1) &&  
            <span>
              <label htmlFor="dropdownVal">
                <input type="checkbox" checked={checked} onChange={handleChange} />
              </label>
            </span>
        }
        <span>{text}</span>           
     </div>
    )
}

export default DropDownItem;