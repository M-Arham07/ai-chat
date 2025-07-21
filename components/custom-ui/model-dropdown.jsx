"use client"

import { useEffect, useState } from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ModelDropdown({ onModelChange }) {
    const [Model, setModel] = useState("Gemini");

    //DEBUGGING:
    //   useEffect(()=>console.log("model changed to",Model),[Model])

    /* GET MODEL PREFERENCE FROM LOCALSTORAGE ON MOUNT, 
       MODEL IS ALREADY A STRING SO NO NEED TO PARSE, if modelPreference 
       not found or someone tried to use another model then assign it gemini */
    useEffect(() => {
        const modelPreference = localStorage.getItem("modelPreference");
        const availableModels = ["Gemini", "Grok"];
        
        if (!modelPreference || !availableModels.includes(modelPreference)) {
            setModel("Gemini")
        }
        else {
            setModel(modelPreference);
        }
    }, []);


    // SET MODEL PREFERENCE TO LOCALSTORAGE, MODEL IS ALREADY A STRING SO NO NEED TO STRINGIFY
    useEffect(() => localStorage.setItem("modelPreference", Model), [Model]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    Model: {Model}
                    <ChevronDownIcon
                        className="-me-1 opacity-60"
                        size={16}
                        aria-hidden="true"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value={Model}
                    onValueChange={(value) => {
                        setModel(value);
                        onModelChange(value);
                    }}>
                    <DropdownMenuRadioItem value="Gemini">Gemini</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Groq">Groq</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
