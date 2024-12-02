import axios from 'axios';

const send = async ({method='', path='', data={}}) => {
  const commonUrl = '/api';
  const url = commonUrl + path;

  const options = {
    method,
    url,
    data,
  };

  return axios(options); // 만들어진 값들 호출
};

const getApi = async ({path=''}) => {
  return await send({method: 'GET', path});
}

const postApi = async ({ path = '', data = {} }) => {
  return await send({ method: 'POST', path, data });
}

const putApi = async ({path='', data={}}) => {
  return await send({method: 'PUT', path, data});
}

const patchApi = async ({path='', data={}}) => {
  return await send({method: 'PATCH', path, data});
}

const deleteApi = async ({path='', data={}}) => {
  return await send({method: 'DELETE', path, data});
}

// const errHandler = (status, api) => {
//   if (status === 401) {
//     console.log('401 error');
//   } else if (status === 404) {
//     console.log('404 error');
//   } else if (status === 500) {
//     console.log('500 error');
//   } else {
//     console.log('error');
//   }
// }

export {
  getApi,
  postApi,
  putApi,
  patchApi,
  deleteApi,
  // errHandler,
}
