import { useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import './searchForm.scss';

const NameFounded = (props) => {
    console.log(props.searchingChar.id);
    return (
        <div className="form__success">
            <div className="form__success-text">There is! Visit {props.searchingChar.name} page?</div>
            <Link to={`/characters/${props.searchingChar.id}`} >
                <button className="button button__secondary form__link">
                    <div className="inner">TO PAGE</div>
                </button>
            </Link>
        </div>
    )
}

const SearchForm = () => {
    const {getCharacterByName} = useMarvelService();

    const [searchingChar, setSearchingChar] = useState({});
    const [errorInName, setErrorInName] = useState(false);

    const checkName = (name) => {
        console.log(name);
        getCharacterByName(name)
            .then(res => setSearchingChar(res))
            .then(setErrorInName(false))
            .catch(function() { 
                setSearchingChar({});
                setErrorInName(true); 
            })
        
    }

    

    return (
        <Formik 
            initialValues = {{
                name: ''
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                        .min(2, 'At least 2 symbols!')
                        .required('This field is required'),
            })}
            onSubmit = {values => checkName(values.name)}
            /* onSubmit={checkName("Captain Universe")} */>
               
            <Form className="form" >
                <label className="form__text">Or find a character by name</label>
                <div className="wrapper">
                    <Field 
                        className="form__input" 
                        id="name" 
                        name="name" 
                        type="text" 
                        placeholder="Enter name"/>
                    <button className="button button__main" type="submit">
                        <div className="inner">FIND</div>
                    </button>
                </div>
                <ErrorMessage className="error" name="name" component="div"/>
                {searchingChar.name ? <NameFounded searchingChar={searchingChar}/> : null }
                {errorInName ? <div className="error">The character was not found. Check the name and try again</div> : null}
            </Form> 
        </Formik>
    )
}

export default SearchForm;