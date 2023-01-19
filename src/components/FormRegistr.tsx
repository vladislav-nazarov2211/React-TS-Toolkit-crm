import { useState } from "react"
import { NavLink } from "react-router-dom"
import { setBid } from "../redux-toolkit/slices/registrSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { initialBidType } from "../redux-toolkit/types"
import { RootState } from "../redux-toolkit/store/store"
import { onPhoneInput, onPhoneKeyDown, onPhonePaste } from './../common/formatedInputvalue';
import { useForm } from 'react-hook-form'

export const FormRegistr = () => {
    const dispatch = useDispatch()
    
    const testArray = useSelector((state: RootState) => state.registrBid.testBidsArray)

    const {register, formState: {errors, isValid}, handleSubmit} = useForm({mode: 'onBlur'})
    
    function getRandomBid() {
        let n = Math.floor(Math.random() * testArray.length);
        return testArray[n];  
    }

    let randomObj = getRandomBid()
     
    const [inputs, setInputs] = useState<initialBidType>({
        name: randomObj.name,
        phone: randomObj.phone,
        email: randomObj.email,
        product: randomObj.product 
    })
    
    function changeHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    
    function onSubmit(e: any) {
        dispatch(setBid(inputs))
        setInputs(getRandomBid())
        e.target.reset()
    }
    
    return(
        <div className="radial-bg flex-center">
            <div className="white-plate white-plate--payment">
                <div className="container-fluid">
 
                    <div className="white-plate__header text-center">
                        <p className="white-plate__logo">
                            <span>Форма</span> заявок
                        </p>
                    </div>

                    <div className="white-plate__line-between white-plate__line-between--main"></div>

                    <form id="bidForm" onSubmit={handleSubmit(onSubmit)}>
                        <label>Ваши данные:</label>
                        <div className="form-group">
                            <input 
                                {...register('name', {required: 'Введите Ваше имя!', pattern: {value: /^[а-яА-ЯёЁa-zA-Z\s]+$/, message: 'Имя должно содержать только буквы!'}, maxLength: {value: 35, message: 'Не более 35-ти символов!'}})}
                                onChange={changeHandler}
                                value={inputs.name}
                                type="text"
                                id="bidFormName"
                                name="name"
                                className="form-control"
                                placeholder="Имя и Фамилия" />
                        </div>
                        {errors?.name && <div className='nameError'>{errors.name.message?.toString()}</div>}	
                        <div className="form-group">
                            <input
                                {...register('phone', {required: 'Введите Ваш телефон!', minLength: {value: inputs.phone[1] === '7' ? 18 : 17, message: 'Не корректный номер'}})} 
                                onInput={onPhoneInput}
                                onKeyDown={onPhoneKeyDown}
                                onPaste={onPhonePaste}
                                onChange={changeHandler}
                                value={inputs.phone} 
                                type="text" 
                                id="bidFormPhone" 
                                name="phone" 
                                className="form-control" 
                                placeholder="Телефон" />
                        </div>
                        {errors?.phone && <div className='phoneError'>{errors.phone.message?.toString()}</div>}
                        <div className="form-group">
                            <input 
                                {...register('email', {required: 'Введите Ваш Email!', pattern: {value: /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i, message: 'Не корректный Email!'}, maxLength: {value: 40, message: 'Не более 40-ти символов!'}})}
                                onChange={changeHandler} 
                                value={inputs.email} 
                                type="email" 
                                id="bidFormEmail" 
                                name="email" 
                                className="form-control" 
                                placeholder="Email" />
                        </div>
                        {errors?.email && <div className='emailError'>{errors.email.message?.toString()}</div>}
                        <div className="form-group">
                            <label>Продукт:</label>
                            <select onChange={changeHandler} value={inputs.product} id="productSelect" name="product" className="form-control" >
                                <option value="course-html">Курс по верстке</option>
                                <option value="course-js">Курс по JavaScript</option>
                                <option value="course-vue">Курс по VUE JS</option>
                                <option value="course-php">Курс по PHP</option>
                                <option value="course-wordpress">Курс по WordPress</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <button disabled={!isValid} type="submit" className="btn btn-lg btn-primary btn-block">Оформить заявку</button>
                        </div>

                        <div className="form-group">
                            <NavLink to='/bids' className="btn btn-lg btn-primary btn-block">Далее</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>    
    )
}