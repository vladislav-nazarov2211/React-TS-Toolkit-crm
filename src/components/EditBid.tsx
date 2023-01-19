import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { editBid } from "../redux-toolkit/slices/registrSlice";
import { RootState } from "../redux-toolkit/store/store";
import { bidType } from "../redux-toolkit/types";

export const EditBid = () => {
    const dispatch = useDispatch()
    const location = useParams()
    const navigate = useNavigate()
    const urlID = location.id 
    const bid: bidType | undefined = useSelector((state: RootState) => state.registrBid.bidsArray).find((item) => (item.id).toString() == urlID) 
    
    const [inputs, setInputs] = useState({
        id: bid?.id,
        date: bid?.date,
        name: bid?.name,
        phone: bid?.phone,
        email: bid?.email,
        product: bid?.product, 
        status: bid?.status 
    })
    
    function changeHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function onSubmit() {
        dispatch(editBid(inputs))
        navigate('/bids')
    }

    return(
        <div className="main-wrapper">
            <div className="container-fluid">
                <div className="row justify-content-between align-items-center">
                    <div className="col">
                        <div className="admin-heading-1">Работа с заявкой</div>
                    </div>
                    <div className="col text-right">
                        <NavLink to="/bids" className="btn btn-link">Вернуться назад</NavLink>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col">
                        <form action="">
                            <div className="card mb-4">
                                <div className="card-header">Данные о заявке</div>
                                <div className="card-body" data-card>
                                    <div className="mb-3 position">
                                        <div className="col-md-2">
                                            <strong>ID: </strong>
                                        </div>
                                        <div>{inputs.id}</div>
                                        <div className="col" data-id></div>
                                    </div>

                                    <div className="mb-3 position">
                                        <div className="col-md-2">
                                            <strong>Дата создания: </strong>
                                        </div>
                                        <div>{inputs.date}</div>
                                        <div className="col" data-date></div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-2">
                                            <strong>Продукт:</strong>
                                        </div>
                                        <div className="col">
                                            <select onChange={changeHandler} value={inputs.product} name="product" className="custom-select" data-form-item="product-list">
                                                <option value="course-html">Курс по верстке</option>
                                                <option value="course-js">Курс по JavaScript</option>
                                                <option value="course-vue">Курс по VUE JS</option>
                                                <option value="course-php">Курс по PHP</option>
                                                <option value="course-wordpress">Курс по WordPress</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-2">
                                            <strong>Имя:</strong>
                                        </div>
                                        <div className="col">
                                            <input onChange={changeHandler} type="text" value={inputs.name} name="name" className="form-control" placeholder="Имя" data-form-item="name"/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-2">
                                            <strong>Email:</strong>
                                        </div>
                                        <div className="col">
                                            <input onChange={changeHandler} type="text" value={inputs.email} name="email" className="form-control" placeholder="example@mail.ex" data-form-item="email"/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-2">
                                            <strong>Телефон:</strong>
                                        </div>
                                        <div className="col">
                                            <input onChange={changeHandler} type="text" value={inputs.phone} name="phone" className="form-control" placeholder="+X (XXX) XXX-XX-XX" data-form-item="phone"/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-2">
                                            <strong>Статус заявки:</strong>
                                        </div>
                                        <div className="col">
                                            <select onChange={changeHandler} value={inputs.status} name="status" className="custom-select" data-form-item="status-list">
                                                <option value="Новый">Новый</option>
                                                <option value="В работе">В работе</option>
                                                <option value="Завершенный">Завершенный</option>
                                                <option value="Архив">Архив</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col">
                                    <button onClick={onSubmit} type="button" className="btn btn-primary" data-save>Сохранить изменения</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}