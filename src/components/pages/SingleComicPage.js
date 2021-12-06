import { useParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { matchPath } from "react-router";

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleComicPage.scss';

const SingleComicPage = (props) => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError, getSingleItem} = useMarvelService();

    /* const match = useRouteMatch("/comics/:comicId"); */
    const location = useLocation();


    useEffect(() => {
        updateComic();
        console.log(location);
    }, [location.pathname]);


    const updateComic = () => {
        clearError();
        console.log(comicId);
        getSingleItem(location.pathname)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        console.log(comicId);
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price, name} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title ? title : name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title ? title : name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language ? `Language: ${language}` : null}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;