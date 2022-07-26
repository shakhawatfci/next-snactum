import nextCookie from "next-cookies";
import redirect from "../util/redirect";


const guestMiddleware = async (context ,{}) => {

  const { access_token } = nextCookie(context);

  if (access_token) {
    return redirect(context, "/");
  }

  
  return {
    props: {}
  };

};

export default guestMiddleware;