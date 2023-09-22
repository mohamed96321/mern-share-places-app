import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import '../NewPlace/PlaceForm.css'
import Card from "../../../shared/components/UIElements/Card/Card";

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://luxurycolumnist.com/wp-content/uploads/2022/02/machu-picchu-peru.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Freedom State In USA',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://luxurycolumnist.com/wp-content/uploads/2022/02/machu-picchu-peru.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);

  const placeId = useParams().placeId;

  const [fromState, inputHandler, setFormData] = useForm({
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    }, false
  );

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData({
        title: {
          value: identifiedPlace.title,
          isValid: true
        },
        description: {
          value: identifiedPlace.description,
          isValid: true
        }
      }, 
      true
      ); 
    }
    setIsLoading(false); 
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler= event => {
    event.preventDefault();
    console.log(fromState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="centered">
        <Card>
          <h3>Could Not Find Any Place!</h3>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="centered">
        <Card>
          <h3>Loading...</h3>
        </Card>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input 
        id="title" 
        element="input" 
        type="text" 
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={fromState.inputs.title.value}
        initialValid={fromState.inputs.title.value}
      />
      <Input 
        id="description" 
        element="textarea" 
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        initialValue={fromState.inputs.description.value}
        initialValid={fromState.inputs.description.value}
      />
      <Button type="submit" disabled={!fromState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
