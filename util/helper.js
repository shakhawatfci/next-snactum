import toast from 'react-hot-toast';

export function showValidationErrors(err)
{
    if(err.response.status == 422)
    {
      let  errors = err.response.data.errors;

      if(errors)
      {
        errors.forEach((value) => {
            toast.error(value); 
        })
      }
      else
      {
        toast.error('Network error !');
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
    toast.error($message);
}
