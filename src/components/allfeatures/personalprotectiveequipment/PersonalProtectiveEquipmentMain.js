// // Main.js
// import React, { useState, useEffect } from 'react';
// import { Container, Alert, ProgressBar } from 'react-bootstrap';
// import { RotatingLines } from 'react-loader-spinner'
// import PersonalProtectiveEquipmentThemeContext from './PersonalProtectiveEquipmentThemeContext';
// import PersonalProtectiveEquipmentTransitionAlert from './PersonalProtectiveEquipmentTransitionAlert';
// import PersonalProtectiveEquipmentVideoPlayer from './PersonalProtectiveEquipmentVideoPlayer';

// function PersonalProtectiveEquipmentMain() {

//     //const imagePath="C:\\Users\\464-3997\\AppData\\Local\\Temp\\tmph5kw9m6j.jpg";
//     const [stream, setStream] = useState(null);

//     const [data, setData] = useState(null);
//     //Set Loader
//     const [loading, setLoading] = useState(false);

//     const [videoFile, setVideoFile] = useState(null);
//     const [annotatedFrames, setAnnotatedFrames] = useState([]);
//     const [progress, setProgress] = useState(0);

//     const [hintMessage, setHintMsg] = useState('');
//     const [file, setFile] = useState('');

//     //Validation message
//     const [successAlert, setShowAlert] = useState(false);
//     const [errormsg, setErrormsg] = useState(false);

//     const [lblName, SetLableName] = useState('');
//     // const[progress, setProgress]=useState({started: false, pc: 0});
//     const [messageError, setMessageError] = useState('');



//     const isValidFileUploaded = (file) => {
//         const validExtensions = ['png', 'jpeg', 'jpg']
//         const fileExtension = file.type.split('/')[1]
//         return validExtensions.includes(fileExtension)
//     }

//     const isValidFileUVideo = (file) => {
//         const validExtensions = ['mp4', 'avi', 'mov', 'mkv', 'mpeg4'];
//         const fileExtension = file.type.split('/')[1].toLowerCase();
//         return validExtensions.includes(fileExtension);
//     }


//     const handleUpload = async (event) => {
//         event.preventDefault();

//         const fileInput = event.target.querySelector('input[type="file"]');
//         //const file = fileInput.files[0];
//         //const lblName = 'Image'; // Assuming lblName is defined elsewhere
//         const maxSizeInBytes = 200 * 1024 * 1024;

//         // Reset error messages
//         //errorMsgAlert(false);

//         // Check if no file is selected
//         if (!file) {
//             errorMsgAlert(true);
//             setMessageError('No file selected');
//             return;
//         }

//         // Check file size
//         if (file.size > maxSizeInBytes) {
//             errorMsgAlert(true);
//             setMessageError('File Size exceeds the limit of 200 MB');
//             //console.log("File Size exceeds the limit of 200 MB");
//             return;
//         }

//         //Validate file type for 'Image' label
//         if (lblName === "Image") {
//             if (!isValidFileUploaded(file)) {
//                 errorMsgAlert(true);
//                 setMessageError('Please select a proper file format');
//                 //fileInput.value = ''; // Clear file input
//                 return;
//             }
//         }
//         else if (lblName === "Video") {

//             // if (!isValidFileUVideo(file)) {
//             //   errorMsgAlert(true);
//             //   setMessageError('Please select a proper file format');
//             //   //fileInput.value = ''; // Clear file input
//             //   return;
//             // }
//         }

//         // Proceed with uploading
//         setLoading(true);

//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('formattype', lblName);

//         try {
//             const response = await fetch('https://ychatgpt-apis.azurewebsites.net/ppe_detection/ppe-det', {
//                 method: 'POST',
//                 body: formData,
//                 onUploadProgress: (progressEvent) => {
//                     const { loaded, total } = progressEvent;
//                     const progressPercent = Math.round((loaded / total) * 100);
//                     setProgress(progressPercent);
//                 }
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to upload file');
//             }

//             const data = await response.json();
//             console.log(data);
//             if (lblName === "Video") {

//                 setData(data);
//                 console.table(typeof (data.detections))
//                 if (typeof data.detections === 'string') {
//                     const jsonObject = JSON.parse(data.detections);
//                     setDetectionData(jsonObject);
//                     console.log(jsonObject);
//                 } else {
//                     setDetectionData(data.detections); // If it's already an object, set directly
//                 }

