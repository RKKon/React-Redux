import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { heroCreated } from "../../actions";


const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroElement, setHeroElement] = useState('');
    const [heroDescr, setHeroDescr] = useState('')

    const {filters, filtersLoadingStatus} = useSelector(state => state)
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = e => {
        e.preventDefault();

        // generation id by library -- uuid
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }

        request(`http://localhost:3001/heroes`, "POST", JSON.stringify(newHero))
            .then(dispatch(heroCreated(newHero)))
            .catch(err => console.log(err))

        // Clear Form
        setHeroName('');    
        setHeroDescr('');
        setHeroElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Loading elements...</option>
        } else if (status === "error") {
            return <option>Loading error</option>
        }

        if (filters && filters.length > 0)  {
            return filters.map(({name, label}) => {
                //eslint-disable-next-line
                if (name === "all") return;
                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text"
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)} 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                    name="element">
                    <option >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)} {/* insead of down */}
                    {/* <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;