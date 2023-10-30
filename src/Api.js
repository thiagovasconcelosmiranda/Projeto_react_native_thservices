import axios from "axios";
const API = 'https://3c6f-2804-1254-81b0-0-fde6-4714-cee8-8805.ngrok-free.app';

export default {
    checkToken: async (token) => {
        const req = await fetch(`${API}/api/auth/refresh`, {
            method: 'POST',
            headers:{
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify({token})
           });
        const json = await req.json();
        return json;  
    },

    SignIn: async (email, password) => {
       const req = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({email,password})
       });
       const json = await req.json();
       return json; 
    },

    SignUp: async ( name, email, password) => {
        const req = await fetch(`${API}/api/auth/register`,{
           method:'POST',
           headers:{
           Accept: 'application/json',
                   'Content-Type': 'application/json'
           },
           body:JSON.stringify({name, email, password})
        });
        const json = await req.json();
        return json;
     },

    logout: async (token) => {
       const req = await fetch(`${API}/api/auth/logout`, {
         method: 'POST',
         headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
         }
       });
       const json = await req.json();
       return json;  
     },
     
     getAuth: async (token) => {
        const req = await fetch(`${API}/api/user`, {
            method: 'GET',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':` Bearer ${token}`
                },          
        })
        const json = await req.json();
        return json;
    },

    UpdateAuth: async (id, name, email, password, token) => {
        const req = await fetch(`${API}/api/auth/update/${id}`, {
          method: 'PUT',
          headers:{
             Accept: 'application/json',
             'Content-Type': 'application/json',
             'Authorization':`Bearer ${token}`
          },
          body:JSON.stringify({name, email, password})
        });
        const json = await req.json();
        return json;  
      },

      linkEmail: async (email) => {
        const req = await fetch(`${API}/api/auth/forgot-password`,{
          method: 'POST',
          headers: {
              Accept: 'application/json',
                'Content-Type': 'application/json',
           },
           body:JSON.stringify({email})
        });
        const json = await req.json();
        return json;
    },

    resetPassword: async ( password, repPassoword, token) => {
      const req = await fetch(`${API}/api/auth/reset-password`,{
        headers: {
          method: 'POST',
            Accept: 'application/json',
              'Content-Type': 'application/json',
         },
         body:JSON.stringify({ password, repPassoword, token})
      });
      const json = await req.json();
      return json;
  },

    getClient: async (id, token) => {
        const req = await fetch(`${API}/api/page/client/${id}`, {
            method: 'GET',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json', 
                    'Authorization':` Bearer ${token}` 
                },         
        })
        const json = await req.json();
        return json;
    },

    createClient: async (name, cpf, maritalStatus, cell, user_id, facebook, linkedin, instagram ,twitter, token) => {
        const req = await fetch(`${API}/api/page/client`, {
            method: 'POST',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                     'Authorization':` Bearer ${token}`
                }, 
                body: JSON.stringify({name, cpf, maritalStatus, cell, user_id, facebook, linkedin, instagram, twitter})    
        }); 
        const json = await req.json();
        return json;       
    },

    UpdateClient: async (name, cpf, maritalStatus, cell,  user_id, facebook, linkedin, instagram, twitter, token) => {        
        const req = await fetch(`${API}/api/page/client/${user_id}`, {
            method: 'PUT',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                     'Authorization':` Bearer ${token}`
                }, 
                body: JSON.stringify({name, cpf, maritalStatus, cell, facebook, linkedin, instagram, twitter})    
        }); 
        const json = await req.json();
        return json;
               
    },

    UploadClient: async (foto, client_id, token) => {
        const image = new FormData();
        image.append('client_id', client_id);
        image.append('image', {
            uri: foto,
            name: 'image.jpg',
            filename: 'image/jpg',
            type: 'image/jpg'
           });
           const res = await axios.post(`${API}/api/page/upload/client`, image, {
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':` Bearer ${token}`
             }
           });
            return res; 
    },

    getUploadClient: async (client_id, token)=>{
        const req = await fetch(`${API}/api/page/upload/client/${client_id}`, {
            method: 'GET',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':` Bearer ${token}`
                },     
        });
        const json = await req.json();
        return json;
    },
    
    getTestimonial: async (announcement_id) =>{
        const req = await fetch(`${API}/api/page/commentary/${announcement_id}`, {
            method: 'GET',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },     
        });
        const json = await req.json();
        return json;
      },

      createTestimonial: async (note, commentary, announcement_id, title) =>{
        const req = await fetch(`${API}/api/page/commentary`, {
            method: 'POST',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({note, commentary, announcement_id, title})
        });
        const json = await req.json();
        return json;
      },
   

    getCompany: async (client_id, token) => { 
        const req = await fetch(`${API}/api/page/company/${client_id}`, {
            method: 'GET',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':` Bearer ${token}`
                },   
                
        })
        const json = await req.json();
        return json;
    },

    createCompany: async (cnpj, dateStart, category_id, client_id, token) => { 
        const req = await fetch(`${API}api/page/company`, {
            method: 'POST',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':` Bearer ${token}`
                },   
                body:JSON.stringify({cnpj, dateStart, category_id, client_id})         
        })
        const json = await req.json();
        return json;
    },

    updateCompany: async (cnpj, dateStart, category_id, client_id, token) => { 
        const req = await fetch(`${API}/api/page/company/${client_id}`, {
            method: 'PUT',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':` Bearer ${token}`
                },  
                
                body:JSON.stringify({cnpj, dateStart, category_id})      
        });
        const json = await req.json();
        return json;
    },
    
    getCategory: async (token) =>{
        const req = await fetch(`${API}/api/page/category`, {
            method: 'GET',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':` Bearer ${token}`
                },            
        });
        const json = await req.json();
        return json;
    },

    getCategoryId: async (id,token) =>{
        const req = await fetch(`${API}/api/page/category/${id}`, {
            method: 'GET',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':` Bearer ${token}`
                },            
        });
        const json = await req.json();
        return json;
    },

     UpdateAnnouncement: async (id, title, descrition, company_id, media) => {
        const req = await fetch(`${API}/api/page/announcement/${company_id}`, {
            method: 'PUT',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }, 
                body:JSON.stringify({title, descrition, company_id, media})
        });
        const json = await req.json();
        return json;
    },

    getAnnouncements: async () => {
        const req = await fetch(`${API}/api/page/announcement`, {
            method: 'GET',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',  
                },         
        });
        const json = await req.json();
        return json;
    },

    getAnnouncement: async (search) => {
        const req = await fetch(`${API}/api/page/announcement/${search}`, {
            method: 'GET',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',  
                },         
        })
        const json = await req.json();
        return json;
    },

    createAnnouncement: async (title, descrition, company_id) => {
        const req = await fetch(`${API}/api/page/announcement`, {
            method: 'POST',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',  
                },  
                body:JSON.stringify({title, descrition, company_id})       
        })
        const json = await req.json();
        return json;
    },

    getUploadAnnouncements: async (announcement_id, token) => {
        const req = await fetch(`${API}/api/page/upload/announcement/${announcement_id}`, {
            method: 'GET',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json', 
                    'Authorization':` Bearer ${token}` 
                },         
        });
        const json = await req.json();
        return json;
    },

    UploadAnnouncements: async (photo, announcement_id, token) => {
        const image = new FormData();
        image.append('announcement_id', announcement_id);
        image.append('image', {
          uri: photo,
          name: 'image.jpg',
          filename: 'image/jpg',
          type: 'image/jpg'
        });
        const res = await axios.post(`${API}/api/page/upload/announcement`, image, {
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':` Bearer ${token}`
             }
        });
        return res;
    },

    getFavorite: async (id, token) => {
        const req = await fetch(`${API}/api/page/favorite/${id}`, {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':` Bearer ${token}`
            }    
        });
        const json = await req.json();
        return json; 
    },

    deleteFavorite: async (id, token) => {
        const req = await fetch(`${API}/api/page/favorite/${id}`, {
            method: 'DELETE',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':` Bearer ${token}`
            },
             
        });
        const json = await req.json();
        return json;   
    },

    CreateFavorite: async (title, category, image, user_id, descrition, company_id, token) => {
        const req = await fetch(`${API}/api/page/favorite`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':` Bearer ${token}`
            },
            body:JSON.stringify({title, category, image, user_id, descrition, company_id})
        });
        const json = await req.json();
        return json;   
    },

    createGallery: async (imgOne, imgTwo, imgThree, imgFour, company_id, token) =>{
        const images = new FormData();
        if(imgOne){
            images.append('imgOne', {
                uri: imgOne,
                name: 'image.jpg',
                filename: 'image/jpg',
                type: 'image/jpg'
               });
        }
       
        if( imgTwo){
            images.append('imgTwo', {
                uri: imgTwo,
                name: 'image.jpg',
                filename: 'image/jpg',
                type: 'image/jpg'
               });
         }
          if(imgThree){
            images.append('imgThree', {
                uri: imgThree,
                name: 'image.jpg',
                filename: 'image/jpg',
                type: 'image/jpg'
               });
          }
            
          if(imgFour){ 
           images.append('imgFour', {
            uri: imgFour,
            name: 'image.jpg',
            filename: 'image/jpg',
            type: 'image/jpg'
           });
          }
    
    
           images.append('company_id', company_id);
           const req = await axios.post(`${API}/api/page/gallery`, images, {
           headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':` Bearer ${token}`
           }
         });
 
      return req;
    }, 

    getGallery: async (company_id) =>{
        const req = await fetch(`${API}/api/page/gallery/${company_id}`,{
            method: 'GET',
            headers:{
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
          });
          const json = await req.json();
          return json; 
    },

    getGeolocalization: async (companie_id, token ) => {
        const req = await fetch(`${API}/api/page/geolocalization/${companie_id}`, {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                "Content-Type": "application/json",
                'Authorization':` Bearer ${token}`
            },
        });
        const json = await req.json();
        return json;
    },

    CreateGeolocalization: async ( latitude, longitude, companie_id, token ) => {
        const req = await fetch(`${API}/api/page/geolocalization`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                "Content-Type": "application/json",
                'Authorization':` Bearer ${token}`
            },
            body:JSON.stringify({latitude, longitude, companie_id})
        });
        const json = await req.json();
        return json;
    },   

    createSchedule: async (title, date, time, descrition, company_id, authClient_id, status, token) => {
         const req = await fetch(`${API}/api/page/schedule`, {
            method: 'POST',
            headers:{
                 Accept: 'application/json',
                 "Content-Type": "application/json",
                 'Authorization':` Bearer ${token}`
            },
            body:JSON.stringify({title, date, time, descrition, company_id, authClient_id, status})
         });
         const json = await req.json();
         return json;
    },

    getShedules: async(authClient_id, token)=>{
        const req = await fetch(`${API}/api/page/schedule/${authClient_id}`, {
            method: 'GET',
            headers:{
                 Accept: 'application/json',
                 "Content-Type": "application/json",
                 'Authorization':` Bearer ${token}`
            }
        });
        const json = await req.json();
        return json;
    },

    UpdateSchedule: async (title, date, time, descrition, id, company_id ,authClient_id, status, token) => {
       const req = await fetch(`${API}/api/page/schedule/${id}`, {
        method: 'PUT',
        headers:{
             Accept: 'application/json',
             "Content-Type": "application/json",
             'Authorization':` Bearer ${token}`
        },
        body:JSON.stringify({title, date, time, descrition, company_id, authClient_id, status})
     });
     const json = await req.json();
     return json;
   },

    deleteShedules: async(id, token)=>{
        const req = await fetch(`${API}/api/page/schedule/${id}`, {
            method: 'DELETE',
            headers:{
                 Accept: 'application/json',
                 "Content-Type": "application/json",
                 'Authorization':` Bearer ${token}`
            }
        });
        const json = await req.json();
        return json;
    },

    getCep: async (cep) => {
        const req = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        const json = await req.json();
        return json;
    },
    
    createAddressClient: async (cep, address, number, district, city, client_id, state, token) => {
        const req = await fetch(`${API}/api/page/addressclient`, {
            method: 'POST',
            headers:{
                 Accept: 'application/json',
                 "Content-Type": "application/json",
                 'Authorization':` Bearer ${token}`
            },
            body:JSON.stringify({cep, address, number, district, city, client_id, state})
        });
        const json = await req.json();
        return json;
    },

    UpdateAddressClient: async (cep, address, number, district, city, client_id, state, token) => {
        const req = await fetch(`${API}/api/page/addressclient/${client_id}`, {
            method: 'PUT',
            headers:{
                 Accept: 'application/json',
                 "Content-Type": "application/json",
                 'Authorization':` Bearer ${token}`
            },
            body:JSON.stringify({cep, address, number, district, city, client_id, state})
        });
        const json = await req.json();
        return json;
    },

    getAddressClient: async (client_id, token) => {
        const req = await fetch(`${API}/api/page/addressclient/${client_id}`, {
            method: 'GET',
            headers:{
                 Accept: 'application/json',
                 "Content-Type": "application/json",
                 'Authorization':` Bearer ${token}`
            },
        });
        const json = await req.json();
        return json;
    },


    createAddressCompany: async (cep, address, number, district, city, company_id, state, token) =>{
        const req = await fetch(`${API}/api/page/addresscompany`, {
            method: 'POST',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':` Bearer ${token}`
                },
                body:JSON.stringify({cep, address, number, district, city, company_id, state})
            });
            const json = await req.json();
            return json;
    },

    updateAddressCompany: async (cep, address, number, district, city, company_id, state, token) =>{
        const req = await fetch(`${API}/api/page/addresscompany/${company_id}`, {
            method: 'PUT',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':` Bearer ${token}`
                },
                body:JSON.stringify({cep, address, number, district, city, state})
            });
            const json = await req.json();
            return json;
    },

    getAddressCompany: async ( company_id, token) =>{
        const req = await fetch(`${API}/api/page/addresscompany/${company_id}`, {
            method: 'GET',
            headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':` Bearer ${token}`
                }
            });
            const json = await req.json();
            return json;
    },



    getLike: async (announcement_id, token) => {
        const req = await fetch(`${API}/api/page/like/${announcement_id}`, {
            method: 'GET',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               'Authorization':` Bearer ${token}`
            },
        });
        const json = await req.json();
        return json;
   },

   createLike: async (like, deslike, announcement_id, token) => {
      const req = await fetch(`${API}/api/page/like`, {
        method: 'POST',
        headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization':` Bearer ${token}`
        },
        body:JSON.stringify({like, deslike, announcement_id})
     });
     const json = await req.json();
     return json;
   },

    UpdateLike: async ( like, deslike, announcement_id, token) => {
         const req = await fetch(`${API}/api/page/like/${announcement_id}` , {
             method: 'PUT',
             headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':` Bearer ${token}`
             },
             body:JSON.stringify({like, deslike})
         });
         const json = await req.json();
         return json;
    }, 
    
    getNotification: async (company_id, token) => {
      const req = await fetch(`${API}/api/page/notification/${company_id}`, {
        method: 'GET',
        headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
           'Authorization':` Bearer ${token}`
        },

      });
      const json = await req.json();
      return json;
    },
    createNotification: async (photo, descrition, date, time, auth_id, visualized, company_id, token) => {
        const req = await fetch(`${API}/api/page/notification`, {
          method: 'POST',
          headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
             'Authorization':` Bearer ${token}`
          },
          body:JSON.stringify({photo, descrition, date, time, auth_id, visualized, company_id})
        });
        const json = await req.json();
        return json;
      }, 
      updatNotification: async (company_id, visualized, token)  => {
         const req = await fetch(`${API}/api/page/notification/${company_id}`, {
             method:'PUT',
             headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':` Bearer ${token}`
             },
             body:JSON.stringify({visualized})
         });
         const json = await req.json();
         return json;
      },
       deleteNotification: async (id, token) =>{
        const req = await fetch(`${API}/api/page/notification/${id}`, {
            method:'DELETE',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               'Authorization':` Bearer ${token}`
            },
        });
        const json = await req.json();
        return json;
       },

       getView: async (announcement_id) =>{
        const req = await fetch(`${API}/api/page/view/${announcement_id}`, {
          method: 'GET',
          headers: {
             Accept: 'application/json',
               'Content-Type': 'application/json',
          }
        }); 
        const json = await req.json();
        return json;
      },

       createView: async (num, announcement_id) =>{
        const req = await fetch(`${API}/api/page/view`, {
          method: 'POST',
          headers: {
             Accept: 'application/json',
               'Content-Type': 'application/json',
          },
          body:JSON.stringify({num, announcement_id})
        }); 
        const json = await req.json();
        return json;
      },
      
      updateView: async (num, announcement_id) => {
        const req = await fetch(`${API}/api/page/view/${announcement_id}`, {
            method: 'PUT',
            headers: {
               Accept: 'application/json',
                 'Content-Type': 'application/json',
            },
            body:JSON.stringify({num})
          }); 
          const json = await req.json();
          return json;
      },

};


export {API};