//             }
//             else {


//                 setData(data);
//                 // Assuming 'detections' is part of the response data
//                 if (typeof data.detections === 'string') {
//                     const jsonObject = JSON.parse(data.detections);
//                     setDetectionData(jsonObject);
//                     console.log(jsonObject);
//                 } else {
//                     setDetectionData(data.detections); // If it's already an object, set directly
//                 }
//             }

//         } catch (error) {
//             console.error('An error occurred while uploading:', error.message);
//             errorMsgAlert(true);
//             setMessageError(error.message);
//             //setErrormsg(true);
//         } finally {
//             setLoading(false);
//         }
//     };



//     const handleShowAlert = () => {
//         setShowAlert(true);
//         // You can set a timeout to hide the alert after a certain time
//         setTimeout(() => {
//             setShowAlert(false);
//         }, 6000); // Hide after 3 seconds
//     };

//     const errorMsgAlert = () => {
//         setErrormsg(true);
//         // You can set a timeout to hide the alert after a certain time
//         setTimeout(() => {
//             setErrormsg(false);
//         }, 6000); // Hide after 3 seconds
//     };

//     const handleChange = e => {
//         const { name, value } = e.target;


//         //console.log(e.target.value);

//         SetLableName(e.target.value);
//         if (e.target.value == "Image") {
//             setHintMsg('Limit 200MB per file • JPG, JPEG, PNG');

//         }
//         else {
//             setHintMsg('Limit 200MB per file • MP4, AVI, MOV, MKV, MPEG4');
//         }

//     };
//     const [detectionData, setDetectionData] = useState(null);
//     const [VdetectionData, setVDetectionData] = useState(null);
//     return (
// <>
        
//             <form class="px-4 py-3">
//                 {/* <h3>PPE Object Detection</h3> */}

//                 <div class="row">
//                     <div class="col-4">

//                         <div class="h5 pb-2 mb-4 text-primary border-bottom border-primary">
//                             Choose detection type
//                         </div>
//                         <div class="input-group mb-3" >
//                             <div class="form-check">
//                                 <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Image" onChange={handleChange} />
//                                 <label class="form-check-label" for="exampleRadios1">
//                                     Image
//                                 </label>
//                             </div>
//                         </div>
//                         <div class="input-group mb-3">
//                             <div class="form-check">
//                                 <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Video" onChange={handleChange} />
//                                 <label class="form-check-label" for="exampleRadios2">
//                                     Video
//                                 </label>
//                             </div>
//                         </div>


//                         <div class="h4 pb-2 mb-4 text-primary border-bottom border-primary">
//                             Upload {lblName}
//                         </div>

//                         <div class="input-group mb-3">

//                             <div class="p-3 bg-light-subtle bg-opacity-10 border border-primary rounded-4" >

//                                 <input class="form-control" type="file" id="formFile" onChange={(e) => { setFile(e.target.files[0]) }} />


//                                 <span id="passwordHelpInline" class="input-group mb-3">
//                                     {hintMessage}
//                                 </span></div>
//                         </div>
//                         <div class="input-group mb-3">
//                             <div class="d-grid gap-2 d-md-flex justify-content-md-end">

//                                 <button type="submit" class="btn btn-primary" onClick={handleUpload}>Upload {lblName}</button>
//                             </div>
//                         </div>



//                         <div>




//                             {detectionData && detectionData.message && detectionData.message !== "" ? (
//                                 <div>
//                                     <h5 style={{ textAlign: 'left' }}>{detectionData.message}</h5>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     {data && data.detections && (
//                                         <h5 style={{ textAlign: 'left' }}>Detected Objects at {detectionData.timestamp}</h5>
//                                     )}
//                                 </div>
//                             )}






//                             <div>
//                                 {data && data.detections && (

//                                     <div style={{ backgroundColor: 'blue', padding: '10px', borderRadius: '5px' }}>

//                                         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                                             <thead>
//                                                 <tr>

