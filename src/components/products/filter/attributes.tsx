import {setAttributesFilter} from "@/store/features/filterSlice";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {AttributeType} from "@/types";
import {AppDispatch} from "@/store/store";

export const AttributeComponent = ({attribute, checked, handleAttributeChange}: {
    attribute: AttributeType,
    checked: boolean,
    handleAttributeChange: (attributeId: number) => void,
}) => {
    return (
        <label className={`cursor-pointer border px-2 ${checked ? 'font-semibold border-black' : 'border-gray-300'}`}
               key={attribute.id}>
            <input
                hidden
                type="checkbox"
                checked={checked}
                onChange={() => handleAttributeChange(attribute.id)}
            />
            {attribute.name}
        </label>
    );
}
export const AttributesComponent = ({allAttributes, selectedFilter}: {
    allAttributes: AttributeType[],
    selectedFilter: any,
}) => {
    const [selectedAttributes, setSelectedAttributes] = useState<Set<number>>(new Set(selectedFilter.attributes));
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setSelectedAttributes(new Set(selectedFilter.attributes));
    }, [selectedFilter, dispatch]);
    const handleAttributeChange = (attributeId: number) => {
        setSelectedAttributes(prevAttributes => {
            const updatedAttributes = new Set(prevAttributes);
            if (updatedAttributes.has(attributeId)) {
                updatedAttributes.delete(attributeId);
            } else {
                updatedAttributes.add(attributeId);
            }
            const attributesArray = Array.from(updatedAttributes);
            dispatch(setAttributesFilter(attributesArray));
            return updatedAttributes;
        });
    };
    console.log(selectedAttributes)
    return (
        <Fragment>
            <label className={`cursor-pointer border px-2`} >
                <input
                    hidden
                    type="checkbox"
                    // checked={selectedAttributes.entries().length > 0}
                    onChange={() => dispatch(setAttributesFilter([]))}
                />
                همه
            </label>
            {allAttributes.map(attr => {
                return (


                    <AttributeComponent key={attr.id} attribute={attr} checked={selectedAttributes.has(attr.id)}
                               handleAttributeChange={handleAttributeChange}/>
                )
            })}
        </Fragment>
    )
}

