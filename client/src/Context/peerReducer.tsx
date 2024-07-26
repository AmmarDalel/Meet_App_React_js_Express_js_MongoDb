import { ADD_PEER , REMOVE_PEER } from "./peerActions";

export type PeerState=Record<string ,{stream:MediaStream}> ;
type PeerAction= {
    type:typeof ADD_PEER ;
    payload:{peerId:string ; stream:MediaStream} ;
}|
{
    type:typeof REMOVE_PEER ;
    payload:{peerId:string} ;  
} ;

export const peerReducer=(state:PeerState , action:PeerAction)=>{
    switch(action.type){
        case ADD_PEER:
            console.log('ADD_PEER : ', {
                ...state,
                [action.payload.peerId]:{
                    stream:action.payload.stream ,
                },
            })
            return{
                ...state,
                [action.payload.peerId]:{
                    stream:action.payload.stream ,
                },
                
            };
            case REMOVE_PEER:    
               
                   const {[action.payload.peerId]:deleted , ...rest}=state ;
                   console.log('REMOVE_PEER : ',rest ) ;
                
                   return rest ;
            default :
            return {...state} ;
    }
}