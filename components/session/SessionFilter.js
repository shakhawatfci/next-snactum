import { useEffect, useState } from "react";
import {getAllStudent,getAllTeacher , getAllInstitute , getAllParent} from "../../util/common_api"
import Form from 'react-bootstrap/Form';

export default function SessionFilter({ setFilter  , resetFilter , filterData })
{
    const [studentList , setStudentList] = useState([]);
    const [teacherList , setTeacherList] = useState([]);
    const [parentList , setParentList] = useState([]);
    const [showFilter,setFilterStatus] = useState(false);

    useEffect(() => {
        getStudentList();
        getTeacherList();
    }
    , []);

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
   


    return (
        <form>
        <div className="row mt-2">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    value={showFilter}
                    onChange={() => { setFilterStatus(!showFilter) }}
                    label={!showFilter ? 'Show Filter' : 'Hide Filter'}
                />
              </div>

              {showFilter ? (<div className="collapse show" id="collapseExample2">
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
                        <button type="button" onClick={() => resetFilter()} className="btn btn-outline-success w-sm me-2">Reset</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>) : '' }
            </div>
          </div>
        </div>
      </form>
    )
}