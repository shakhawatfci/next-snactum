      import { useEffect, useRef, useState } from "react";
      import AdminLayout from "../components/layouts/AdminLayout";
      import { sessionFormData , errorMessage } from "../util/helper";
      import Form from 'react-bootstrap/Form';
      import { getAllInstitute  } from "../util/common_api";
      import apiInstance from "../util/server";
      import { FaPray } from "react-icons/fa";
      import MetaHeader from "../components/MetaHeader";
      
      export default function createSession()
      {
        const student_inital_call = useRef(true);
        const [formData , setFormData] = useState(sessionFormData);
        const [currentStep,setStep] = useState(1);
        const [instituteList,setInstituteList] = useState([]);
        const [studentList , setStudentList] = useState([]);
        const [selectedTeacher , setTeacher] = useState(null);
        const [loader , setLoader ] = useState({ studentLoader : false })

        useEffect(() => {
          getInstituteList();
        },[])
      
      
    
        useEffect(() => {
          console.log(student_inital_call.current);
          if(student_inital_call.current === true)
          {
            student_inital_call.current = false;
            return;
          }
          else
          {
            getStudents();
          }
          
        },[formData.session_type,formData.teacher_id,formData.institute_id])

        const handleChange = (e) => {
            
          const data = {
            ...formData,
            [e.target.name]: e.target.value.trim(),
          };

          if(e.target.name == 'session_type' || e.target.name == 'institute_id')
          {
            data.students = [];
            data.teacher_id = "";
            setTeacher(null);
          }

          setFormData(data);

        }

        function getInstituteList()
        {
          getAllInstitute().then(res => {
            setInstituteList(res.data.data.institutes)
          })
        }

        function getStudents()
        {
          if(!formData.session_type){
            return true;
          }
          
          if(formData.session_type == 'Institute' && formData.institute_id == ''){
            return true;
          }

          let data = {
             'session_type' :  formData.session_type,
             'institute_id' :  formData.session_type == 'Institute' ? formData.institute_id : '',
            // 'parent_id' :  formData.session_type == 'Institute' ? formData.institute_id : '',
            'teacher_id'   :  formData.teacher_id 
          }
          let queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
          setLoader({...loader,studentLoader : true});
          apiInstance.get(`student-list-session?${queryString}`)
          .then(response => {
              setStudentList(response.data.data.students);
          }).finally(() => setLoader({...loader,studentLoader : false}))
        }

        function onStudentChange(student)
        {
          
          let studentsArr = formData.students;
          const index = studentsArr.indexOf(student.id);
          if (index > -1) { // only splice array when item is found
            studentsArr.splice(index, 1); // 2nd parameter means remove one item only
          }
          else
          {
            studentsArr.push(student.id);
          }



          setFormData({...formData,students : studentsArr });

          if(studentsArr.length == 1) {
            setFormData({...formData,teacher_id : student.teacher_id });
            setTeacher(student.teacher);
            if(formData.session_medium == 'In Person')
            {
              setFormData({...formData,milage : student.milage });
            }
          }

          if(studentsArr.length == 0)
          {
            setFormData({...formData,teacher_id : "" });
            setTeacher(null);
          }

        }

        function  goToNext() 
        { 
          var errors = [];
          if(currentStep == 1)
          {
            
            if(!formData.session_medium)
            {
              errors.push('Please select session type');
            }
            if(!formData.session_type)
            {
              errors.push('Please select session for');
            }

            if(formData.session_type == 'Institute')
            {
              if(!formData.institute_id)
              {
                errors.push('Please select an institute');
              }
            }

          }

          if(currentStep == 2) 
          {
            if(formData.students <= 0)
            {
              errors.push('Please Select atleast one student');
            }
          }
          
          if(errors.length > 0){
            errorMessage(errors);
            return false;
          }
          else
          {
            setStep(currentStep+1);
          }

        }

        function backStep()
        {
          setStep(currentStep-1);
        }

        
        
          return (
            <AdminLayout>
              <MetaHeader pageTitle={'Create Session'} />
                <div style={{marginTop:50}}>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="text-center">Create Session</h3>
                    </div>
                </div>
                <form>
                  {currentStep == 1 && <div className="step-one">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                          <div className="form-group">
                              <label className="label">Session Type</label>
                              <div className="mb-3 mt-2">
                              <Form.Check type="radio" >
                                <Form.Check.Input value={"Virtual"}  onChange={(e) => { handleChange(e) }} 
                                checked={formData.session_medium == 'Virtual' ? true : false}
                                name="session_medium" type="radio" isValid />
                                <Form.Check.Label>{`Virtual`}</Form.Check.Label>
                              </Form.Check>
                              <Form.Check type="radio" >
                                <Form.Check.Input value={"In Person"} onChange={(e) => { handleChange(e) }}
                                checked={formData.session_medium == 'In Person' ? true : false}
                                 name="session_medium" type="radio" isValid />
                                <Form.Check.Label>{`In Person`}</Form.Check.Label>
                              </Form.Check>
                            </div>
                          </div>

                          <div className="form-group">
                              <label className="label">Session For</label>
                              <div className="mb-3 mt-2">
                              <Form.Check type="radio" >
                                <Form.Check.Input value={"Individual"}  onChange={(e) => { handleChange(e) }}
                                 checked={formData.session_type == 'Individual' ? true : false} name="session_type" type="radio" isValid />
                                <Form.Check.Label>{`Individual`}</Form.Check.Label>
                              </Form.Check>
                              <Form.Check type="radio" >
                                <Form.Check.Input value={"Institute"} onChange={(e) => { handleChange(e) }} 
                                checked={formData.session_type == 'Institute' ? true : false} name="session_type" type="radio" isValid />
                                <Form.Check.Label>{`Institute`}</Form.Check.Label>
                              </Form.Check>
                            </div>
                          </div>

                          {formData.session_type == 'Institute' && <div className="form-group mb-3">
                              <label className="label">Institute</label>
                              <select className="form-control" onChange={(e) => {handleChange(e)}} value={formData.institute_id} name="institute_id">
                                <option value="">Choose Institute</option>
                                {instituteList.map((value,index) => {
                                  return (
                                    <option key={index+'instte'} value={value.id}>{value.institution_name}</option>
                                  );
                                })}
                              </select>
                          </div>}


                        </div> 
                    </div>
                  </div>}

                  {currentStep == 2 && <div className="step-two">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                             
                            {selectedTeacher && <div className="form-group mb-2">
                              <label>Student For Teacher</label>
                                <input type="text" className="form-control" value={selectedTeacher.name} disabled />
                           </div>}

                           {loader.studentLoader && <div className="form-group">
                              <h5>Loading students.....</h5>
                           </div> }

                           {!loader.studentLoader && <div className="studentBox" style={{ overflowY:'auto',maxHeight : 300 }}>
                            
                            {studentList.map((student,index) => {
                                return (
                                <div className="form-check" key={'studentList'+index}>
                                <input className="form-check-input" onChange={() => onStudentChange(student) }
                                  checked={formData.students.includes(student.id) ? true : false}
                                  type="checkbox" value={student.id} id={'flexCheckDefault'+index} />
                                <label className="form-check-label" for={'flexCheckDefault'+index}>
                                  {student.name}
                                </label>
                                </div>
                                )
                              })
                              }

                            </div>}
                        </div> 
                    </div>
                  </div>}


                  {currentStep == 3 && <div className="step-three">
                      <div className="row">
                         <div className="col-md-6 mx-auto">
                            <div className="form-group mb-2">
                                <label>Mileage</label>
                                <input type="text" className="form-control" 
                                disabled={formData.session_medium == 'Virtual' ? true : false} 
                                value={formData.session_medium == 'In Person' ? formData.milage : 0}/>
                            </div>
                         </div>
                      </div>
                  </div>}

                  <div className="row mt-3">
                      <div className="col-md-6 mx-auto">
                          <div className="form-group text-right">
                              {currentStep > 1 && <button type="button" onClick={backStep}
                              className="btn btn-outline-danger" style={{marginRight:10}}>Previous Step</button> }
                              <button type="button" onClick={goToNext} className="btn btn-outline-success mx-auto">Next Step</button>
                          </div>
                      </div>
                  </div>

                </form>
                </div>


            </AdminLayout>
          ) 
      }