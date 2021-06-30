import multiplyTwoNumbers from "./simple"

test("Multiply two numbers", ()=>{
    expect(multiplyTwoNumbers(2,3)).toBe(6)
})