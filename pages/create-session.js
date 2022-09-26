      import { useEffect, useRef, useState } from "react";
      import AdminLayout from "../components/layouts/AdminLayout";
      import { sessionFormData , errorMessage , successMessage, showValidationErrors } from "../util/helper";
      import Form from 'react-bootstrap/Form';
      import { getAllInstitute , getAllCountryList , getAllRegionList  } from "../util/common_api";
      import apiInstance from "../util/server";
      import { FaPray , FaSpinner } from "react-icons/fa";
      import MetaHeader from "../components/MetaHeader";
      import Skeleton from 'react-loading-skeleton'
      import DatePicker from "react-datepicker";
      import { useRouter } from "next/router";
      import { format } from 'date-fns';

      
      export default function createSession()
      {
        const router = useRouter();
        const student_inital_call = useRef(true);
        const [formData , setFormData] = useState(sessionFormData);
        const [currentStep,setStep] = useState(1);
        const [instituteList,setInstituteList] = useState([]);
        const [studentList , setStudentList] = useState([]);
        const [countryList , setCountryList] = useState([]);
        const [regionList , setRegionList ] = useState([]);
        const [selectedTeacher , setTeacher] = useState(null);
        const [loader , setLoader ] = useState({ studentLoader : false , formLoading : false })
        const [calculatedHour , setHour] = useState('1h : 5m');

        useEffect(() => {
          getInstituteList();
          getCountryList();
        },[])

        useEffect(() => {
          getRegionList();
        },[formData.country_id])


      
      
    
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

        useEffect(() => {
          calculateTimeDifferent();          
        },[formData.session_start_time,formData.session_end_time])

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

        function getCountryList()
        {
          getAllCountryList().then(response => {
             setCountryList(response.data.data.country_list);
          })
        }

        function getRegionList()
        {
          getAllRegionList(formData.country_id).then(response => {
            setRegionList(response.data.data.region_list);
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
              if(formData.session_type == 'Individual')
              {
                setFormData({...formData,
                   street_address_1 : student.street_address_1,
                   street_address_2 : student.street_address_2,
                   city : student.city,
                   zip_code : student.zip_code,
                   country_id : student.country_id,
                   region_id : student.region_id
                });
              }
            }
          }

          if(studentsArr.length == 0)
          {
            setFormData({...formData,teacher_id : "" });
            setTeacher(null);
          }

        }

        function onStartDateChange(date)
        {

          setFormData({...formData,session_start_time : date , session_end_time : new Date(date).setHours(date.getHours() + 1)})
         
        }

        function onEndDateChange(date)
        {
          setFormData({...formData,session_end_time : date})

        }

        function calculateTimeDifferent()
        {


            var start = new Date(formData.session_start_time);
            var end = new Date(formData.session_end_time);
            var diff = end - start;
            var diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
            var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
            let difString = diffHrs+'h:'+diffMins+'m'; 
            setHour(difString);
            
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

        function storeSession(e)
        {
          e.preventDefault();
          setLoader({...loader,formLoading : true});
          let start_date = format(formData.session_start_time,'MMMM, d Y H:mm');
          let end_date = format(formData.session_end_time,'MMMM, d Y H:mm');

         let  data = {...formData,session_start_time : start_date , session_end_time : end_date , 'teacher_id' : selectedTeacher.id};
    
          apiInstance.post('create-session',data).then(response => {
            successMessage('Session Created');
            router.push('/session');
          }).catch((err) => {
             showValidationErrors(err);
          }).finally(() => setLoader({...loader,formLoading : false}))
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
                <form onSubmit={(e) => storeSession(e)}>
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
                              <Skeleton count={5} />
                           </div> }

                           {!loader.studentLoader && <div className="studentBox" style={{ overflowY:'auto',maxHeight : 300 }}>
                            <p>Choose Student</p>
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
                                <input type="text" onChange={e => handleChange(e)} name="milage"  className="form-control" 
                                disabled={formData.session_medium == 'Virtual' ? true : false} 
                                value={formData.session_medium == 'In Person' ? formData.milage : 0}/>
                            </div>
                            <div className="form-group mb-2">
                                <label>Start Date</label>
                                <DatePicker showTimeSelect 
                                dateFormat="MMMM, d Y H:mm" 
                                className="form-control"
                                name="session_start_time"
                                minDate={new Date()}
                                selected={formData.session_start_time}
                                onChange={(date) => onStartDateChange(date)} />
                            </div>
                            <div className="form-group mb-2">
                                <label>End Date</label>
                                <DatePicker showTimeSelect 
                                dateFormat="MMMM, d Y H:mm" 
                                className="form-control"
                                name="session_end_time"
                                minDate={new Date()}
                                selected={formData.session_end_time}
                                onChange={(date) => onEndDateChange(date)} />
                            </div>
                            <div className="form-group mb-2">
                                <label>Duration <span className="badge badge-soft-secondary bg-secondary">{calculatedHour}</span> </label>
                                
                            </div>

                            <div className="form-group">
                                <label>Hourly Cost</label>
                                <input type="number" step={'any'} name="cost" value={formData.cost} onChange={(e) => handleChange(e)} className="form-control" />
                            </div>
                         </div>
                      </div>
                  </div>}

                  {currentStep == 4 && <div className="step-three">
                      <div className="row">
                        { formData.session_medium == "In Person"  &&  <div className="col-md-6 mx-auto">
                              <div className="form-group">
                                <label>Street Address 1</label>
                                <input type={'text'} value={formData.street_address_1} name="street_address_1" onChange={(e) => handleChange(e)} className="form-control" />
                              </div>
                              <div className="form-group">
                                <label>Street Address 2</label>
                                <input type={'text'} value={formData.street_address_2} name="street_address_2" onChange={(e) => handleChange(e)} className="form-control" />
                              </div>
                              <div className="form-group">
                                <label>City</label>
                                <input type={'text'} value={formData.city} name="city" onChange={(e) => handleChange(e)} className="form-control" />
                              </div>
                              <div className="form-group">
                                <label>Country</label>
                               <select className="form-control" onChange={(e) => handleChange(e)} value={formData.country_id} name="country_id">
                                  <option value="">Select Country</option>
                                  {countryList.map((value,index) => <option key={value.id+'country'} value={value.id}>{value.name}</option>  )}
                               </select>
                              </div>
                              <div className="form-group">
                                <label>Region</label>
                                <select className="form-control" onChange={(e) => handleChange(e)} value={formData.region_id} name="region_id">
                                  <option value="">Select Region</option>
                                  {regionList.map((value,index) => <option key={value.id+'region'} value={value.id}>{value.name}</option>  )}
                               </select>
                              </div>
                              <div className="form-group">
                                <label>Zip Code</label>
                                <input type={'text'} value={formData.zip_code} name="zip_code" onChange={(e) => handleChange(e)} className="form-control" />
                              </div>
                         </div> }
                         { formData.session_medium == "Virtual"  &&  <div className="col-md-6 mx-auto">
                             <div className="form-group">
                                <label>Online Link</label>
                                <input type={'text'} value={formData.online_link} name="online_link" onChange={(e) => handleChange(e)} className="form-control" />
                             </div>
                         </div> }
                      </div>
                  </div>}

                  

                  <div className="row mt-3">
                      <div className="col-md-6 mx-auto">
                          <div className="form-group text-right">
                              {currentStep > 1 && <button type="button" onClick={backStep}
                              className="btn btn-outline-danger" style={{marginRight:10}}>Previous Step</button> }
                              {currentStep < 4 && <button type="button" onClick={goToNext} className="btn btn-outline-success mx-auto">Next Step</button> }
                              {currentStep == 4 && <button type="submit" disabled={loader.formLoading ? true : false}  className="btn btn-outline-success mx-auto">
                                { loader.formLoading ? <FaSpinner/> : 'Save' }
                              </button> }
                          </div>
                      </div>
                  </div>

                </form>
                </div>


            </AdminLayout>
          ) 
      }