      import { useEffect, useRef, useState } from "react";
      import AdminLayout from "../components/layouts/AdminLayout";
      import { sessionFormData , errorMessage } from "../util/helper";
      import Form from 'react-bootstrap/Form';
      import { getAllInstitute  } from "../util/common_api";
      import apiInstance from "../util/server";
  import { FaPray } from "react-icons/fa";
      export default function createSession()
      {
        const student_inital_call = useRef(true);
        const [formData , setFormData] = useState({  
        session_medium:"",
        session_type:"",
        institute_id:"",
        students:[],
        teacher_id:"",
        milage:"",
        session_start_time:"",
        session_end_time:"",
        cost:"",
        description:"",
        online_link:"",
        street_address_1:"",
        street_address_2:"",
        city:"",
        country_id:1,
        region_id:"",
        zip_code:"",
        repeat:0,
        repeat_type:"",
        repeat_end_date:"",
        repeat_sunday:"",
        repeat_monday:"",
        repeat_tuesday:"",
        repeat_wednesday:"",
        repeat_thursday:"",
        repeat_friday:"",
        repeat_saturday:""});
        const [currentStep,setStep] = useState(1);
        const [instituteList,setInstituteList] = useState([]);
        const [studentList , setStudentList] = useState([]);

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
          let data = {
            'session_type' :  formData.session_type,
            //  'institute_id' :  formData.session_type == 'Institute' ? formData.institute_id : '',
            'parent_id' :  formData.session_type == 'Institute' ? formData.institute_id : '',
            'teacher_id'   :  formData.teacher_id 
          }
          let queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
          apiInstance.get(`student-list-session?${queryString}`)
          .then(response => {
              setStudentList(response.data.data.students);
          })
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
          }

          if(studentsArr.length == 0)
          {
            setFormData({...formData,teacher_id : "" });
          }

          console.log(formData.teacher_id);
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
          
          if(errors.length > 0){
            errorMessage(errors);
            return false;
          }
          else
          {
            setStep(currentStep+1);
          }

        }
        
          return (
            <AdminLayout>
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
                                <Form.Check.Input value={"Virtual"}  onChange={(e) => { handleChange(e) }} name="session_medium" type="radio" isValid />
                                <Form.Check.Label>{`Virtual`}</Form.Check.Label>
                              </Form.Check>
                              <Form.Check type="radio" >
                                <Form.Check.Input value={"In Person"} onChange={(e) => { handleChange(e) }}  name="session_medium" type="radio" isValid />
                                <Form.Check.Label>{`In Person`}</Form.Check.Label>
                              </Form.Check>
                            </div>
                          </div>

                          <div className="form-group">
                              <label className="label">Session For</label>
                              <div className="mb-3 mt-2">
                              <Form.Check type="radio" >
                                <Form.Check.Input value={"Individual"}  onChange={(e) => { handleChange(e) }} name="session_type" type="radio" isValid />
                                <Form.Check.Label>{`Individual`}</Form.Check.Label>
                              </Form.Check>
                              <Form.Check type="radio" >
                                <Form.Check.Input value={"Institute"} onChange={(e) => { handleChange(e) }}  name="session_type" type="radio" isValid />
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
                            <div className="studentBox" style={{ overflowY:'auto',maxHeight : 300 }}>
                            
                            {studentList.map((student,index) => {
                                return (
                                <div className="form-check" key={'studentList'+index}>
                                <input className="form-check-input" onChange={() => onStudentChange(student) }  type="checkbox" value={student.id} id={'flexCheckDefault'+index} />
                                <label className="form-check-label" for={'flexCheckDefault'+index}>
                                  {student.name}
                                </label>
                                </div>
                                )
                              })
                              }

                            </div>
                        </div> 
                    </div>
                  </div>}

                  <div className="row mt-3">
                      <div className="col-md-6 mx-auto">
                          <div className="form-group text-right">
                              <button type="button" onClick={goToNext} className="btn btn-outline-success">Next Step</button>
                          </div>
                      </div>
                  </div>

                </form>
                </div>


            </AdminLayout>
          ) 
      }