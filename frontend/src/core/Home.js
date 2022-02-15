import { isAuthenticated } from '../auth'
import { getCategories,getFlows} from "../user/apiHelper";
import { useEffect,useState } from "react";
import ReactFlowRenderer from '../react-flow-renderer';
import Showflow from '../user/Showflow'
import Menu from "./Menu";
import { Redirect } from 'react-router-dom';
const Home = () => {
    const [categories, setCategories] = useState(false)
    const [flowcharts, setFlowcharts] = useState(false)
    const [currentFlowChart, setCurrentFlowChart] = useState([])
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log("error occured")
            } else {
                
                let mySet1 = new Set()
                data.map((d, i) => {
                    // console.log(d.category)
                    mySet1.add(d.category)
                })
                const array = [...mySet1];
                setCategories(array)
            }
        })

        getFlows().then(data => {
            if (data.error) {
                console.log("error occured")
            } else {
                setFlowcharts(data)
            }
        })
    };
    const handleClick = (e) => {
        setCurrentFlowChart([])
        // console.log(e.target.value)
        let x = []
        flowcharts.map((fc, i) => {
            // console.log(fc.category === e.target.value)
            if(fc.category === e.target.value){
                x.push(fc)
            }
        })
        setCurrentFlowChart(x)
        // console.log(currentFlowChart)
    }

    useEffect(() => {
        init();
    }, []);
    return (
        <div>
        <Menu></Menu>
        <div>
            
            <div >
                {
                    !isAuthenticated() && <Redirect to="/signin"></Redirect>
                }
            {   isAuthenticated() && isAuthenticated().user.role === 0 &&
                    categories && categories.map((fc, i) => {
                        return (<div key={i}>
                            <button key={i} value={fc} onClick={(e) => handleClick(e)} >
                                {fc}
                            </button>
                            <br></br>
                            <br></br>
        
                        </div>)
                    })
            }
            </div>
            {/* <Dashboard flow={currentFlowChart}></Dashboard> */}
            {isAuthenticated() && isAuthenticated().user.role === 1 &&
                // < Layout
                //     title="Add a flowchart"
                //     description=""
                //     className="container col-md-8 offset-md-2"
                // >
                    <ReactFlowRenderer />

                // </Layout >


            }
              {isAuthenticated() && isAuthenticated().user.role === 0 && 
                <div> 
                    {/* {JSON.stringify(props.flow)} */}
                    <Showflow flow={currentFlowChart}></Showflow>
                    {/* <Home></Home> */}
                
                 </div>
              }
        </div>
            </div>
    )
}
export default Home;