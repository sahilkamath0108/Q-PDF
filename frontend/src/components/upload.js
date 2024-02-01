import React from "react";
import { useState } from "react";
import axios from 'axios';
import { FiUpload } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";


const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded,setUploaded]= useState(false)

  // Event handler for file input change
  const handleFileChange = (event) => {
    // Update the state with the selected file
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setUploaded(true)

    // Handle file upload logic here
    if (selectedFile) {
      // You can perform further actions with the selected file
      console.log("Selected File:", selectedFile);
      // Example: Upload the file to a server
      //   const formData = new FormData();
      //   formData.append('file', selectedFile);
      // // Call your API endpoint to handle file upload
      // axios.post('https://39f8-34-105-14-223.ngrok-free.app/uploadPdfs', formData)
      //   .then(response => console.log(response))
      //   .catch(error => console.error(error));
    } else {
      alert("Please select a file before submitting.");
    }
  };

//   question answer functions
const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
      };

      const handleAskQuestion = async () => {
        try {
          const response = await axios.post('https://39f8-34-105-14-223.ngrok-free.app/ask', { question });
        //   response_data = response.data
        //   console.log(response.data)
        
          setQuestion("")
          setAnswer(response.data.response);
        //   console.log(answer)
        } catch (error) {
          console.error('Error asking question:', error);
          setAnswer('Error fetching answer. Please try again.');
        }
      };
      const handleDelete = async () => {
        try {
          // const response = await axios.post('https://39f8-34-105-14-223.ngrok-free.app/ask', { selectedFile });
          // response_data = response.data
          // console.log(response.data)
        
          console.log("deleted")
          setUploaded(false)
          // setAnswer(response.data.response);
        //   console.log(answer)
        } catch (error) {
          console.error('Error in deleting', error);
          // setAnswer('Error fetching answer. Please try again.');
        }
      };
  return (
    <div>

    {!uploaded ? (<div className=" h-fit  ">
      <div className="flex flex-col items-center justify-center pt-40 gap-10">
        <div className="text-2xl">Upload your document here</div>
        <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col items-center gap-4">
          <div className="" >
            <label htmlFor="fileInput">Choose a file: </label>
            <input
              type="file"
              id="fileInput"
              accept=".pdf, .doc, .docx" // Set accepted file types if needed
              onChange={handleFileChange}
            />
          </div>
          <div className="p-1 rounded-lg border-2">
            <button type="submit">Submit</button>
          </div>
          </div>
        </form>
      </div>
    </div>):
    (
        <div className="h-fit ">
        <div className="flex flex-col  items-center justify-center pt-40 ">
          <label htmlFor="questionInput">Enter your question:</label>
          <div className="flex gap-2">
          <textarea
          placeholder="For eg. what is the name of the book ?"
          className=" text-black w-96 px-2 border-2 rounded-lg"
          rows={2}
            type="text"
            id="questionInput"
            value={question}
            onChange={handleQuestionChange}
          />
        
          <button onClick={handleAskQuestion} className="">
          <FiUpload size={30} />
          </button>
          <button onClick={handleDelete}>
          <RiDeleteBin6Line size={30} />
          
          
        </button>
        </div>

        </div>
        
        {answer && (
          <div className="text-white flex justify-center p-6">
            <strong>Answer:</strong> {answer}
          </div>
        )}
      </div>
    )}

    {/* only questions */}
     {/* <div className="h-fit ">
        <div className="flex flex-col  items-center justify-center pt-40 ">
          <label htmlFor="questionInput">Enter your question:</label>
          <div className="flex gap-2">
          <textarea
          placeholder="For eg. what is the name of the book ?"
          className=" text-black w-96 px-2 border-2 rounded-lg"
          rows={2}
            type="text"
            id="questionInput"
            value={question}
            onChange={handleQuestionChange}
          />
        
          <button onClick={handleAskQuestion} className="">
          <FiUpload size={30} />
          </button>
          <button onClick={handleDelete}>
          <RiDeleteBin6Line size={30} />
          
          
        </button>
        </div>
        

        </div>
        
        {answer && (
          
          <div className="text-white flex justify-center p-6">
            <strong>Answer:</strong> {answer}
          </div>
        )}
      </div> */}
    
    
   
  </div>);
};

export default Upload;
