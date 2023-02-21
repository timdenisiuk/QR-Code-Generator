import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrCode = () => {

    const [url, setUrl] = useState("");
    const qrRef = useRef();

    const downloadQrCode = (e) => {
        e.preventDefault();
        let canvas = qrRef.current.querySelector("canvas");
        let image = canvas.toDataURL("image/png");
        let anchor = document.createElement("a");
        anchor.href = image;
        anchor.download = 'qr-code.png';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        setUrl("");

    }

    const updateURL = () => {
        const newUrl = document.getElementById('url');
        console.log('Click event');
        setUrl(newUrl.value);

    };

    const qrcode = (
        <QRCodeCanvas 
        id="qrcode"
        value={url}
        size={300}
        level={'H'}
        bgColor='#FF8888'
        />
    )

    return ( 
        <div className="flex items-center bg-gray-200 px-56 py-56 shadow-lg shadow-black border rounded border-black">
            <div ref={qrRef}>{qrcode}</div>
            <div className="ml-12">
                <form onSubmit={downloadQrCode}>
                    <p className="font-serif font-bold">Input URL</p>
                    <input
                    id='url'
                    className="border rounded border-gray-300 font-serif w-full py-1 pr-12 pl-2"
                    type="text">
                    </input>
                    <button type='button' onClick={updateURL} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 inline-flex items-center border rounded border-black my-2">
                        <span>Update URL</span>
                    </button>
                    <div className='font-bold my-4'>
                        <h1 className="">Current URL: {url}</h1>
                    </div>
                    <div className="my-4">
                        <button type='submit' className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 inline-flex items-center border rounded border-black ">
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                            <span>Download</span>
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
     );
}
 
export default QrCode;