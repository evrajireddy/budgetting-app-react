import { useEffect, useState } from 'react'


function Logs() {
    useEffect(() => {
        fetch(`http://localhost:5173/`)
            .then(responseP => responseP.json())
            .then(dataP => {
                console.log("after github projects success");
                console.log(dataP);
                //setGithubProjects(dataP.items);
                console.log(dataP);
            }).catch(error => console.error('Error: fetching github project details failed:', error));
    }, []);
    return (
        <div >
            All Logs
        </div>
    )
}

export default Logs;