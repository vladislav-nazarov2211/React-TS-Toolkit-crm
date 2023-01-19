import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { bidType, initialFilterStateType } from '../types'

const initialState: initialFilterStateType = {
    filter: [],
    course: 'Все продукты',
    status: '',
    count: 0
}

function changeStatus(status: string, state: initialFilterStateType, action: PayloadAction<Array<bidType>>) {
    state.filter = action.payload.filter((item: bidType) => {
        if (state.course === 'Все продукты' && status === 'Все') {
            return state.filter = action.payload
        } else if (state.course != 'Все продукты' && status === 'Все')  {
            return item.product === state.course
        } else if (state.course != 'Все продукты') {
            return item.status === status && item.product === state.course
        } else {
            return item.status === status
        }
    })    
}

const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        filterAll(state, action) {
            changeStatus('Все', state, action)
            state.status = 'Все'
            state.count = state.filter.length 
        }, 
        filterNew(state, action) {
            changeStatus('Новый', state, action)
            state.status = 'Новый'
            state.count = state.filter.length 
        },
        filterAtWork(state, action) {
            changeStatus('В работе', state, action)
            state.status = 'В работе'
            state.count = state.filter.length 
        },
        filterFinished(state, action) {
            changeStatus('Завершенный', state, action)
            state.status = 'Завершенный'  
            state.count = state.filter.length 
        },
        filterArchive(state, action) {
            changeStatus('Архив', state, action) 
            state.status = 'Архив'
            state.count = state.filter.length 
        },
        setCourse(state, action) {
           state.course = action.payload 
        }
    }  
})

export const { filterAll, filterNew, filterAtWork, filterFinished, filterArchive, setCourse } = filterSlice.actions
export default filterSlice.reducer