//                                                     <th style={{ textAlign: 'left', padding: '8px' }}>Detection Defects</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 <tr>
//                                                     {/* <td style={{ textAlign: 'left', padding: '8px' }}>{detectionData.timestamp}</td> */}
//                                                     <td style={{ textAlign: 'left', padding: '8px' }}>
//                                                         {Array.isArray(detectionData.detected_objects) ? (
//                                                             <ul style={{ margin: 0, paddingLeft: '20px' }}>
//                                                                 {detectionData.detected_objects.map((defect, index) => (
//                                                                     <li key={index}>{defect}</li>
//                                                                 ))}
//                                                             </ul>
//                                                         ) : (
//                                                             detectionData.detected_objects
//                                                         )}
//                                                     </td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 )}
//                             </div>

//                         </div>

//                     </div>

//                     <div class="col-8">
//                         <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" class="scrollspy-example-2" tabindex="0">

//                             <div class="p-3 bg-primary-subtle bg-opacity-10 border border-primary border-start-0 rounded-pill">
//                                 <h5> {lblName} Detection </h5>
//                             </div>
//                             {/* {progress > 0 && <ProgressBar now={progress} label={`${progress}%`} className="mt-2" animated />} */}
//                             {/* {stream && <video id="videoStream" src={stream} autoPlay controls />} */}
//                             {data && data.video_path && (
//                                 <video
//                                     controls
//                                     style={{ maxWidth: '100%' }}
//                                 >
//                                     <source
//                                         src={`data:video/mp4;base64,${data.video_path}`}
//                                         type="video/mp4"
//                                     />

//                                 </video>
//                             )}

//                         </div>

//                         <div>





//                             <div>

//                                 {data && data.uploaded_image_path && (
//                                     <div>
//                                         <h5>Uploaded Image</h5>
//                                         <img
//                                             src={`data:image/png;base64,${data.uploaded_image_path}`}
//                                             //`data:image/png;base64,${data.image}`;
//                                             alt="Uploaded Image"
//                                             style={{ maxWidth: '100%' }}
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                             <div>

//                                 {data && data.other_class_annotated_image && (
//                                     <div>
//                                         <h5>Image with normal classes:</h5>
//                                         <img
//                                             src={`data:image/png;base64,${data.other_class_annotated_image}`}
//                                             //`data:image/png;base64,${data.image}`;
//                                             alt="Image with normal classes"
//                                             style={{ maxWidth: '100%' }}
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                             <div>
                               
//                                 {data && data.no_class_annotated_image && (
//                                     <div>
//                                         <h5>Image with anomaly classes:</h5>
//                                         <img
//                                             src={`data:image/png;base64,${data.no_class_annotated_image}`}
//                                             //`data:image/png;base64,${data.image}`;
//                                             alt="Image with anomaly classes:"
//                                             style={{ maxWidth: '100%' }}
//                                         />
//                                     </div>
//                                 )}
//                             </div>


//                         </div>
//                     </div>
//                 </div>
//             </form>


//             <div>
//                 {successAlert && (
//                     <PersonalProtectiveEquipmentTransitionAlert
//                         type={"success"}
//                         isAlert={false}
//                         message={"Email generated successfully!"}
//                     />
//                 )}
//             </div>
//             <div>
//                 {errormsg && (
//                     <PersonalProtectiveEquipmentTransitionAlert
//                         type={"danger"}
//                         isAlert={false}
//                         message={messageError}
//                     />
//                 )}
//             </div>

//             <div className='pt-8' align="center">
//                 {loading ? (
//                     <RotatingLines
//                         visible={true}
//                         height="96"
//                         width="96"
//                         color="grey"
//                         strokeWidth="5"
//                         animationDuration="0.75"
//                         ariaLabel="rotating-lines-loading"
//                         wrapperStyle={{}}
//                         wrapperClass=""
//                     />
//                 ) : null}
//             </div>

            

//             </>

        


//     );
// }

// export default PersonalProtectiveEquipmentMain;


import React, { useState,useEffect } from 'react';
import { Container,Alert,ProgressBar } from 'react-bootstrap';
import { RotatingLines } from 'react-loader-spinner'
//import ThemeContext from '.ThemeContext';
import PersonalProtectiveEquipmentThemeContext from './PersonalProtectiveEquipmentThemeContext';
import PersonalProtectiveEquipmentTransitionAlert from './PersonalProtectiveEquipmentTransitionAlert';
import PersonalProtectiveEquipmentVideoPlayer from './PersonalProtectiveEquipmentVideoPlayer';

