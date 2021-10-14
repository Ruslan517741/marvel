const SingleChar = (thumbnail, name, id) => {
    return (
        <li className="char__item char__item_selected">
            <img src={thumbnail} alt={name}/>
            <div className="char__name">Abyss</div>
        </li>
    )
}

export default SingleChar;