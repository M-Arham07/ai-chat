"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckIcon, ChevronDownIcon } from "lucide-react";

export default function ModelDropdown({ onModelChange }) {
    const [Model, setModel] = useState("Gemini");

    //DEBUGGING:
    useEffect(() => console.log("model changed to", Model), [Model])

    /* GET MODEL PREFERENCE FROM LOCALSTORAGE ON MOUNT, 
       MODEL IS ALREADY A STRING SO NO NEED TO PARSE, if modelPreference 
       not found or someone tried to use another model then assign it gemini */
    useEffect(() => {
        const modelPreference = localStorage.getItem("modelPreference");
        const availableModels = ["Gemini", "Groq"];

        if (!modelPreference || !availableModels.includes(modelPreference)) {
            setModel("Gemini")
        }
        else {
            setModel(modelPreference);
        }
    }, []);


    // SET MODEL PREFERENCE TO LOCALSTORAGE, MODEL IS ALREADY A STRING SO NO NEED TO STRINGIFY
    useEffect(() => localStorage.setItem("modelPreference", Model), [Model]);

    // HISTORY CLEAR BUTTON
    const [Cleared, setCleared] = useState(false);

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
                    <Button value="clearHistory"
                        disabled={Cleared}
                        variant="outline"
                        onClick={() => {
                            localStorage.removeItem("chatHistory")
                            setCleared(true);
                            /*  Reset the Cleared state after a second so user
                            can clear again if he wants  */
                            setTimeout(() => setCleared(false), 1000);

                        }}
                        className="w-full mt-3">{Cleared ? <> Cleared <CheckIcon /> </> : "Clear Chat"}</Button>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
