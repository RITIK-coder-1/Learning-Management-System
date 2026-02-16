/* ----------------------------------------------------------------------------------------------
getFormData.js
This util function returns a formdata for file related uploads 
------------------------------------------------------------------------------------------------- */

function getFormData(object) {
  const formData = new FormData();

  Object.keys(object).forEach((field) => {
    formData.append(field, object[field]);
  });

  return formData;
}

export default getFormData;
