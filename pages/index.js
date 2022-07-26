import AdminLayout from "../components/layouts/AdminLayout"
import authMiddleware from "../middleware/authMiddleware";
// import Cookies from "js-cookie";
export default function Home() {
  return (
    <AdminLayout>
     <div className="container mt-2">
         {/* design a dashboard with some stats like total session totla student and total teacher  */}

          <div className="row">
              <div className="col-md-4">
                  <div className="card">
                      <div className="card-body">
                          <h3 className="card-title">Total Session</h3>
                          <h1 className="card-text">
                              <i className="fas fa-chart-bar"></i>
                              <span className="badge badge-primary text-danger">10</span>
                          </h1>

                         </div>
                  </div> 
               </div>

               <div className="col-md-4">
                  <div className="card">
                      <div className="card-body">
                          <h3 className="card-title">Total Student</h3>
                          <h1 className="card-text">
                              <i className="fas fa-chart-bar"></i>
                              <span className="badge badge-primary text-danger">10</span>
                          </h1>

                         </div>
                  </div> 
               </div>

               <div className="col-md-4">
                  <div className="card">
                      <div className="card-body">
                          <h3 className="card-title">Total Teacher</h3>
                          <h1 className="card-text">
                              <i className="fas fa-chart-bar"></i>
                              <span className="badge badge-primary text-danger">10</span>
                          </h1>

                         </div>
                  </div> 
               </div>
            </div>
     </div>
    </AdminLayout>
   
  )
}

export const getServerSideProps = async (context)=>  authMiddleware(context , {});
