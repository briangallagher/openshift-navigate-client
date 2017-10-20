import axios from 'axios';

export const GET_ENGAGEMENTS = 'get_engagements';
export const CREATE_ENGAGEMENT = 'create_engagement';
export const FETCH_RESOURCES_FAIL = 'fetch_resources_fail';

const ROOT_URL = "https://localhost:8001";
//const ROOT_URL = "https://openshift-navigate-cloud25-openshiftnavigate.int.open.paas.redhat.com";
//const ROOT_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";


export function getEngagements() {
  // The callback is useful because we want to navigate the user only after the post comes back

  console.log('calling get Engagements');

  // const request = axios.get(`${ROOT_URL}/engagement`);

  // return {
  //   type: GET_ENGAGEMENTS,
  //   payload: request
  // };

  return function (dispatch) {
    console.log('calling create Engagements action');

    axios.get(`${ROOT_URL}/engagement`, {withCredentials: true})
      .then((response) => {
        console.log('response !!! ');
        dispatch({
            type: GET_ENGAGEMENTS,
            payload: response
        });

      })      // Async action failed...
      .catch((err) => {

        // TODO: see here for best practice on error handling
        // https://stackoverflow.com/questions/34403269/what-is-the-best-way-to-deal-with-a-fetch-error-in-react-redux

        console.log('err:::: ' + JSON.stringify(err));

        // Dispatch specific "some resources failed" if needed...
        dispatch({type: FETCH_RESOURCES_FAIL, error: err});

        // Dispatch the generic "global errors" action
        // This is what makes its way into state.errors
        // dispatch({type: ADD_ERROR, error: err});
      });
  }


}

export function createEngagement(name, callback) {

  return function (dispatch) {
    console.log('calling create Engagements action');

    let requestPayload = {
      'name': name
    };

    console.log('creating engagement requestPayload: ', requestPayload, {withCredentials: true});
    axios.post(`${ROOT_URL}/engagement`, requestPayload)
      .then((response) => {
        console.log('response !!! ');
        dispatch({
            type: CREATE_ENGAGEMENT,
            payload: response
        });

        callback();
      })      // Async action failed...
      .catch((err) => {

        console.log('err:::: ' + JSON.stringify(err));

        // Dispatch specific "some resources failed" if needed...
        // dispatch({type: FETCH_RESOURCES_FAIL});

        // Dispatch the generic "global errors" action
        // This is what makes its way into state.errors
        // dispatch({type: ADD_ERROR, error: err});
      });
  }
}


// Sample Error response{
// "config": {
//     "headers": {
//         "Accept": "application/json, text/plain, */*"
//     },
//     "maxContentLength": -1,
//     "method": "get",
//     "timeout": 0,
//     "transformRequest": {},
//     "transformResponse": {},
//     "url": "https://127.0.0.1:8001/engagement",
//     "xsrfCookieName": "XSRF-TOKEN",
//     "xsrfHeaderName": "X-XSRF-TOKEN"
// },
// "request": {},
// "response": {
//     "config": {
//         "headers": {
//             "Accept": "application/json, text/plain, */*"
//         },
//         "maxContentLength": -1,
//         "method": "get",
//         "timeout": 0,
//         "transformRequest": {},
//         "transformResponse": {},
//         "url": "https://127.0.0.1:8001/engagement",
//         "xsrfCookieName": "XSRF-TOKEN",
//         "xsrfHeaderName": "X-XSRF-TOKEN"
//     },
//     "data": {},
//     "headers": {
//         "content-type": "application/json; charset=utf-8"
//     },
//     "request": {},
//     "status": 401,
//     "statusText": "Unauthorized"
// }
