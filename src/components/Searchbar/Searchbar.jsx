import { useState } from 'react';
import style from './Seachbar.module.css';
const Searchbar = ({ submit }) => {
  const [textToSearch, setQuery] = useState('');
  const handleOnChange = ({ target }) => {
    setQuery(target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    if (!textToSearch.trim()) {
      return;
    }
    submit(textToSearch);
    setQuery('');
  };

  return (
    <header className={style.searchbar}>
      <form onSubmit={handleSubmit} className={style.searchForm}>
        <button type="submit" className={style.searchForm_button}>
          <span className={style.searchForm_button_label}>Search</span>
        </button>

        <input
          name="query"
          className={style.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={textToSearch}
          onChange={handleOnChange}
        />
      </form>
    </header>
  );
};
export default Searchbar;
