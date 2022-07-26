import { useState } from "react";
import AdminLayout from "../components/layouts/AdminLayout"
import authMiddleware from "../middleware/authMiddleware";
// import Cookies from "js-cookie";
export default function SessionList() {
  
    const [filterData , setFilter ] = useState({
        teacher_id : '',
        session_for : '',
        parent_id : '',
        student_id : '',
        status : ''

    });

  return (
    <AdminLayout>
     <div className="container mt-2">
         {/* design a dashboard with some stats like total session totla student and total teacher  */}
         <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Session List</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><a href="javascript: void(0);">Dashboard</a></li>
                <li className="breadcrumb-item active">Session List</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <form>
      <div className="row mt-2">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <a className="icon-demo-content d-flex justify-content-between align-items-center"
                data-bs-toggle="collapse" href="#collapseExample2" aria-expanded="false"
                aria-controls="collapseExample2">
                   List
              </a>
            </div>
            <div className="collapse show" id="collapseExample2">
              <div className="card-body pb-0">
                <div className="row">
                  
                 <div className="col-md-3 mb-3">
                    <label className="form-label" for="formrow-email-input">Select Teacher</label>
                    <select className="form-control select2" name="teacher_id">
                      <option value="">All Teacher</option>
                        <option  value="4">Leah Duncan</option>
                        <option  value="10">Leo Pickett</option>
                        <option  value="12">Saif Uddin</option>
                        <option  value="13">Rahat Nuri</option>
                        <option  value="14">Shakhawat hossain</option>
                        <option  value="20">Noah Cox</option>
                        <option  value="21">Patience Roth</option>
                        <option  value="22">Willow Merrill</option>
                        <option  value="36">Michael Mcfadden</option>
                    </select>
                  </div>
                  
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Session For</label>
                    <select className="form-control select2" id="session-type" name="session_for">
                      <option value="">All</option>
                      <option  value="Individual">Individual</option>
                      <option  value="Institute">Institute</option>
                    </select>
                  </div>

                  <div className="col-md-3 mb-3">
                    <label className="form-label" for="formrow-email-input" id="parent-label">Choose Parent/Institute</label>
                    <select name="parent_id" className="form-control select2" id="all-parent">
                            <option value="">Choose Parent/Institute</option> 
                    </select>
                  </div> 

                                                      
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Students</label>
                    <select className="form-control select2" name="student_id" id="students">
                      <option value="">All Students</option>
                        <option  value="5">Ryder Kaufman</option>
                        <option  value="6">Serena Barrera</option>
                        <option  value="8">Sloane Douglas</option>
                        <option  value="9">Joel Griffin</option>
                        <option  value="11">Shakhawat hossain</option>
                        <option  value="15">shakhawat ssl</option>
                        <option  value="26">Baxter Guzman</option>
                        <option  value="27">Violet Soto</option>
                        <option  value="28">Gretchen Mclaughlin</option>
                        <option  value="29">Raja Carter</option>
                        <option  value="30">Hedley Sparks</option>
                        <option  value="31">Ishmael Savage</option>
                        <option  value="32">Kamrul Touhid</option>
                        <option  value="33">Sultan</option>
                        <option  value="35">Scott Travis</option>
                    </select>
                  </div>
                  
                  
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Session Status</label>
                    <select className="form-control select2" name="status">
                    <option value="">All Status</option>
                    <option  value="Pending">Pending</option>
                    <option  value="Ongoing">Ongoing</option>
                    <option  value="Completed">Completed</option>
                    <option  value="Billable Cancellation">Billable Cancellation</option>
                    <option  value="Non-Billable Cancellation">Non-Billable Cancellation</option>
                    </select>
                  </div>

                  <div className="col-md-3 mb-2">
                    <label className="form-label">&nbsp;</label>
                    <div>
                      <a href="http://localhost:8000/session/schedule/list" className="btn btn-outline-primary w-sm me-2">Reset</a>
                      <button type="submit" className="btn btn-primary w-sm">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

      <div className="row mt-2">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Session List</h4>
            </div>
            <div className="card-body pt-0 px-2">
              <div className="table-responsive">
                <table className="table table-nowrap align-middle">
                  <thead>
                    <tr>     
                    <th>Teacher</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Student Enrolled</th>
                    <th>Type</th>
                    <th>Session For</th>
                    <th>Repeat</th>
                    <th>Status</th>
                    <th>Invoice Status</th>
                    <th className="text-end">Action</th>
                    </tr>
                  </thead>

                </table>
              </div>
              <div className="d-flex justify-content-end mt-2">
               
               {/* pagination will be here  */}

              </div>

            </div>

          </div>
        </div>
      
      </div>
     </div>
    </AdminLayout>
   
  )
}

export const getServerSideProps = async (context)=>  authMiddleware(context , {});
