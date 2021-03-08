import React from "react";

const profile = () => {
    return (
        <div>
            <div>
                <div>
                    <img style={{width:"100%", height:"300px" }}
                    src="https://images.unsplash.com/photo-1614935361809-db7fbca257d3?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="pic"></img>
                </div>
                <div style={{
                    display:"flex",
                    justifyContent:"space-evenly",
                    margin:"18px 0px"
                }}>
                    <div>
                        <img style={{width:"160px", height:"160px", borderRadius:"80px" }}
                        src="https://images.unsplash.com/photo-1614935361809-db7fbca257d3?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="pic"></img>
                    </div>
                    <div>
                        <h4>Jhon Doe</h4>
                        <label>Age: 25</label><br></br>
                        <label>Skills:.......</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default profile;