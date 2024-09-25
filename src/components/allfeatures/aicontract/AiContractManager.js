import React, { useEffect,useContext,useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import AiContractThemeContext from './AiContractThemeContext';
import { events } from 'react-three-fiber';


const AiContractManager = () => {
    // const [projectName, setProjectName] = useState("");
    // const [showVersionFields, setShowVersionFields] = useState(false);
    // const [versionName, setVersionName] = useState("");
    // const [showFileUpload, setShowFileUpload] = useState(false);
    // const [action, setAction] = useState("create");
    // const [selectedProject, setSelectedProject] = useState("");
    // const [extraAction, setExtraAction] = useState("");
    // const [projects, setProjects] = useState([]);
    const { 
        projectName, setProjectName, showVersionFields, setShowVersionFields, 
        versionName, setVersionName, showFileUpload, setShowFileUpload, 
        action, setAction, selectedProject, setSelectedProject, 
        extraAction, setExtraAction,version, setVersion,file,setFile,projects, setProjects } = useContext(AiContractThemeContext);
    

    console.log('Projects:', projects); // Log projects to debug

    const handleKeyPressProject = (event) => {
        if (event.key === 'Enter' && projectName.trim() !== "") {
            setShowVersionFields(true);
            setShowFileUpload(false);
        }
    };

    const handleKeyPressVersion = (event) => {
        if (event.key === 'Enter' && versionName.trim() !== "") {
            setShowFileUpload(true);
        }
    };



    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
        setShowVersionFields(false);
        setShowFileUpload(false);
    };

    const handleVersionNameChange = (event) => {
        setVersionName(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Assuming single file selection
    };

    const handleActionChange = (event) => {
        const selectedAction = event.target.value;
        setAction(selectedAction);
        setShowVersionFields(false);
        setShowFileUpload(false);
        setProjectName("");
        setVersionName("");
    };

    // const handleProjectSelectChange = (event) => {
    //     setSelectedProject(event.target.value);
    //     setExtraAction("");
    // };

    const handleProjectSelectChange = (event) => {
        setSelectedProject(event.target.value);
        setExtraAction("");
    };

    const handleExtraActionChange = (event) => {
        setExtraAction(event.target.value);
    };

    const handleVersionChange = (event) => {
        setVersion(event.target.value);
    };

  
    


    return (
        <div className='w-full'>
            <div className='mb-4'>
                <label className='block text-xl text-black mb-0.5'>Choose an action:</label>
                <select
                    className='w-full border-slate-400 rounded-md text-black border-2 h-10 text-xl mt-1'
                    onChange={handleActionChange}
                    value={action}
                >
                    <option value="create">Create New Project</option>
                    <option value="select">Select Existing Project</option>
                    <option value="delete">Delete</option>
                </select>
            </div>

            {action === "create" && (
                <div className='mb-4'>
                    <label className='block text-xl text-black mb-0.5'>Enter new project name:</label>
                    <input 
                        type='text' 
                        className='w-full border-slate-400 rounded-md text-black border-2 h-10 text-xl mt-1'
                        onChange={handleProjectNameChange}
                        onKeyPress={handleKeyPressProject}
                    />
                </div>
            )}

            {/* {action === "select" && (
                <div className='mb-4'>
                    <label className='block text-xl text-black mb-0.5'>Select project:</label>
                    <select 
                        className='w-full border-slate-400 rounded-md text-black border-2 h-10 text-xl mt-1'
                        onChange={handleProjectSelectChange}
                        value={selectedProject}
                    >
                        <option value="">None</option>
                        <option value="project1">Project 1</option>
                        <option value="project2">Project 2</option>
                    </select>
                </div>
            )} */}
            {action === "select" && (
                <div className='mb-4'>
                    <label className='block text-xl text-black mb-0.5'>Select project:</label>
                    <select 
                        className='w-full border-slate-400 rounded-md text-black border-2 h-10 text-xl mt-1'
                        onChange={handleProjectSelectChange}
                        value={selectedProject}
                    >
                        <option value="none">None</option>
                        {/* {projects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                        ))} */}
                        {projects.map((project, index) => (
                            <option key={index} value={project}>{project}</option>
                        ))}
                    </select>
                </div>
            )}

            {selectedProject && (
                <>
                    <div className='mb-4'>
                        <label className='block text-xl text-black mb-0.5'>Choose an  action:</label>
                        <select 
                            className='w-full border-slate-400 rounded-md text-black border-2 h-10 text-xl mt-1'
                            onChange={handleExtraActionChange}
                            value={extraAction}
                        >
                            <option value="view1">Create New Version</option>
                            <option value="view">Select Existing Version</option>
                        </select>
                    </div>

                    {extraAction === "view1" && (
                        <div className='mb-4'>
                            <label className='block text-xl text-black mb-0.5'>Enter the New Version Name:</label>
                            <input 
                                type='text' 
                                className='w-full border-slate-400 rounded-md text-black border-2 h-10 text-xl mt-1'
                                value={versionName}
                                onChange={handleVersionNameChange}
                            />
                        </div>
                    )}

                    {extraAction === "view" && (
                        <div className='mb-4'>
                            <label className='block text-xl text-black mb-0.5'>Select Existing Version:</label>
                            <select 
                                className='w-full border-slate-400 rounded-md text-black border-2 h-10 text-xl mt-1'
                                onChange={handleVersionChange}
                                value={version}
                            >
                                <option value="version1">Version 1</option>
                                <option value="version2">Version 2</option>
                            </select>
                        </div>
                    )}

                    {/* <div className='mb-4'>
                        <label className='block text-xl text-black mb-0.5'>Enter the New Version Name:</label>
                        <input 
                            type='text' 
                            className='w-full border-slate-400 rounded-md text-black border-2 h-10 text-xl mt-1'
                            value={versionName}
                            onChange={handleVersionNameChange}
                        />
                    </div> */}
                </>
            )}

            {showVersionFields && (
                <>
                    <div className='mb-4'>
                        <label className='block text-xl text-black mb-0.5'>Version:</label>
                        <select className='w-full border-slate-400 rounded-md text-black border-2 h-10 text-xl mt-1'
                            onChange={handleVersionChange}
                            value={version}
                        >
                        <option value="create">Create New Version</option>
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-xl text-black mb-0.5'>Enter new Version name:</label>
                        <input
                            type='text'
                            className='w-full border-slate-400 rounded-md text-black border-2 h-10 text-xl mt-1'
                            onChange={handleVersionNameChange}
                            onKeyPress={handleKeyPressVersion}
                        />
                    </div>
                </>
            )}

            {showFileUpload && (
                <>
                    <h2 className='text-xl text-black mb-4'>Supported File Type: PDF</h2>
                    <div className="flex flex-col items-center mt-4 justify-center rounded border-black w-70 h-36 transition-transform hover:scale-110" style={{ padding: '20px', background: 'linear-gradient(#1f4e96,#fdf251)', marginBottom: '50px' }}>
                        <div>
                            <FaFileUpload color='#e7baff' size='3em' />
                            <p>&nbsp;&nbsp;&nbsp;File</p>
                        </div>
                        <div className=''>
                            <label className='pl-28' htmlFor='input-file'>
                                <input type='file' accept='application/pdf' 
                                    id='input-file' 
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    </div>
                </>
            )}

            
        </div>
    );
};

export default AiContractManager;
