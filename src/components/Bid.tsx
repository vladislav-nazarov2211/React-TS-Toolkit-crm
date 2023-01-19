import { NavLink } from "react-router-dom"
import { bidType } from "../redux-toolkit/types"

type propsType = {
    item: bidType
}

export const Bid = ({item}: propsType) => {

    function setColor() {
        switch(item.status) {
            case 'Новый': {
                return 'badgeRed'
            }
            case 'В работе': {
                return 'badgeGreen'
            }
            case 'Завершенный': {
                return 'badgeBlue'
            }
            case 'Архив': {
                return 'badgeYellow'
            }
        }
        
    }

    return(
        <tr>
            <th scope="row">{item.id}</th>
            <td>{item.date}</td>
            <td>{item.product}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>
                <div className={setColor()}>
                    {item.status}
                </div>
            </td>
            <td>
                <NavLink to={"/editbid/" + item.id}>Редактировать</NavLink>
            </td>
        </tr>  
    )
}