function PersonalProtectiveEquipmentMain() {  
  //const imagePath="C:\\Users\\464-3997\\AppData\\Local\\Temp\\tmph5kw9m6j.jpg";
  const [stream, setStream] = useState(null);
  const [data, setData] = useState(null);
  //Set Loader
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [annotatedFrames, setAnnotatedFrames] = useState([]);
  const [progress, setProgress] = useState(0);
  const [hintMessage, setHintMsg] = useState('');
  const[file, setFile]=useState('');
  //Validation message
  const [successAlert, setShowAlert] = useState(false);
  const[errormsg, setErrormsg]=useState(false);
  const[lblName, SetLableName]=useState('');
  // const[progress, setProgress]=useState({started: false, pc: 0});
  const[messageError, setMessageError]=useState('');
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  useEffect(() => {
    if (annotatedFrames.length > 0) {
      const frameInterval = setInterval(() => {
        setCurrentFrameIndex((prevIndex) => (prevIndex + 1) % annotatedFrames.length);
      }, 100); 

      return () => clearInterval(frameInterval);
    }
  }, [annotatedFrames]);

  const isValidFileUploaded=(file)=>{
    const validExtensions = ['png','jpeg','jpg']
    const fileExtension = file.type.split('/')[1]
    return validExtensions.includes(fileExtension)
  }

  const isValidFileUVideo = (file) => {
    const validExtensions = ['mp4', 'avi', 'mov', 'mkv', 'mpeg4'];
    const fileExtension = file.type.split('/')[1].toLowerCase();
    return validExtensions.includes(fileExtension);
}

  const handleUpload = async (event) => {
    event.preventDefault();
  
    const fileInput = event.target.querySelector('input[type="file"]');
    //const file = fileInput.files[0];
    //const lblName = 'Image'; // Assuming lblName is defined elsewhere
    const maxSizeInBytes = 200 * 1024 * 1024;
  
    // Reset error messages
    //errorMsgAlert(false);
  
    // Check if no file is selected
    if (lblName == "") {      
      errorMsgAlert(true);
      setMessageError('Please select a proper file format');
      //fileInput.value = ''; // Clear file input
      return;      
  }
    if (!file) {
      errorMsgAlert(true);
      setMessageError('No file selected');
      return;
    }
   
  
    // Check file size
    if (file.size > maxSizeInBytes) {
      errorMsgAlert(true);
      setMessageError('File Size exceeds the limit of 200 MB');
      //console.log("File Size exceeds the limit of 200 MB");
      return;
    }
  
    //Validate file type for 'Image' label
    if (lblName === "Image") {
      if (!isValidFileUploaded(file)) {
        errorMsgAlert(true);
        setMessageError('Please select a proper file format');
        //fileInput.value = ''; // Clear file input
        return;
      }
    }
    else if(lblName==="Video")
      {
        
        // if (!isValidFileUVideo(file)) {
        //   errorMsgAlert(true);
        //   setMessageError('Please select a proper file format');
        //   //fileInput.value = ''; // Clear file input
        //   return;
        // }
      }
  
    // Proceed with uploading
    setLoading(true);

    const username = 'ychatgpt';
    const password = 'dfnefiwnfwfniwfndscscnxzcx3243cxx';
    const credentials = btoa(`${username}:${password}`);
  
    const formData = new FormData();
    formData.append('file', file);
    console.log('file', file)
    formData.append('formattype', lblName);
    console.log('formattype', lblName)
  
    try {
        const response = await fetch('https://ychatgpt-apis.azurewebsites.net/ppe_detection/ppe-det', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Basic ${credentials}`
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const progressPercent = Math.round((loaded / total) * 100);
          setProgress(progressPercent);
        }
      });
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
  
      const data = await response.json();
      console.log(data);
      if(lblName==="Video")
        {
          if (Array.isArray(data.frames)) {
            setAnnotatedFrames(data.frames);
          }
          if (data.detections) {
            // Handle video detections if they are included
            console.log("response",data)
            const parsedDetections = data.detections.map(item => {
                try {
                    return JSON.parse(item);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    return null; // Handle invalid JSON gracefully
                }
            }).filter(item => item !== null);
            // console.log("parsedDetections",parsedDetections)

            setVDetectionData(parsedDetections);
        }
        }
      else{
      setData(data);
      console.log('response',data)
      // Assuming 'detections' is part of the response data
      if (typeof data.detections === 'string') {
        const jsonObject = JSON.parse(data.detections);
        setDetectionData(jsonObject);
        console.log(jsonObject);
      } else {
        setDetectionData(data.detections); // If it's already an object, set directly
      }
    }
  
    } catch (error) {
      console.error('An error occurred while uploading:', error.message);
      errorMsgAlert(true);
      setMessageError(error.message);
      //setErrormsg(true);
    } finally {
      setLoading(false);
    }
  };
  
  const handleShowAlert = () => {
    setShowAlert(true);
    // You can set a timeout to hide the alert after a certain time
    setTimeout(() => {
      setShowAlert(false);
    }, 6000); // Hide after 3 seconds
  };

  const errorMsgAlert = () => {
    setErrormsg(true);
    // You can set a timeout to hide the alert after a certain time
    setTimeout(() => {
      setErrormsg(false);
    }, 6000); // Hide after 3 seconds
  };  
  
  const handleChange = e => {
    const { value } = e.target;
    SetLableName(value);
    
    // Update the hint message based on the selected detection type
    if (value === "Image") {
      setHintMsg('Limit 200MB per file • JPG, JPEG, PNG');
    } else {
      setHintMsg('Limit 200MB per file • MP4, AVI, MOV, MKV, MPEG4');
    }
    
    // Clear or hide previously displayed responses
    
    setData(null); // Clear image data
    setVDetectionData(null); // Clear video detection data
    setAnnotatedFrames([]); // Clear annotated frames
    setCurrentFrameIndex(0); // Reset current frame index for video
    setMessageError(''); // Clear any existing error messages
    setErrormsg(false); // Hide any existing error alerts
    setFile(null)
  };
  const [detectionData, setDetectionData] = useState(null); 
  const [VdetectionData, setVDetectionData] = useState(null); 
  const hasValidData = Array.isArray(VdetectionData) && VdetectionData.length > 0;
  
  return (

  <Container>
<form class="px-4 py-3">
    {/* <h3>PPE Object Detection</h3> */}
    
    <div style={{display:'flex'}}>
  <div style={{width: '75%'}}>

  <div class="h5 pb-2 mb-4 text-primary border-bottom border-primary">
  Choose detection type
</div>
<div class="input-group mb-3" >
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Image" onChange={handleChange}/>
  <label class="form-check-label" for="exampleRadios1">
   Image
  </label>
</div>
</div>
<div class="input-group mb-3">
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Video" onChange={handleChange}/>
  <label class="form-check-label" for="exampleRadios2">
    Video
  </label>
</div>
</div>


<div class="h4 pb-2 mb-4 text-primary border-bottom border-primary">
  Upload {lblName}
</div>

<div class="input-group mb-3"> 

  <div class="p-3 bg-light-subtle bg-opacity-10 border border-primary rounded-4" >
    
  <input class="form-control" type="file" id="formFile" onChange={(e)=>{setFile(e.target.files[0])}}/>
 

<span id="passwordHelpInline" class="input-group mb-3">
{hintMessage}
</span></div>
</div>
<div class="input-group mb-3">
<div class="d-grid gap-2 d-md-flex justify-content-md-end">

<button type="submit" class="btn btn-primary" onClick={handleUpload}>Upload {lblName}</button>
</div>
</div>
<div>

{detectionData && detectionData.message && detectionData.message !== "" ? (
  <div>
     <h5 style={{ textAlign: 'left' }}>{detectionData.message}</h5>
  </div>
) : (
  <div>
    {data && data.detections && (
      <h5 style={{ textAlign: 'left' }}>Detected Objects at {detectionData.timestamp}</h5>
    )}
  </div>
)}

<div>
      {hasValidData ? (
        <div style={{ backgroundColor: 'rgb(224 231 255)', padding: '10px', borderRadius: '5px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px' }}>Frame Timestamp</th>
                <th style={{ textAlign: 'left', padding: '8px' }}>Detected Objects</th>
              </tr>
            </thead>
            <tbody>
              {VdetectionData.map((frameData, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'left', padding: '8px' }}>{frameData.timestamp}</td>
                  <td style={{ textAlign: 'left', padding: '8px' }}>
                    {Array.isArray(frameData.detected_objects) ? (
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {frameData.detected_objects.map((object, i) => (
                          <li key={i}>
                            {object[0]} (Count: {object[1]})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>{frameData.detected_objects}</span> // Adjust based on your data format
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p></p>
      )}
    </div>

<div>
 {data && data.detections && (
  
   <div style={{ backgroundColor: 'rgb(224 231 255)', padding: '10px', borderRadius: '5px' }}>
     
     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
       <thead>
         <tr>
           <th style={{ textAlign: 'left', padding: '8px' }}>Detection Defects</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           {/* <td style={{ textAlign: 'left', padding: '8px' }}>{detectionData.timestamp}</td> */}
           <td style={{ textAlign: 'left', padding: '8px' }}>
             {Array.isArray(detectionData.detected_objects) ? (
               <ul style={{ margin: 0, paddingLeft: '20px' }}>
                 {/* {detectionData.detected_objects.map((defect, index) => (
                   <li key={index}>{defect}</li>
                 ))} */}
                 {detectionData.detected_objects.map((object, i) => (
                          <li key={i}>
                            {object[0]} (Count: {object[1]})
                          </li>
                        ))}
               </ul>
             ) : (
               detectionData.detected_objects
             )}
           </td>
         </tr>
       </tbody>
     </table>
   </div>
 )}
</div>

</div>
  </div>
  <div style={{width: '75%', marginLeft:'320px'}}>
    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" class="scrollspy-example-2" tabindex="0">
      
      <div class="p-3 bg-primary-subtle bg-opacity-10 border border-primary border-start-0 rounded-pill ms-auto me-6"  style={{marginRight:"-25px"}}>
    <h5>{lblName} Detection</h5>
</div>
{/* {data && data.video_path && (
<video
  controls
  style={{ maxWidth: '100%' }}
>
  <source
    src={`data:video/mp4;base64,${data.video_path}`}
    type="video/mp4"
  />

</video>
)} */}
<div style={{position: "absolute", top:"175px"}}>
    {annotatedFrames.length > 0 && (
      <img src={`data:image/png;base64,${annotatedFrames[currentFrameIndex]}`} alt="Annotated Frame" style={{ maxWidth: '90%', position:"relative", right:"40px" }} />
    )}
  </div>

  </div>

  <div>
<div>
  {data && data.uploaded_image_path && (
    <div>
      <h5>Uploaded Image</h5>
      <img
        src={`data:image/png;base64,${data.uploaded_image_path}`}
      //`data:image/png;base64,${data.image}`;
        alt="Uploaded Image"
        style={{ maxWidth: '100%' }}
      />
    </div>
  )}
</div>
<div>
  {data && data.other_class_annotated_image && (
    <div>
       <h5>Image with normal classes:</h5>
      <img
        src={`data:image/png;base64,${data.other_class_annotated_image}`}
      //`data:image/png;base64,${data.image}`;
        alt="Image with normal classes"
        style={{ maxWidth: '100%' }}
      />
    </div>
  )}
</div>
<div>
  {/* <h5>Image with anomaly classes:</h5> */}
  {data && data.no_class_annotated_image && (
    <div>
      <h5>Image with anomaly classes:</h5>
      <img
        src={`data:image/png;base64,${data.no_class_annotated_image}`}
      //`data:image/png;base64,${data.image}`;
        alt="Image with anomaly classes:"
        style={{ maxWidth: '100%' }}
      />
    </div>
  )}
</div>
</div>
  </div>
  </div>
  </form>
<div>
 {successAlert && (
  
       <PersonalProtectiveEquipmentTransitionAlert
        type={"success"}
        isAlert={false}
        message={"Email generated successfully!"}
      />
    )}
</div>
<div>
  {errormsg && (
     <div className='bg-red-200 h-20 rounded-full text-black p-4 mb-4 w-700'>
     {/* toast.error('Please enter text to translate.'); */}
     <p className='text-center'>{messageError}</p>
 </div>
    //    <PersonalProtectiveEquipmentTransitionAlert
    //    type={"danger"}
    //    isAlert={false}
    //    message={messageError}
    //  />
  )}
</div>

<div className='pt-8' align="center">
  {loading ? (
    <RotatingLines
      visible={true}
      height="96"
      width="96"
      color="grey"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  ) : null}
</div> 
  </Container>  
  );
}

export default PersonalProtectiveEquipmentMain;

