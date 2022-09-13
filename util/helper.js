import toast from 'react-hot-toast';

export function showValidationErrors(err)
{
    if(err.response.status == 422)
    {
      let  errors = err.response.data.errors;

      if(errors)
      {
       errorMessage(errors);
      }
      else
      {
        errorMessage('Network error !');
      }

    }
    else
    {
        toast.error('Something Went Wrong !');
    }
}

export function successMessage($message = 'Request Successfull')
{

    toast.success($message);
}
export function errorMessage($message = 'Request Failed')
{
    if(typeof $message == 'object')
    {
      $message.forEach((value) => {
        toast.error(value);
      })
    }
    else
    {
      toast.error($message);
    }
    
}

export const sessionFormData = {
  session_medium:"",
  session_type:"",
  institute_id:"",
  students:[],
  teacher_id:"",
  milage:0,
  session_start_time:new Date(),
  session_end_time:new Date(),
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
  repeat_saturday:"",
}