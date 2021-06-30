import { fireEvent, render } from "@testing-library/react"
import React from "react"
import App from "./App"

test("checking h1 of header",()=>{
    const {getByText} = render(<App/>)  //destructuring obj - assign the App obj to variable getByText
    const h1 = getByText(/Learning React Project/)  //use regex to get element contain the string
    expect(h1.textContent).toBe("Phuong's Learning React Project")
})


test("checkbox test",()=>{
    const { container } = render(<App/>)
    const checkbox = container.querySelector("[id^=check]")  //get checkbox which having any id starting with "checkit"
    fireEvent.click(checkbox)  //perform click action on the checkbox
    expect(checkbox.checked).toEqual(true)  //check if the checked value equal true?
})