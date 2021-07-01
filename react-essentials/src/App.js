import './App.css'
import React, {useState, useEffect, useReducer} from 'react'
import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom'

//My Github api users info: https://api.github.com/users/minhphuong1994

const myArr = [
  "first statement",
  "second timestamp",
  "third soco"
]

const myArrObj = myArr.map((item,index)=>({"id":index,"item":item}))

// Using props parameter
const Header =(props)=>{  
  return(
    <header>
      <h1>{props.name}'s Learning React Project</h1>
    </header>
  )
}

// Using Destructuring Objcts (myArrTest) instead of original props
const Body =({myArrTest})=>{
  return(
    <section>
      <h2>This is Body</h2>
      <img src="https://picsum.photos/200/300" height="" alt="it's here"></img>
      <ul style={{textAlign:"left"}}>
        {myArrTest.map((data)=> <li key={data.id}>{data.item}</li>)}
      </ul>      
    </section>
  )
}

// using Array Destructuring. [variables] = [values] e.g [,,abc] = [true,"hi",30] will give abc value of 30
const Footer =(props)=>{
  //setup a State first element will be value, second will be function to change the Sate value
  const [value,setValue] = useState("Destructuring Array!")
  const [value2, setValue2] = useState("Second Sate")
  //setup listening to State changes. First element will be aa value, second will be dependencies to listen on
  useEffect(()=>{
    console.log(`it has changed ${value}`)
  },[value])

  useEffect(()=>{
    console.log(value2)
  },[value2] )

  //useReducer is like a helper function, first argument is a function to perform, second argument is a default value
  const [value3,setValue3] = useReducer(
    (value3) => !value3
    ,false)

  return(
    <footer>
      <h3>This is Footer. {value} and {value2}</h3>
      <button onClick= {()=>setValue("I have changed value!")}>Change it!</button>
      <button onClick= {()=>setValue2("I have changed value2!!")}>Change it!!</button>
      <br/>
      <input id="checkit" type="checkbox" value={value3} onChange={setValue3}></input>
      <br/>
      <p>{ value3 ? "not checked!": "checked"}</p>
    </footer>
  )
}



const Footer2 = ({username})=>{
  const [value,setValue] = useState(null) //creating an empty state
  const [valLoading,setLoading] = useState(false)
  const [valError, setError] = useState(null)


  //use useEffect to siliently fetching data when rendering, given empty arr because not listening to any state
  //then assign data to value of useState
  useEffect(()=>{
    if(!username) return 

    setLoading(true)

    fetch(`https://api.github.com/users/${username}`)
    .then((res)=>res.json())
    .then(setValue)
    .then(()=>setLoading(false))
    .catch(setError())
  },[username])

  if(valLoading){
    return <div>Fetching Data...</div>
  }

  if(valError){
    return <pre>{JSON.stringify(valError,null,2)}</pre>  //display json to UI in format of option 2, alt = null
  }

  if(!value) return <div>No data fetched!</div>

  console.log(JSON.stringify(value))
  return <div>
    <h3>Fetched the Data, Check Console for more details!</h3>
    <h3>{value.name}</h3>
    <img src={value.avatar_url} alt=""/>
  </div>
  
}



const ErrorPage =()=>{
  let location = useLocation()
  return (   
    <div>
      <nav>
      <Link to="*">Nested Wildcard Error Page</Link>     
      </nav>
      <h1>Route {location.pathname} doesn't exist!</h1>
      <Outlet/>
    </div>
  )
}

const ErrorPageNested =()=>{
  let location = useLocation()
  return (   
    <div>
      <h1>Again, route {location.pathname} doesn't exist!</h1>
    </div>
  )
}



const Group1 = ()=>{
  return <React.Fragment>
    <nav>
      <Link to="another">Another Page</Link> <br/>
      <Link to="error">Error Page</Link>
    </nav>
    <Header name="Phuong"/>
    <Body myArrTest={myArrObj}/>        
    <Footer2 username="minhphuong1994"/>
  </React.Fragment>
}

const Group2 = ()=>{
  return <React.Fragment>
    <nav>
      <Link to="/">Previous Page</Link>
    </nav>
    <Header name="Phuong"/>
    <Body myArrTest={myArrObj}/>        
    <Footer/>
  </React.Fragment>
}



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Group1/>}/>
        <Route path="/another" element={<Group2/>}/>   
        <Route path="/error" element={<ErrorPage/>}>
          <Route path="*" element={<ErrorPageNested/>}/>
        </Route>     
      </Routes> 
    </div> 
  )
}


export default App
