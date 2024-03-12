// import { sample } from 'lodash';
// import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------
const API =import.meta.env.VITE_REACT_APP_API;
 
// export const users = [...Array(24)].map((_, index) => ({
//   id: faker.string.uuid(),
//   avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
//   name: faker.person.fullName(),
//   company: faker.company.name(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'banned']),
//   role: sample([
//     'Leader',
//     'Hr Manager',
//     'UI Designer',
//     'UX Designer',
//     'UI/UX Designer',
//     'Project Manager',
//     'Backend Developer',
//     'Full Stack Designer',
//     'Front End Developer',
//     'Full Stack Developer',
//   ]),
// }));

 export const fetchUsers=async()=> {
  try {
    const headers = new Headers({
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`${API}/api/admin/users`,{ method: 'GET', headers });
    const users = await response.json();
    return users.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

// function deleteUser(ctrl) {
//   var rd = getRowContent(ctrl);
//   if (!confirm('Are you sure you want to delete this entry?')) return;
//   $.get(`${apiUrl}/admin/user/delete?id=${rd.id}`).then(r => {
//       if (r.success) {
//           toastr.success('Deleted Successfully');
//           sr = 1;
//           $('#tblUser').DataTable().ajax.reload();
//       }
//       else
//       {
//            $.get(`${zestApi}/admin/user/delete?id=${rd.id}`).then(r => {
//       if (r.success) {
//           toastr.success('Deleted Successfully');
//           sr = 1;
//           $('#tblUser').DataTable().ajax.reload();
//       }
   
//   })

//       }
//   })
// }


export const deleteUser=async(id)=>{

  console.log(id);
  try {
    const headers = new Headers({
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`${API}/api/admin/user/delete?id=${id}`,{ method: 'GET', headers });
    const users = await response.json();
    return users.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }

}


export const setPassword=async(obj)=>{

  
  try {
    const headers = new Headers({
      "Content-type":'application/json',
      'x-token': sessionStorage.getItem('token'),
    });
    const response = await fetch(`${API}/api/admin/user/changePassword`,{ method: 'POST', headers ,body:JSON.stringify(obj)});
    const users = await response.json();
    return users.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }

}


