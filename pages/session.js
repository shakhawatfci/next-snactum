  import { useEffect, useState } from "react";
  import AdminLayout from "../components/layouts/AdminLayout"
  import authMiddleware from "../middleware/authMiddleware";
  import axios  from "../util/server";
  import Pagination from "react-js-pagination";
  import Dropdown from 'react-bootstrap/Dropdown';
  import DropdownButton from 'react-bootstrap/DropdownButton';
  import { FaAlignRight } from "react-icons/fa";

  import Router, { withRouter , useRouter } from 'next/router'
  import { successMessage , errorMessage } from "../util/helper";

  import Link from "next/link";
  import SessionFilter from "../components/session/SessionFilter";
  // import Cookies from "js-cookie";
  import MetaHeader from "../components/MetaHeader";
  import { format } from "date-fns";
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
      const [sessionData , setSessionList] = useState(null);
      const [isSessionLoading,updateLoader] = useState(false);
      const { query } = useRouter();


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
        <MetaHeader pageTitle={'Session List'} />
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

         {/* import session filter here  */}
         <SessionFilter filterData={filterData} setFilter={setFilter} resetFilter={resetFilter}  />
         {/* import session filter here  */}

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
                      <th>Date Time</th>
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
                          <td>
                           <p>{format(new Date(session.session_start_time),'MMMM, d Y H:mm')}</p> 
                           <p>{format(new Date(session.session_end_time),'MMMM, d Y H:mm')}</p>
                          </td>
                          <td>
                            {session.student_list.length == 1 ? session.student_list[0].name  : `${session.student_list[0].name} + (${session.student_list.length-1})`   }
                          </td>
                          <td>{session.session_medium}</td>
                          <td>{session.session_for}</td>
                          <td>{session.status}</td>
                          <td>{session.invoice_status}</td>
                          <td className="text-end">
                          <DropdownButton id="dropdown-basic-button" variant="outline-secondary" title={<FaAlignRight />}>
                          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                          </DropdownButton>
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

    
