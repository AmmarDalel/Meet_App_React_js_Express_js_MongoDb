export const ADD_PEER="ADD_PEER" as const ;
export const REMOVE_PEER="REMOVE_PEER" as const ;
export const UPDATE_PEER_VIDEO = 'UPDATE_PEER_VIDEO' as const ;
export const UPDATE_PEER_AUDIO = 'UPDATE_PEER_AUDIO' as const ;


export const addPeerAction=(peerId :string , stream:MediaStream)=>({
    type:ADD_PEER ,
    payload:{peerId,stream} ,
});

export const removePeerAction=(peerId :string)=>({
    type:REMOVE_PEER ,
    payload:{peerId} ,
});

export const updatePeerVideoAction = (peerId: string, videoEnabled: boolean) => ({
    type: UPDATE_PEER_VIDEO,
    payload: { peerId, videoEnabled }
});

export const updatePeerAudioAction = (peerId: string, AudioEnabled: boolean) => ({
    type: UPDATE_PEER_AUDIO,
    payload: { peerId, AudioEnabled }
});