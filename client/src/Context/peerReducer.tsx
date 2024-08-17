import { ADD_PEER , REMOVE_PEER, UPDATE_PEER_AUDIO, UPDATE_PEER_VIDEO } from "./peerActions";

export type PeerState=Record<string ,{stream:MediaStream}> ;
type PeerAction= {
    type:typeof ADD_PEER ;
    payload:{peerId:string ; stream:MediaStream} ;
}|
{
    type:typeof REMOVE_PEER ;
    payload:{peerId:string} ;  
} 
| { type: typeof UPDATE_PEER_VIDEO; payload: { peerId: string; videoEnabled: boolean } }
| { type: typeof UPDATE_PEER_AUDIO; payload: { peerId: string; AudioEnabled: boolean } };

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

            
            case UPDATE_PEER_VIDEO:
                console.log('UPDATE_PEER : ' ,action.payload.videoEnabled) ;
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    videoEnabled: action.payload.videoEnabled
                }
            };

            case UPDATE_PEER_AUDIO :
                console.log('UPDATE_PEER : ' ,action.payload.AudioEnabled) ;
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    AudioEnabled: action.payload.AudioEnabled
                }
            };
              
              
            default :
            return {...state} ;
    }
}


