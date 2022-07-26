import Router from "next/router";

export default (context ,  target) => {
	if (context.res) {
		context.res.writeHead(303, { Location: target });
		context.res.end();
		return { props: {} };
	} else {
		// In the browser, we just pretend like this never even happened ;)
		return Router.replace(target);
	}
};