import AdminLayout from "../components/layouts/AdminLayout"
import authMiddleware from "../middleware/authMiddleware";
import MetaHeader from "../components/MetaHeader";
import { FaBell , FaEye, FaClock   } from "react-icons/fa";
import axios from '../util/server';
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import { format , formatDistanceToNow } from 'date-fns'
export default function Home() {

   const [notifications,setNotifications] = useState([]);
   const [isLoading , setLoading] = useState(true);

   useEffect(() => {
      getNotificationList();
   },[])
   
   function getNotificationList()
   {
     setLoading(true);
      axios.get('notification-list?no_pagination=yes&notification_type=Unread')
      .then(res => {
         setNotifications(res.data.data.notifications);
      }).finally(() => {setLoading(false)});
   }

   function markAsRead(id)
   {
      let noti = [...notifications];
      let index = noti.findIndex(x => x.id == id);
      noti.splice(index,1);
      setNotifications(noti);

      axios.post(`update-notification-status/${id}`,{status:'Read'})
      .then(res => {

      });
   }
  

  return (
    <AdminLayout>
     <div className="container mt-2">
        <MetaHeader pageTitle={'Dashboard'} />
         {/* design a dashboard with some stats like total session totla student and total teacher  */}

          <div className="row" style={{maxHeight:'100vh',overflowY:'auto'}}>
         {isLoading ? (<div className="col-md-6 col-10 mx-auto">
         <Skeleton count={15} height={70} />
         </div>) :
          (<div className="col-md-6 col-10 mx-auto">
               {notifications.length > 0 && <div>
               { notifications.map(notification => {
                 return (
                 <div key={notification.id} className="row mb-2" style={{border:'1px solid #ccc',padding : 10}}>
                     <div className="col-2" style={{paddingTop:20}}>
                        <div className="notification-counter counter-green" >
                               <FaBell />
                          </div>
                     </div>

                     <div className="col-7">
                         <a href="" style={{color:'#000',fontSize:20,textDecoration:'none'}}>{notification.title}</a>
                         <p style={{color:"#999"}}>
                         {notification.body}
                         </p>
                     </div>

                     <div className="col-3 text-right" style={{textAlign:'right',paddingTop:20}}>
                          <button onClick={() => { markAsRead(notification.id) }} type="button" title="mark as visited" className="btn btn-float btn-outline-dark">
                           <FaEye />
                          </button>
                          <p style={{color:'#ccc',fontSize:12}} className="mt-2">
                            <FaClock /> {formatDistanceToNow(new Date(notification.created_at))}
                          </p>
                     </div>
              </div>)
               }) }
          </div>}
          {notifications.length <=0 && <div className="image text-center" style={{textAlign:'center'}}>
            <img src="./empty.svg" className="img-responsive img-fluid" style={{maxHeight:450}} /> 
            <h3 className="mt-2">No Notification Found</h3>
          </div>}
          </div>
          ) }
          </div>
     </div>
    </AdminLayout>
   
  )
}

export const getServerSideProps = async (context)=>  authMiddleware(context , {});
