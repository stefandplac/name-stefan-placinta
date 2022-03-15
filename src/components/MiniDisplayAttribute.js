import React, { Component } from 'react'

export default class MiniDisplayAttribute extends Component {
  

  render(){
        
    return (
     
        <>
         {this.props.selectedAtt.filter((item)=>item.id===this.props.attributeId && item.value===this.props.value).length>0? (
           <div className={this.props.classSelected} key={this.props.attributeId}>
                 {this.props.value} 
           </div>
         ) : (
          <div className={this.props.classUnselected} key={this.props.attributeId} >
                 {this.props.value}
          </div>
         )
         }
       </>
       
        
    )
  }
}
