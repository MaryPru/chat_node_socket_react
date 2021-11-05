export interface ActionInterface {
    type: string,
    payload: any
}

export interface RoomReducer {
    joined: boolean,
    roomId:string
    userName:string
    users:OneUser[]
    messages:OneMessage[]
    userId:string
}

export interface Room{
    roomId:string
    userName:string
}

export interface OneUser{
    userName:string
    userId:string
}

export interface OneMessage{
    text:string
    userName: string
    userId:string
}

