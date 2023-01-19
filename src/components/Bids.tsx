import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { RootState } from "../redux-toolkit/store/store"
import { bidType } from "../redux-toolkit/types"
import { Bid } from "./Bid"
import { filterAll, filterNew, filterAtWork, filterFinished, filterArchive, setCourse } from "../redux-toolkit/slices/filterSlice"

export const Bids = () => {
    const bidsArray = useSelector((state: RootState) => state.registrBid.bidsArray)
    const filterArray = useSelector((state: RootState) => state.filterBids.filter)
    const course = useSelector((state: RootState) => state.filterBids.course)
    const status = useSelector((state: RootState) => state.filterBids.status)
    const countBids = useSelector((state: RootState) => state.filterBids.count)
    const dispatch = useDispatch()
    
    function changeCourse() {
        switch(status) {
            case 'Все': {
                return dispatch(filterAll(bidsArray))
            }
            case 'Новый': {
                return dispatch(filterNew(bidsArray))
            }
            case 'В работе': {
                return dispatch(filterAtWork(bidsArray))
            }
            case 'Завершенный': {
                return dispatch(filterFinished(bidsArray))
            }
            case 'Архив': {
                return dispatch(filterArchive(bidsArray))
            }
        }
    }

    useEffect(() => {
        changeCourse()
    }, [course])

    useEffect(() => {
        dispatch(filterAll(bidsArray))
    }, [])

    return(
        <div className="body--dashboard">
            <div className="left-panel blue-skin">
                <div className="left-panel__logo">
                    <div className="left-panel__logo-title">CRM заявки</div>
                    <div className="left-panel__logo-subtitle">
                        учебный проект webcademy
                    </div>
                </div>
                
                <div className="left-panel__navigation">
                    <div className="left-panel__navigation-title">
                        Заявки
                    </div>
                    
                    <ul id="filterLinks">
                        <li><NavLink to='#' onClick={() => {dispatch(filterAll(bidsArray))}} data-status="all">Все вместе</NavLink>{status === 'Все' ? <div className="counter">{countBids}</div> : ''}</li>
                        <li><NavLink to='#' onClick={() => {dispatch(filterNew(bidsArray))}} data-status="new">Новые</NavLink>{status === 'Новый' ? <div className="counter">{countBids}</div> : ''}</li>
                        <li><NavLink to='#' onClick={() => {dispatch(filterAtWork(bidsArray))}} data-status="inWork">В работе</NavLink>{status === 'В работе' ? <div className="counter">{countBids}</div> : ''}</li>
                        <li><NavLink to='#' onClick={() => {dispatch(filterFinished(bidsArray))}} data-status="done">Завершенные</NavLink>{status === 'Завершенный' ? <div className="counter">{countBids}</div> : ''}</li>
                        <li><NavLink to='#' onClick={() => {dispatch(filterArchive(bidsArray))}} data-status="archive">Архив</NavLink>{status === 'Архив' ? <div className="counter">{countBids}</div> : ''}</li>
                    </ul>
                    
                </div>
                        
                <div className="left-panel__navigation left-panel__navigation--no-line">
                    <ul>
                        <li><NavLink to='/'>Выход</NavLink></li>
                    </ul>
                </div>
                
            </div>
        
            <div className="main-wrapper">
                <div className="container-fluid">
                    <div className="admin-heading-1">Заявки:</div>

                    <form action="">
                        <div className="row mb-3 justify-content-start">   
                            <div className="col">   
                                <div id="filterStatus" className="btn-group" role="group" aria-label="...">
                                    <div onClick={() => {dispatch(filterAll(bidsArray))}} className="btn btn-light" data-status="all">Все</div>
                                    <div onClick={() => {dispatch(filterNew(bidsArray))}} className="btn btn-light" data-status="new">Новые</div>
                                    <div onClick={() => {dispatch(filterAtWork(bidsArray))}} className="btn btn-light" data-status="inWork">В работе</div>
                                    <div onClick={() => {dispatch(filterFinished(bidsArray))}} className="btn btn-light" data-status="done">Завершенные</div>
                                    <div onClick={() => {dispatch(filterArchive(bidsArray))}} className="btn btn-light" data-status="archive">Архив</div>
                                </div>
                            </div>
                            
                            <div className="col">
                                <select onChange={(e) => {dispatch(setCourse(e.target.value))}} value={course} className="custom-select" id="productFilter">
                                    <option value='Все продукты'>Все продукты</option>
                                    <option value="course-html">Курс по верстке</option>
                                    <option value="course-js">Курс по JavaScript</option>
                                    <option value="course-vue">Курс по VUE JS</option>
                                    <option value="course-php">Курс по PHP</option>
                                    <option value="course-wordpress">Курс по WordPress</option>
                                </select>   
                            </div>  
                        </div>
                    </form>

                    <table className="table fs-14">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>дата</th>
                                <th>продукт</th>
                                <th>имя</th>
                                <th>email</th>
                                <th>телефон</th>
                                <th>статус</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="RequestsBidsTable">
                            {filterArray.map((item: bidType) => {
                                return <Bid item={item} key={item.id} /> 
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}