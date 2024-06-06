import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filtersSlice";
import { changeFilter } from "../../redux/filtersSlice";

function SearchBox() {
    const dispatch = useDispatch();
    const filter = useSelector(selectNameFilter);

    const handleFilter = (e) => {
        const name = e.target.value.trim();
        dispatch(changeFilter(name));
    };

    return (
        <form className={css.form}>
            <label >Find contacts by name</label>
            <input type="text"  value={filter} onChange={handleFilter}/>
        </form>
    )
}
export default SearchBox;