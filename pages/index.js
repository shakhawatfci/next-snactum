import AdminLayout from "../components/layouts/AdminLayout"
import authMiddleware from "../middleware/authMiddleware";
// import FullCalendar from '@fullcalendar/react' // must go before plugins
// import dayGridPlugin from '@fullcalendar/daygrid' 
// import Cookies from "js-cookie";
import MetaHeader from "../components/MetaHeader";
import { FaRegCalendarCheck , FaUserGraduate, FaUserSecret , FaHotel   } from "react-icons/fa";
export default function Home() {
  
   const getRandomNumber = (from,to) => {
        
    return Math.floor((Math.random()*to)+from);
    
   }
  return (
    <AdminLayout>
     <div className="container mt-2">
        <MetaHeader pageTitle={'Dashboard'} />
         {/* design a dashboard with some stats like total session totla student and total teacher  */}

          <div className="row">
              <div className="col-md-3">
                  <div className="card mt-2">
                      <div className="card-body  d-flex justify-content-">
                           <div className="counter counter-green">
                                <FaRegCalendarCheck />
                           </div>

                            <div className="text-left" style={{paddingLeft:20}}>
                                <p className="counter-number">1923</p>
                                <p className="counter-title">Total Session</p>
                            </div>
                      </div>

                  </div> 
               </div>
              <div className="col-md-3 mt-2">
                  <div className="card">
                      <div className="card-body  d-flex justify-content-">
                           <div className="counter counter-purple">
                                <FaUserGraduate />
                           </div>

                            <div className="text-left" style={{paddingLeft:20}}>
                                <p className="counter-number">34434</p>
                                <p className="counter-title">Total Student</p>
                            </div>
                      </div>

                  </div> 
               </div>
              <div className="col-md-3 mt-2">
                  <div className="card">
                      <div className="card-body  d-flex justify-content-">
                           <div className="counter counter-blue">
                                <FaUserSecret />
                           </div>

                            <div className="text-left" style={{paddingLeft:20}}>
                                <p className="counter-number">232</p>
                                <p className="counter-title">Total Teacher</p>
                            </div>
                      </div>

                  </div> 
               </div>
              <div className="col-md-3 mt-2">
                  <div className="card">
                      <div className="card-body  d-flex justify-content-">
                           <div className="counter counter-orange">
                                <FaHotel />
                           </div>

                            <div className="text-left" style={{paddingLeft:20}}>
                                <p className="counter-number">442</p>
                                <p className="counter-title">Total Institute</p>
                            </div>
                      </div>

                  </div> 
               </div>
            </div>

            {/* <div className="row">
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                weekends={false}
                events={[
                    { title: 'event 1', date: '2019-04-01' },
                    { title: 'event 2', date: '2019-04-02' }
                ]}
                />
            </div> */}
     </div>
    </AdminLayout>
   
  )
}

export const getServerSideProps = async (context)=>  authMiddleware(context , {});
