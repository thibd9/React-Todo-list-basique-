import React from "react";

import { useState } from "react";

import Item from "../Item/Item";

import {v4 as uuidv4} from 'uuid'

export default function Form() {

    //--===== Déclaration du State de données de base =====--//

    const [dataArr, setDataArr] = useState ([
        {text: "Conquérir le monde",id: uuidv4()},
        {text: "Faire une partie de JDR",id: uuidv4()}, 
        {text: "Nourir le Chat",id: uuidv4()},
    ])

    //--===== Déclaration du State de l'Input =====--//

    const [stateInput, setStateInput] = useState();

    //--===== Fonction permettant de Delete une tache en fonction de L'ID =====--//

    const deleteElement = id => {
        const filteredState = dataArr.filter(item => {
            return item.id !== id;
        })
        setDataArr(filteredState)
    }

    //--===== Fonction permettant de changer le state en fonction des valerus tappées dan l'Input =====--//

    const linkedInput = evt => {
        setStateInput(evt);
    }

    //--===== Fonction permettant la création d'une nouvelle tache =====--//

    const addTodo = evt => {

        //-- avec preventDefault on empeche le rechargement de la page --//

        evt.preventDefault();

        //-- on créer un nouveau tableau en faisant une copie du state exisant --//

        const newArr = [...dataArr]

        //-- on créer les nouvelles valeurs --//

        const newTodo = {};
        newTodo.text = stateInput;
        newTodo.id = uuidv4();

        //-- on modofie notre state avec les nouvelles valeurs --//

        newArr.push(newTodo);
        setDataArr(newArr);

        //-- on remet à zéro la valeur de notre input afin de permettre à l'utilisateur d'écrire une nouvelle valeur --//

        setStateInput("");
    }

    return (

        <div className="m-auto px-4 col-12 col-sm-10 col-lg-6">

            <form 
            onSubmit={(evt) => {addTodo(evt)}}
            action="" 
            className="mb-3">

                <label 
                htmlFor="todo" 
                className="form-label mt-3">
                    Chose à faire
                </label>

                <input
                value={stateInput} 
                onChange={(evt) => {linkedInput(evt.target.value)}}
                type="text" 
                className="form-control" 
                id="todo"/>

                <button 
                className="mt-2 btn btn-primary d-block">
                    Envoyez
                </button>

            </form>

            <h2>Liste des choses à faire : </h2>

            <ul 
            className="list-group">

                {dataArr.map((item) => {
                    return ( 
                        <Item 
                        txt={item.text}
                        key={item.id}
                        id={item.id}
                        delFunc={deleteElement}
                        />
                    )
                })}

            </ul>

        </div>

    )

}