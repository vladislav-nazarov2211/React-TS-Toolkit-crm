import { createSlice } from '@reduxjs/toolkit'
import { initialRegistrStateType } from '../types'

let bids = (sessionStorage.getItem("bidsArray"))

const initialState: initialRegistrStateType = {
    bidsArray: (bids === null ? [] : JSON.parse(sessionStorage.getItem("bidsArray") || '')),
    testBidsArray: [
        {name: 'Виктор Смирнов', phone: '+7 (960) 675-65-10', email: 'vic1412@ya.ru', product: 'course-html'},
        {name: 'Мария Гонсалес', phone: '+7 (945) 325-77-80', email: 'mary23@yandex.ru', product: 'course-js'},
        {name: 'Дмитрий Сычев', phone: '+7 (988) 478-64-02', email: 'dima0350@gmail.com', product: 'course-vue'},
        {name: 'Алексей Грачев', phone: '+7 (966) 444-52-01', email: 'alex@ya.ru', product: 'course-php'},
        {name: 'Марина Варламова', phone: '+7 (985) 789-24-64', email: 'marisha5@ya.ru', product: 'course-wordpress'},
        {name: 'Григорий Прунин', phone: '+7 (913) 123-34-35', email: 'grig463@yandex.ru', product: 'course-html'},
        {name: 'Екатерина Федерова', phone: '+7 (657) 658-59-92', email: 'kate---88@gmail.com', product: 'course-vue'},
        {name: 'Виктория Иванова', phone: '+7 (964) 177-35-46', email: 'vvvvik@ya.ru', product: 'course-js'},
    ] 
}

const registrSlice = createSlice({
    name: 'registrSlice',
    initialState,
    reducers: {
        setBid(state, action) {
            let arr = ['Новый', 'В работе', 'Завершенный', 'Архив']
            let n = Math.floor(Math.random() * arr.length);
            let newBid = {...action.payload, 
                id: state.bidsArray.length >= 1 ? state.bidsArray[state.bidsArray.length - 1].id + 1 : 1, 
                date: new Date().toLocaleString(), 
                status: arr[n]}
            sessionStorage.setItem("bidsArray", JSON.stringify([...state.bidsArray, newBid]))    
            state.bidsArray = state.bidsArray.concat(newBid)
        },
        editBid(state, action) {
            state.bidsArray = state.bidsArray.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload
                } else {
                    return item
                }
            })
            sessionStorage.clear()
            sessionStorage.setItem("bidsArray", JSON.stringify(state.bidsArray))
        }
    }  
})

export const { setBid, editBid } = registrSlice.actions
export default registrSlice.reducer