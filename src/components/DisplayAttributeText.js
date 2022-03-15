import React, { Component } from 'react'

export default class DisplayAttributeText extends Component {
  render() {
    return (
     
     <>
         {this.props.selectedAtt.filter((item)=>item.id===this.props.attributeId && item.value==="Yes" &&this.props.value==="Yes").length>0? (
           <div className={this.props.classSelected} key={this.props.attributeId}>
                 {this.props.attributeId} 
           </div>
         ) : (
            <></>
         )
         }
       
        
      </>
    )
  }
}
