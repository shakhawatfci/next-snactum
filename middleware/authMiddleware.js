import nextCookie from "next-cookies";
import redirect from "../util/redirect";


const authMiddleware = async (context ,{}) => {

  const { access_token } = nextCookie(context);


  if (!access_token) {
    return redirect(context, "/login");
  }

  
  return {
    props: {}
  };

};

export default authMiddleware;