
import './App.css';
import Upload from './components/upload';
import Header from  './components/Header'



function App() {
  return (
    <div className="p-0 m-0 App h-screen text-white bg-[#0C0C0C]">
      
     <h1 className="">
     <Header/>
      </h1>
      <Upload/>
      {/* <Questions/> */}
    </div>
  );
}

export default App;
