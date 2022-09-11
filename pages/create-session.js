  import { useEffect, useState } from "react";
  import AdminLayout from "../components/layouts/AdminLayout";
  import { sessionFormData , errorMessage } from "../util/helper";
  import Form from 'react-bootstrap/Form';
  import { getAllInstitute  } from "../util/common_api";
  export default function createSession()
  {
    
    const [formData , setFormData] = useState(sessionFormData);
    const [currentStep,setStep] = useState(1);
    const [instituteList,setInstituteList] = useState([]);

    useEffect(() => {
       getInstituteList();
    },[])

    const handleChange = (e) => {
        
      const data = {
        ...formData,
        [e.target.name]: e.target.value.trim(),
      };

      if(e.target.name == 'session_type')
      {
         
        if(e.target.value == 'Individual')
        {
           setFormData({...formData , institute_id : ''})
        }

      }

      setFormData(data);

    }

    function getInstituteList()
    {
       getAllInstitute().then(res => {
         setInstituteList(res.data.data.institutes)
       })
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
            <div style={{marginTop:'10%'}}>
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


                    </div> 
                </div>
              </div>}

              {currentStep == 2 && <div className="step-two">
                <div className="row">
                    <div className="col-md-6 mx-auto">
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

              <div className="row">
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