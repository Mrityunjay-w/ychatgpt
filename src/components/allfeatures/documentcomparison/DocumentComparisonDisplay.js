import React, { useContext,useState, useEffect } from 'react';
import DocumentComparisonThemeContext from './DocumentComparisonThemeContext';
import { ClipLoader } from 'react-spinners';

const getclass1 = (currenttheme) => {
  return currenttheme === 'light' ? '' : 'bg-black text-white';
};

const DocumentComparisonDisplay = () => {
  const {downloadUrl,resetFileState,loadFalse,fileTrue,highlightedText1,setHighlightedText1,highlightedText2,setHighlightedText2,
         firstText,setFirstText,secondText,setSecondText,mergedText,setMergedText,submitted1, setSubmitted1 } = useContext(DocumentComparisonThemeContext);
  const { file1, file2 } = useContext(DocumentComparisonThemeContext);
  const {loading, setLoading,fileReady, theme } = useContext(DocumentComparisonThemeContext);
  const [leftInputValue, setLeftInputValue] = useState(0);
  const [rightInputValue, setRightInputValue] = useState(0);
  const [img1, setImg1] = useState('');
  const [img1Caption, setImg1Caption] = useState('');
  const [img2, setImg2] = useState('');
  const [img2Caption, setImg2Caption] = useState('');
  const [mergedPdf, setMergedPdf] = useState('');
  const [firstPdf,setFirstPdf] = useState('')
  const [secondPdf,setSecondPdf] = useState('')
  const [pageSelection, setPageSelection] = useState(0);
  const [img,setImg] = useState('')
  const [imgCaption,setImgCaption] = useState('')
  const [highlightedText,setHighlightedText] = useState('')
  const [highlighted_pdf, setHighlighted_pdf ] = useState('')
  const [highlighted_text1, setHighlighted_text1] = useState('')
  const [merged_text, setMerged_text] = useState('')
  const class1 = getclass1(theme);

  const handleDecrement = () => {
      setLeftInputValue((prev) => Math.max(0, prev - 1));
  };

  const handleIncrement = () => {
      setLeftInputValue((prev) => prev + 1);
  };

  const handleDecrement1 = () => {
      setRightInputValue((prev) => Math.max(0, prev - 1));
  };

  const handleIncrement1 = () => {
      setRightInputValue((prev) => prev + 1);
  };

  const handlePageDecrement = () => {
    setPageSelection((prev) => Math.max(0, prev - 1));
  };

  const handlePageIncrement = () => {
      setPageSelection((prev) => prev + 1);
  };

  const handleCompare = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('file1', file1);
    console.log('file1', file1);
    formData.append('file2', file2);
    console.log('file2', file2);
    formData.append('leftPage', leftInputValue);
    console.log('leftPage', leftInputValue);
    formData.append('rightPage', rightInputValue);
    console.log('rightPage', rightInputValue);

    try {
      console.log('Sending data to backend:');
      const response = await fetch('http://localhost:5000/api/route', {
          method: 'POST',
          body: formData
      });
  
      const data = await response.json();
      console.log('Response Data', data);

      setImg1(`data:image/png;base64,${data.img1}`);
      setImg1Caption(data.img1_caption);
      setImg2(`data:image/png;base64,${data.img2}`);
      setImg2Caption(data.img2_caption);
      setFirstPdf(`data:application/pdf;base64,${data.highlighted_pdf1}`)
      setSecondPdf(`data:application/pdf;base64,${data.highlighted_pdf2}`)
      setMergedPdf(`data:application/pdf;base64,${data.merged_pdf}`);
      
      fileTrue();  
  } catch (error) {
      console.error('Error in route:', error);
  } finally {
      
      setLoading(false);
  }
  };

  const handleCompare1 = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('file1', file1);
    console.log('file1', file1);
    formData.append('file2', file2);
    console.log('file2', file2);
    formData.append('pageSelection',pageSelection)
    console.log('pageSelection',pageSelection)

    try {
      console.log('Sending data to backend:');
      const response = await fetch('http://localhost:5000/api/route', {
          method: 'POST',
          body: formData
      });
  
      const data = await response.json();
      console.log('Response Data', data);

      setImg(`data:image/png;base64,${data.img}`);
      setImgCaption(data.img_caption);
      setHighlightedText(data.highlighted_text)
      setHighlighted_pdf(`data:application/pdf;base64,${data.highlighted_pdf_base64}`)
      setHighlighted_text1(`data:text/plain;base64,${data.highlighted_text_base64}`)
      setMerged_text(`data:text/plain;base64,${data.merged_text1_base64}`)
      
      fileTrue();  // Call function to handle file upload success
      } catch (error) {
          console.error('Error in route:', error);
      } finally {
          // Handle loading state
          setLoading(false);
      }
  };  

  const isPdfFile = (file) => file && file.type === 'application/pdf';
  const isTextFile = (file) => file && file.type === 'text/plain';

  return (
    <div style={{ padding: '20px' }}>
      
      <div >
          {/* <h1 className={`text-left text-3xl  font-bold mb-4 ${class1}`}>Document Comparison</h1> */}
          {/* <div className="border-b-2 border-red-300 mb-4"></div>  */}
          {isPdfFile(file1) && isPdfFile(file2) ? (
                    <div className="mt-3 flex space-x-4">
                        <div className="w-1/2">
                            <label
                                htmlFor="leftInput"
                                className={`block text-lg font-medium text-left mt-4 mb-2 w-72 ${class1}`}
                                style={{ minHeight: '3rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                            >
                                Select Page for <br /> {file1.name}
                            </label>
                            <form className="flex flex-col items-center border border-gray-700 rounded-md mb-4 relative w-72">
                                <div className="flex items-center w-full">
                                    <input
                                        id="leftInput"
                                        type="text"
                                        value={leftInputValue}
                                        onChange={(e) => setLeftInputValue(e.target.value)}
                                        className="text-white border-0 px-4 py-2 w-full"
                                        style={{ zIndex: 1,  backgroundColor : 'darkgray'}}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleDecrement}
                                        className=" text-white px-4 py-2 group-hover:bg-gray-700 hover:bg-gray-700"
                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0',backgroundColor : 'darkgray' }}
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleIncrement}
                                        className="bg-[#1a61a5] text-white px-4 py-2 rounded-r-md group-hover:bg-gray-700 hover:bg-gray-700"
                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0',backgroundColor : 'darkgray' }}
                                    >
                                        +
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="w-1/2">
                            <label
                                htmlFor="rightInput"
                                className={`block text-lg font-medium text-left mt-4 mb-2 w-72 ${class1}`}
                                style={{ minHeight: '3rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                            >
                                Select Page for <br /> {file2.name}
                            </label>
                            <form className="flex flex-col items-center border border-gray-700 rounded-md mb-4 relative w-72">
                                <div className="flex items-center w-full">
                                    <input
                                        id="rightInput"
                                        type="text"
                                        value={rightInputValue}
                                        onChange={(e) => setRightInputValue(e.target.value)}
                                        className="bg-[#1a61a5] text-white border-0 px-4 py-2 w-full"
                                        style={{ zIndex: 1 ,backgroundColor : 'darkgray'}}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleDecrement1}
                                        className="bg-[#1a61a5] text-white px-4 py-2 group-hover:bg-gray-700 hover:bg-gray-700"
                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' ,backgroundColor : 'darkgray'}}
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleIncrement1}
                                        className="bg-[#1a61a5] text-white px-4 py-2 rounded-r-md group-hover:bg-gray-700 hover:bg-gray-700"
                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' ,backgroundColor : 'darkgray'}}
                                    >
                                        +
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    (isPdfFile(file1) && isTextFile(file2)) || (isTextFile(file1) && isPdfFile(file2)) ? (
                        <div className="-mt-2 flex space-x-4">
                            <div className="w-1/2">
                                <label
                                    htmlFor="pageInput"
                                    className={`block text-lg font-medium text-left mt-4 mb-2 ${class1}`}
                                    style={{ minHeight: '3rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                >
                                    Select Page for PDF
                                </label>
                                <form className="flex flex-col items-center border border-gray-700 rounded-md mb-4 relative w-72 -mt-4">
                                    <div className="flex items-center w-full ">
                                        <input
                                            id="pageInput"
                                            type="text"
                                            value={pageSelection}
                                            onChange={(e) => setPageSelection(e.target.value)}
                                            className="text-white border-0 px-4 py-2 w-full"
                                            style={{ zIndex: 1,backgroundColor : 'darkgray' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={handlePageDecrement}
                                            className=" text-white px-4 py-2 group-hover:bg-gray-700 hover:bg-gray-700"
                                            style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0',backgroundColor : 'darkgray' }}
                                        >
                                            -
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handlePageIncrement}
                                            className=" text-white px-4 py-2 rounded-r-md group-hover:bg-gray-700 hover:bg-gray-700"
                                            style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0',backgroundColor : 'darkgray' }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : (
                     
                    
                    <div className={`mt-6 h-16 rounded-xl ${submitted1 ? 'hidden' : ''}`} >  
                        <p className="text-lg font-medium flex items-center lg:-mx-4 mb-4 p-4 rounded-lg bg-indigo-100 text-justify " style={{    marginTop: '50px'}}>
                          * The Documents Comparison Tool allows you to compare PDF or text files to identify differences. This tool highlights what has changed, been added, or remains unchanged between two versions of a document, and it supports page-wise comparison. <br /> 
                          * Steps to follow : <br />
                          Step 1 : Upload first file. <br />
                          Step 2 : Upload second file. <br />
                          Step 3 : After uploading, both files should be displayed with page-wise comparison. <br />
                          * After uploading both files, differences highlighted in yellow indicate changes, while text that does not match in both files is highlighted in red.
                        </p>
                      </div>
                    )
                    )}

          {isPdfFile(file1) && isPdfFile(file2)&& (
                  <div className="mt-4 flex justify-left ">
                    <button
                      onClick={handleCompare}
                      className={`px-6 py-2 bg-[#1f4e96] text-white text-base font-medium rounded-md ${class1}`}
                    >
                      Compare
                    </button>
                  </div>
                )}

          {((isPdfFile(file1) && isTextFile(file2)) || (isTextFile(file1) && isPdfFile(file2))) ? (
              <div className="mt-4 flex justify-left">
                <button
                  onClick={handleCompare1}
                  className={`px-6 py-2 bg-[#1f4e96] text-white text-base font-medium rounded-md ${class1}`}
                >
                  Compare
                </button>
              </div>
          ) : null}  

          {loading && (
               <div className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
               <ClipLoader size={50} color={"#1f4e96"} loading={loading} />
               <p className="mt-4 text-gray-600 text-lg">Loading file, please wait...</p>
             </div>
                      )} 
            

        { img1 && img2 && (
                  <div className="mt-7 mb-8">
                  <h2 className={`text-left mb-4 text-2xl font-bold ${class1}`}>Comparison of PDFs images with Highlighted Differences:</h2>
                  <div className="flex justify-end">
                    <div className="text-center -mr-0 -ml-3">
                      <img src={img1} alt="PDF 1" className="max-w-full h-auto" />
                      <p className={`font-medium `}>{img1Caption}</p>
                    </div>
                    <div className="border-l border-blue-800 border-2"></div>
                    <div className="text-center  -mr-20">
                      <img src={img2} alt="PDF 2" className="max-w-full h-auto" />
                      <p className={`font-medium `}>{img2Caption}</p>
                    </div>
                  </div>
                </div>
              )}

        {firstPdf && secondPdf && mergedPdf && (
                <div className='space-x-4' style={{display: 'flex',flexwrap: 'wrap',justifycontent: 'space-around'}}>
                   
                    <a href={firstPdf} download="highlighted_pdf1.pdf">
                        <button className={`mt-4 px-4 py-2 bg-sky-500 text-white rounded-md transition-colors duration-300 text-left block w-60 ${class1}`}>
                            Download Highlighted First PDF
                        </button>
                    </a>
                    <a href={secondPdf} download="highlighted_pdf2.pdf">
                        <button className= {`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md transition-colors duration-300 text-left block w-60  ${class1}`}>
                            Download Highlighted Second PDF
                        </button>
                    </a>
                    <a href={mergedPdf} download="merged.pdf">
                        <button className={`mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md transition-colors duration-300 text-left block w-60  ${class1}`}>
                            Download Merged PDF with Highlighted Differences
                        </button>
                    </a>
                </div>
            )}

            {highlightedText1 && highlightedText2 && (
                            <div>
                                <h3 className={`text-left mb-4 text-2xl font-bold ${class1}`}>Comparison of Texts with Highlighted Differences:</h3>
                                <div className="flex space-x-4">
                                    <div className="w-1/2 p-2 font-medium bg-gray-100 border border-gray-500 rounded-md text-left text-lg">
                                      <div dangerouslySetInnerHTML={{ __html: highlightedText1 }} />
                                    </div>
                                    <div className="w-1/2 p-2 font-medium bg-gray-100 border border-gray-500 rounded-md text-left text-lg">
                                      <div dangerouslySetInnerHTML={{ __html: highlightedText2 }} />
                                    </div>
                                </div>

                                <div  className='space-x-4' style={{display: 'flex',flexwrap: 'wrap',justifycontent: 'space-around'}}>
                                  <a href={mergedText} download="merged_text.txt">
                                      <button className={`mt-4 px-4 py-2 bg-sky-500 text-white rounded-md transition-colors duration-300 text-left block w-auto ${class1}`}>
                                         Download Merged Text
                                      </button>
                                  </a>
                                  <a href={firstText} download="highlighted_text1.txt">
                                      <button className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md transition-colors duration-300 text-left block w-auto ${class1}`}>
                                          Download Highlighted First Text
                                      </button>
                                  </a>
                                  <a href={secondText} download="highlighted_text2.txt">
                                      <button className={`mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md transition-colors duration-300 text-left block w-auto ${class1}`}>
                                         Download Highlighted Second Text
                                      </button>
                                  </a>
                                </div>
                            </div>
                        )}  

            {img && (
                  <div className="mt-5">
                    <h2 className={`text-left mb-4 text-2xl font-bold ${class1}`}>Comparison of PDF and Text with Highlighted Differences:</h2>
                    <div className="flex justify-between">
                      <div className="w-1/2">
                        <img src={img} alt="Highlighted PDF Page" className="max-w-full h-auto" />
                        <p className="font-medium">{imgCaption}</p>
                      </div>
                      <div className="w-1/2 p-2 font-medium bg-gray-100 border border-gray-500 rounded-md  -mr-5 text-left text-lg">
                        <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
                      </div>
                    </div>

                    <div className='space-x-4' style={{display: 'flex',flexwrap: 'wrap',justifycontent: 'space-around'}} >
                      <a href={merged_text} download="merged_text.txt">
                                        <button className={`mt-4 px-4 py-2 bg-sky-500 text-white rounded-md transition-colors duration-300 text-left block w-auto ${class1}`}>
                                          Download Merged Text
                                        </button>
                      </a>
                      <a href={highlighted_pdf} download="highlighted_pdf.pdf">
                                        <button className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md transition-colors duration-300 text-left block w-auto ${class1}`}>
                                          Download Highlighted PDF
                                        </button>
                      </a>
                      <a href={highlighted_text1} download="highlighted_text.txt">
                                        <button className={`mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md transition-colors duration-300 text-left block w-auto ${class1}`}>
                                          Download Highlighted Text file
                                        </button>
                      </a>
                    </div>
                  </div>
                )}

      </div>    
    </div>
  );
};


export default DocumentComparisonDisplay;
