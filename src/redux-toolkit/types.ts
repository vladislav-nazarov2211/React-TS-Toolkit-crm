export interface bidType {
    id: number
    date: string
    name: string
    phone: string
    email: string
    product: string
    status: string
}

export interface initialBidType {
    name: string
    phone: string
    email: string
    product: string
}

export interface initialRegistrStateType {
    bidsArray: Array<bidType>
    testBidsArray: Array<initialBidType>
}

export interface initialFilterStateType {
    filter: Array<bidType>
    course: string
    status: string
    count: number
}