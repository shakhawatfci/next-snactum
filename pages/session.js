  import { useEffect, useState } from "react";
  import AdminLayout from "../components/layouts/AdminLayout"
  import authMiddleware from "../middleware/authMiddleware";
  import axios  from "../util/server";
  import Pagination from "react-js-pagination";

  import {getAllStudent,getAllTeacher , getAllInstitute , getAllParent} from "../util/common_api"

  import Router, { withRouter , useRouter } from 'next/router'

  import Link from "next/link";
  // import Cookies from "js-cookie";

  const initState = {
      teacher_id : '',
      session_for : '',
      parent_id : '',
      student_id : '',
      status : '',
      page : 1,
  };

  export default function SessionList() {
    
      const [filterData , setFilter ] = useState(initState);
      const [studentList , setStudentList] = useState([]);
      const [teacherList , setTeacherList] = useState([]);
      const [parentList , setParentList] = useState([]);
      const [sessionData , setSessionList] = useState(null);
      const [isSessionLoading,updateLoader] = useState(false);
      const { query } = useRouter();



      useEffect(() => {
          getStudentList();
          getTeacherList();
      }
      , []);

      useEffect(() => {
          getSessionList();
      }
      , [filterData]);


      const onPageChange =  (pageNumber) => {
        const data = {
            ...filterData,
            page: pageNumber
        };
        setFilter({...filterData, page : pageNumber});
        // refreshData(data);
       }
      

      const getStudentList = () => {

          getAllStudent()
          .then(res => {
              setStudentList(res.data.data.students.data);
          });
      }
      const getTeacherList = () => {

          getAllTeacher()
          .then(res => {
              // console.log(res.data);
              setTeacherList(res.data.data.teachers);
          });
      }


      const getInstituteList = () => {

          getAllInstitute()
          .then(res => {
              // console.log(res.data);
              setParentList(res.data.data.institutes);
          });
      }
      const getParentList = () => {

          getAllParent()
          .then(res => {
              // console.log(res.data);
              setParentList(res.data.data.parent);
          });
      }

      // const refreshData =  (data) => {
      //     let queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
      //     Router.push(`session?${queryString}`);
      // } 

      const handleChange = (e) => {
          const data = {
              ...filterData,
              [e.target.name]: e.target.value.trim(),
              page : 1
            };

          setFilter(data);
          
          if(e.target.name == 'session_for')
          {

            if(e.target.value == 'Individual')
            {
              getParentList();
            }
            else if(e.target.value == 'Institute')
            {
              getInstituteList();
            }
            else
            {
              setParentList([]);
            }

          }


          // refreshData(data);
      }

      const resetFilter = () => {

          setFilter(initState);
          // Router.push('session');
      }


      const getSessionList = () => {
          let queryString = Object.keys(filterData).map(key => key + '=' + filterData[key]).join('&');
          updateLoader(true);
          axios.get(`session-list?${queryString}`)
          .then(response => {
              setSessionList(response.data.data.session_list);
          }).finally(() => {
            updateLoader(false);
          });

      }

      





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
                      <select className="form-control select2" value={filterData.teacher_id} name="teacher_id" onChange={(e) => handleChange(e)}>
                        <option value="">All Teacher</option>
                          {teacherList.map((teacher , index) => (
                            <option  value={teacher.id}>{teacher.name}</option>
                          )) }
                      </select>
                    </div>
                    
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Session For</label>
                      <select className="form-control select2" id="session-type" value={filterData.session_for} onChange={(e) => handleChange(e)} name="session_for">
                        <option value="">All</option>
                        <option  value="Individual">Individual</option>
                        <option  value="Institute">Institute</option>
                      </select>
                    </div>

                    <div className="col-md-3 mb-3">
                      <label className="form-label" for="formrow-email-input" id="parent-label">Choose Parent/Institute</label>
                      <select name="parent_id" className="form-control select2" value={filterData.parent_id} id="all-parent" onChange={(e) => handleChange(e)}>
                              <option value="">Choose Parent/Institute</option> 
                          {parentList.map((parent, index) => (
                          <option  value={parent.id} key={`parent${index}`}>{parent.user_type == 'Parent' ? parent.name : parent.institution_name }</option>
                          ))}
                      </select>
                    </div> 

                                                        
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Students</label>
                      <select className="form-control select2" value={filterData.student_id} name="student_id" id="students" onChange={(e) => handleChange(e) }>
                        <option value="">All Students</option>
                          {studentList.map((student, index) => (
                          <option  value={student.id} key={`student${index}`}>{student.name}</option>
                          ))}
                      </select>
                    </div>
                    
                    
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Session Status</label>
                      <select className="form-control select2" value={filterData.status}  name="status" onChange={(e) => handleChange(e) }>
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
                        <button type="button" onClick={() => resetFilter()} className="btn btn-outline-primary w-sm me-2">Reset</button>
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

                {!isSessionLoading ? (<div className="table-responsive">
                  <table className="table table-nowrap align-middle">
                    <thead>
                      <tr>     
                      <th>Teacher</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Student Enrolled</th>
                      <th>Type</th>
                      <th>Session For</th>
                      <th>Status</th>
                      <th>Invoice Status</th>
                      <th className="text-end">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                  {sessionData?.data?.map((session, index) => (
                      <tr key={index}>
                          <td>{session.teacher.name}</td>
                          <td>{session.session_start_time}</td>
                          <td>{session.session_end_time}</td>
                          <td>{session.total_student}</td>
                          <td>{session.session_medium}</td>
                          <td>{session.session_for}</td>
                          <td>{session.status}</td>
                          <td>{session.invoice_status}</td>
                          <td className="text-end">
                              <Link href={`session/${session.id}`} >
                                  <a className="btn btn-primary btn-sm">View</a>
                                  </Link>
                              <a href={`/session/schedule/delete/${session.id}`} className="btn btn-outline-danger btn-sm">View</a>
                          </td>
                          
                      </tr>
                  ))}

                    </tbody>

                  </table>
                </div>) : (<div> <h3>Loading...</h3> </div>) }
                <div className="d-flex justify-content-end mt-2">
                
                                    <Pagination
                                      activePage={sessionData?.meta?.current_page ? sessionData?.meta?.current_page: 0}
                                      itemsCountPerPage={sessionData?.meta?.per_page ? sessionData?.meta?.per_page : 0 }
                                      totalItemsCount={sessionData?.meta?.total ? sessionData?.meta?.total : 0}
                                      onChange={(pageNumber) => {
                                          onPageChange(pageNumber)
                                      }}
                                      pageRangeDisplayed={8}
                                      itemClass="page-item"
                                      linkClass="page-link"
                                      firstPageText="First Page"
                                      lastPageText="Last Lage"
                                  />

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

  // export const getServerSideProps = async (context) => {

  //     // let queryString = context.req.url.split('?')[1];
      
  //     authMiddleware(context , {});

  //     // const  response  = await axios.get(`session-list?${queryString}`);

  //     // const sessionData = response.data.data.session_list;


  //     // return { props: {  sessionData  } };
  //     return {}

  // } 

    
