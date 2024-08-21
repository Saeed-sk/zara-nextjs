import {setAttributesFilter} from "@/store/features/filterSlice";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {AttributeType} from "@/types";

export const Attribute = ({attribute, checked, handleAttributeChange}: {
    attribute: AttributeType,
    checked: boolean,
    handleAttributeChange: (attributeId: number) => void,
}) => {
    return (
        <label className={`cursor-pointer ${checked && 'font-semibold'}`} key={attribute.id}>
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
export const Attributes = ({allAttributes, selectedFilter}: {
    allAttributes: AttributeType[],
    selectedFilter:() => void,
}) => {
    const [selectedAttributes, setSelectedAttributes] = useState<Set<number>>(new Set(selectedFilter.attributes));
    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedAttributes(new Set(selectedFilter.attributes));
    }, [selectedFilter]);
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
    return (
        <Fragment>
            {allAttributes.map(attr => {
                return (
                    <Attribute key={attr.id} attribute={attr} checked={selectedAttributes.has(attr.id)}
                               handleAttributeChange={handleAttributeChange}/>
                )
            })}
        </Fragment>
    )
}

