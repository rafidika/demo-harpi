import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'

function MemberData() {
    const [members, setMembers] = useState("");
    
    const getMembers = async () => {
        try {
            // const response = await fetch("http://localhost:8080/admin");
            // const jsonData = await response.json();
            // setMembers(jsonData);
            await Axios.get("http://localhost:8080/admin")
            .then(res => {
                setMembers(res.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getMembers();
    }, []);

    return (
        <Fragment>
            <div className="container">
                <h2>Members</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Tanggal Lahir</th>
                            <th>Domisili</th>
                            <th>Bukti Transfer</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {members ? members.map(member => (
                            <tr>
                                <td>{member.nama}</td>
                                <td>{member.email}</td>
                                <td>{member.tanggal.split("T")[0]}</td>
                                <td>{member.domisili}</td>
                                <td><img style={{width: '100%'}} src={member.path}/></td>
                                <td><button className="btn btn-primary">Verfikasi</button></td>
                                <td><button className="btn btn-danger">Hapus</button></td>
                            </tr>
                        )) : <h1>Empty</h1>}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default MemberData;