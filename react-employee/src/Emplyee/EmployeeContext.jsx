import { createContext, useReducer } from "react";
import { useState } from "react";

export const EmployeeContext = createContext({
    items:[],
    onSaveEmployeeData: () => {},
});

function employeeReducer(state,action){
    const updatedEmployees=[...state]

    if(action.type ==='ADD_EMPLOYEE'){
        const employeeData={
            ...action.payload,
            id: Math.random().toString()
        };

        updatedEmployees.push(employeeData);
    }
    return updatedEmployees;
}


export default function EmployeeContextProvider({children}){
    const DUMP_EMPLOYEES=[
        {id:'E1',name:'Swathi',dob:new Date(2001,7,24),exp:30},
        {id:'E2',name:'Vaish',dob:new Date(2001,11,7),exp:35},
        {id:'E3',name:'Varshini',dob:new Date(2005,2,31),exp:40},
        {id:'E4',name:'Sahana',dob:new Date(2001,1,24),exp:45},
    ];
    
    const[employees,dispatch]=useReducer(employeeReducer,DUMP_EMPLOYEES);

    const addEmployeeHandler=employee=>{
        dispatch(
            {
                type: 'ADD_EMPLOYEE',
                payload:employee
            }
        )
    }
    const contextValue={
        items: employees,
        onSaveEmployeeData: addEmployeeHandler
    };
    return <EmployeeContext.Provider value={contextValue}>
        {children}
    </EmployeeContext.Provider>
}