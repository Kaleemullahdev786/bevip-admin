import React from 'react';

const FileDownloader = (urls,label,is_multiple) => {

    const downloadFunction = (e,urls,is_multiple) => {
        e.preventDefault();
        if(is_multiple)
        urls.forEach((url) => {
            window.open(url, '_blank');
        });
        else
        window.open(urls, '_blank');
    };

    return (
        (is_multiple && <div>

            <li onClick={downloadFunction(urls, true)} className='flex  yourlink w-full justify-center rounded-md bg-primary px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary '>Download All</li>
        </div>)
            (is_multiple == false && <div>
                <li className='' >{label}  <a href='' onClick={downloadFunction(urls, false)} className='badge bg-primary px-1 py-1 font-semibold leading-6 text-white rounded ml-6'>Download</a> </li>
            </div>)
    );
};

export default FileDownloader;
