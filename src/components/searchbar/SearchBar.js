import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import {Form, FormControl, Button} from 'react-bootstrap'

const SearchBar = () => {

    const history = useHistory()

    const [ search, setSearch ] = useState("");

    const handleChange = (event) => {
        const { value } = event.target;
        setSearch(value)
    }

    return (
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" value={search} onChange={handleChange}/>
            <Button variant="outline-success" onClick={() => !_.isEmpty(search) ? history.push(`/search/${search}`) : alert("Looks like your search is empty!")}>Search</Button>
        </Form>
    );
};

export default SearchBar
