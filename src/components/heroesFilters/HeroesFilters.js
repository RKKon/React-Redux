import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import store from '../../store/index'

import { activeFilterChanged, fetchFilters, selectAll } from "./FiltersSlice";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {

    const dispatch = useDispatch();
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters)
    const filters = selectAll(store.getState())

    useEffect(() => {
        dispatch(fetchFilters())
        //eslint-disable-next-line
    }, [])

    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Error Loading...</h5>
    }

    const renderFilters = (arr) => {
        //selectAll();
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Filters not found</h5>
        }
        return arr.map(({name, className, label}) => {
            // using library -- classnames
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            return <button key={name}
                           id={name}
                           className={btnClass}
                           onClick={() => dispatch(activeFilterChanged(name))}>{label}</button>
        })
    }

    const elements = renderFilters(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;